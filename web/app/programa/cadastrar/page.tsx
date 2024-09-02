"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { postPrograma } from "@/app/service/programa/post/postPrograma";
import { getStorageItem } from "@/app/functions/storage/getStorageItem/getStorageItem";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';

import {
  Typography,
  FormHelperText,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
  Autocomplete,
  Chip,
  MenuItem,
} from "@mui/material";
import { useUser } from "@/app/hooks/user/userGet";
import { getLinguagensAll } from "@/app/service/linguagem/getAll/getLinguagemAll";
import { PorcentagemAutores } from "@/app/components/PorcentagemAutores";
import AlertDialog from "@/app/components/AlertDialog/Alert";
import { getByCPF } from "@/app/service/perfil/get/getByCPF";
import AlertMessage from "@/app/components/AlertMessage";
import { postNovoAutor } from "@/app/service/perfil/post/postUser";
import { ConfirmationModal } from "@/app/components/Modal/ConfirmationModal";

// Validação com Zod
const autorSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z
    .string()
    .min(11, "CPF deve ter 11 dígitos")
    .max(11, "CPF deve ter 11 dígitos")
    .regex(/^\d{11}$/, "CPF inválido. Deve conter apenas números."),
  telefone: z
    .string()
    .min(10, "Telefone deve ter no mínimo 10 dígitos")
    .regex(/^\d+$/, "Telefone inválido. Deve conter apenas números."),
  rg: z
    .string()
    .min(7, "RG deve ter no mínimo 7 dígitos")
    .max(14, "RG deve ter no máximo 14 dígitos")
    .regex(/^\d+$/, "RG inválido. Deve conter apenas números."),
  email: z.string().email("Email inválido"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  cep: z
    .string()
    .min(8, "CEP deve ter 8 dígitos")
    .max(8, "CEP deve ter 8 dígitos")
    .regex(/^\d{8}$/, "CEP inválido. Deve conter apenas números."),
  dataNascimento: z
    .string()
    .min(1, "Data de Nascimento é obrigatória")
    .regex(
      /^\d{2}-\d{2}-\d{4}$/,
      "Data de Nascimento inválida. Deve estar no formato DD-MM-YYYY HH:mm:ss"
    ),
  orgaoEmissor: z.string().min(1, "Orgão Emissor é obrigatório"),
  profissao: z.string().min(1, "Profissão é obrigatória"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  estado: z.string().min(1, "Estado é obrigatório"),
  matricula: z.string().optional(),
  vinculoUnitins: z.boolean(),
  vinculoUnitinsDesc: z.string().min(1, { message: "Campo obrigatório" }),
  nomeInstituicao: z.string().min(1, { message: "Campo obrigatório" }),
  vinculoInstituicao: z.string().min(1, { message: "Campo obrigatório" }),
  porcentagem: z
    .number()
    .int("Porcentagem deve ser um número inteiro")
    .min(0, "Porcentagem não pode ser negativa")
    .max(30, "Porcentagem deve ser menor que 30"),
});

const schema = z.object({
  titulo: z.string().min(1, { message: "Campo obrigatório" }),
  descricao: z.string().min(1, { message: "Campo obrigatório" }),
  solucaoProblemaDesc: z.string().min(1, { message: "Campo obrigatório" }),
  linguagens: z.array(z.string()).nonempty({ message: "Campo obrigatório" }),
  descricaoMercado: z.string().min(1, { message: "Campo obrigatório" }),
  dataCriacaoPrograma: z.string().min(1, { message: "Campo obrigatório" }),
  fasePublicacao: z.string().min(1, { message: "Campo obrigatório" }),
  status: z.string().min(1, { message: "Campo obrigatório" }),
  outrasObrasDesc: z.string().optional(),
  fonteFinanciamentoDesc: z.string().optional(),
  revelacaoDesc: z.string().optional(),
  revelacaoPublicaDesc: z.string().optional(),
  linkCodigoFonte: z.string().optional(),
  codigoFonte: z.instanceof(File).optional(),
  documentoConfidencialidade: z
    .instanceof(File)
    .refine((file) => file instanceof File, {
      message: "Documento de confidencialidade é obrigatório",
    }),
  autores: z
    .array(autorSchema)
    .nonempty({ message: "Pelo menos um autor é necessário" }),
});

type FormData = z.infer<typeof schema>;

export default function NovaSolicitacao() {
  const router = useRouter();
  const { profile, isLoading } = useUser();
  const token = getStorageItem();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [activeStep, setActiveStep] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [autoresModal, setAutoresModal] = useState(false);

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  const steps = [
    "Informações dos Autores",
    "Informações do Programa",
    "Fontes e Inspirações",
    "Revelação",
  ];

  const [autores, setAutores] = useState<IAutor[]>([]);
  const [insercaoOpcao, setInsercaoOpcao] = useState<"arquivo" | "link">(
    "arquivo"
  );
  // Estado para armazenar a opção selecionada para Natureza de Outras Obras
  const [existeOutrasObras, setExisteOutrasObras] = useState<"sim" | "nao">(
    "nao"
  );

  // Estado para armazenar a opção selecionada para Fonte de Financiamento
  const [existeFonteFinanciamento, setExisteFonteFinanciamento] = useState<
    "sim" | "nao"
  >("nao");

  // Estado para armazenar a opção de confissão/revelação para outras fontes
  const [confissaoOutrasFontes, setConfissaoOutrasFontes] = useState<
    "sim" | "nao"
  >("nao");

  // Estado para armazenar a opção de revelação pública
  const [revelacaoPublica, setRevelacaoPublica] = useState<"sim" | "nao">(
    "nao"
  );

  const [linkCodigoFonte, setLinkCodigoFonte] = useState<string>("");

  const [linguagensDisponiveis, setLinguagensDisponiveis] = useState<
    ILinguagem[]
  >([]);

  const [codigoFonte, setCodigoFonte] = useState<File | null>(null);

  const [formData, setFormData] = useState<FormData | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    watch,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      titulo: "",
      descricao: "",
      solucaoProblemaDesc: "",
      linguagens: [],
      descricaoMercado: "",
      dataCriacaoPrograma: "",
      fasePublicacao: "",
      status: "ENVIADO",
      outrasObrasDesc: "",
      fonteFinanciamentoDesc: "",
      revelacaoDesc: "",
      revelacaoPublicaDesc: "",
      linkCodigoFonte: "",
      codigoFonte: undefined,
      autores: [],
    },
  });

  // Preenche os campos do autor com os dados do perfil do usuário
  useEffect(() => {
    if (!isLoading && profile) {
      const nome = profile.nome || "";
      const matricula = profile.matricula || "";
      const cpf = profile.cpf || "";
      const autorData = [{ nome, matricula, cpf, _id: profile._id || "" }];
      if (profile.camposIncompletos?.length == 0) {
        setAlertSeverity("error");
        setAlertMessage("Complete os campos restantes para prosseguir!");
        setAlertOpen(true);
      }
      setAutores(autorData);
      setValue("autores", autorData);
    }
  }, [profile, isLoading, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCodigoFonte(file);
      setValue("codigoFonte", file);
    }
  };

  // Lógica de navegação
  const validateField = async (fieldName: string): Promise<boolean> => {
    const result = await trigger(fieldName);
    console.log(`${fieldName} é válido: ${result}`);
    return result;
  };

  const validateAutores = async (): Promise<boolean> => {
    let isValid = true;
    const formValues = getValues();
    const autores = formValues.autores || [];

    for (let i = 0; i < autores.length; i++) {
      const autor = autores[i];
      console.log(`Validando autor ${i}`);
      isValid = isValid && (await validateField(`autores.${i}.nome`));
      isValid = isValid && (await validateField(`autores.${i}.cpf`));
      isValid = isValid && (await validateField(`autores.${i}.telefone`));
      isValid = isValid && (await validateField(`autores.${i}.rg`));
      isValid = isValid && (await validateField(`autores.${i}.email`));
      isValid = isValid && (await validateField(`autores.${i}.endereco`));
      isValid = isValid && (await validateField(`autores.${i}.bairro`));
      isValid = isValid && (await validateField(`autores.${i}.cep`));
      isValid = isValid && (await validateField(`autores.${i}.dataNascimento`));
      isValid = isValid && (await validateField(`autores.${i}.orgaoEmissor`));
      isValid = isValid && (await validateField(`autores.${i}.profissao`));
      isValid = isValid && (await validateField(`autores.${i}.cidade`));
      isValid = isValid && (await validateField(`autores.${i}.estado`));
    }

    return isValid;
  };

  const handleNext = async () => {
    let isValid = false;
    switch (activeStep) {
      case 0:
        isValid = await trigger(["autores", "vinculoUnitins"]);
        isValid = await validateAutores();
        console.log("Página um é válida: ", isValid);
        if (isValid) {
          const formValues = getValues();
          setFormData(formValues);
          setAutoresModal(true);
        }
        break;
      case 1:
        type FormFieldNames =
          | "titulo"
          | "descricao"
          | "solucaoProblemaDesc"
          | "linguagens"
          | "descricaoMercado"
          | "dataCriacaoPrograma"
          | "nomeArquivo"
          | "linkCodigoFonte";
        const fieldsToValidate: FormFieldNames[] = [
          "titulo",
          "descricao",
          "solucaoProblemaDesc",
          "linguagens",
          "descricaoMercado",
          "dataCriacaoPrograma",
        ];

        if (insercaoOpcao === "arquivo") {
          fieldsToValidate.push("nomeArquivo");
        } else if (insercaoOpcao === "link") {
          fieldsToValidate.push("linkCodigoFonte");
        }

        isValid = await trigger(fieldsToValidate);
        break;
      case 2:
        isValid = await trigger(["outrasObrasDesc", "fonteFinanciamentoDesc"]);
        break;
      case 3:
        isValid = await trigger(["revelacaoDesc", "revelacaoPublicaDesc"]);
        break;
    }

    if (isValid) {
      if (activeStep === 0) {
        const formValues = getValues();
        console.log("Form values before confirmation:", formValues);
        setFormData(formValues);
        setAutoresModal(true);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
      if (activeStep >= steps.length - 1) {
        const formValues = getValues();
        // Formata o campo autores
        formValues.autores = formValues.autores
          .map((autor) => autor.id)
          .join(", ");

        console.log("Form values before confirmation:", formValues);
        setFormData(formValues);
        setShowConfirmationModal(true);
      }
    }
  };

  const handleConfirmAutores = async () => {
    const formValues = getValues();
    console.log("Form values before confirmation:", formValues);
  
    const autores = formValues.autores || [];
    for (let i = 0; i < autores.length; i++) {
      const autor = autores[i];
      try {
        const novoAutor = await postNovoAutor(token, autor);
        // Atualiza o autor com o ID retornado
        autores[i] = { ...autor, id: novoAutor._id };
      } catch (error) {
        if (error instanceof Error && (error as any).response?.status === 409) {
          // Captura o ID do autor existente no erro 409
          const existingUsuarioId = (error as any).response.data?.existingUsuarioId;
          if (existingUsuarioId) {
            // Atualiza o autor com o ID existente
            autores[i] = { ...autor, id: existingUsuarioId };
          }
        } else {
          console.error("Erro ao criar novo autor:", error);
        }
      }
    }
  
    setFormData(formValues);
    setAutoresModal(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    getLinguagensAll(token)
      .then((response) => {
        setLinguagensDisponiveis(response || []);
      })
      .catch((error) => {
        console.error("Erro ao buscar linguagens:", error);
      });
  }, [profile, isLoading, setValue, token]);

  const handleFormSubmit = handleSubmit((data) => {
    const formDataWithFile = {
      ...data,
      codigoFonte,
      autores: data.autores.map((autor) => autor._id),
    };
    console.log("Form data before confirmation:", formDataWithFile);
    setFormData(formDataWithFile);
    setShowConfirmationModal(true);
  });

  // Função auxiliar para criar um novo autor
  const criarNovoAutor = (): IAutor => ({
    nome: "",
    cpf: "",
    telefone: "",
    rg: "",
    email: "",
    endereco: "",
    bairro: "",
    cep: "",
    dataNascimento: "",
    orgaoEmissor: "",
    profissao: "",
    cidade: "",
    estado: "",
    _id: "",
    matricula: "",
    porcentagem: 0,
  });

  const adicionarAutor = () => {
    // Adiciona o autor no estado local
    setAutores((prevAutores: IAutor[]) => [...prevAutores, criarNovoAutor()]);

    // Atualiza o campo 'autores' no formulário
    const autoresAtualizados: IAutor[] = [
      ...(getValues("autores") || []), // Tipagem explícita para garantir que é um array
      criarNovoAutor(),
    ];

    setValue("autores", autoresAtualizados);
  };

  const handleAutorChange = (
    index: number,
    field: keyof IAutor,
    value: string | number
  ) => {
    setAutores((prevAutores) => {
      const newAutores = [...prevAutores];
      newAutores[index] = { ...newAutores[index], [field]: value };
      setValue("autores", newAutores);
      return newAutores;
    });
  };

  const removerAutor = (index: number) => {
    setAutores((prevAutores) => {
      const newAutores = prevAutores.filter((_, i) => i !== index);
      setValue("autores", newAutores);
      return newAutores;
    });
  };

  const buscarAutorByCPF = async (index: number) => {
    const CPF = autores[index].cpf;
    if (!CPF) {
      alert("Por favor, insira um CPF para buscar.");
      return;
    }

    const autorData = await getByCPF(token, CPF);
    console.log("Autor que retorna da requisição: ", autorData);

    if (autorData) {
      // Utilize o operador de coalescência nula (??) para lidar com valores undefined
      handleAutorChange(index, "nome", autorData.nome ?? "");
      handleAutorChange(index, "_id", autorData._id ?? "");
      handleAutorChange(index, "telefone", autorData.telefone ?? "");
      handleAutorChange(index, "rg", autorData.rg ?? "");
      handleAutorChange(index, "email", autorData.email ?? "");
      handleAutorChange(index, "endereco", autorData.endereco ?? "");
      handleAutorChange(index, "bairro", autorData.bairro ?? "");
      handleAutorChange(index, "cep", autorData.cep ?? "");
      handleAutorChange(
        index,
        "dataNascimento",
        autorData.dataNascimento ?? ""
      );
      handleAutorChange(index, "orgaoEmissor", autorData.orgaoEmissor ?? "");
      handleAutorChange(index, "profissao", autorData.profissao ?? "");
      handleAutorChange(index, "cidade", autorData.cidade ?? "");
      handleAutorChange(index, "estado", autorData.estado ?? "");
    } else {
      alert("Autor não encontrado.");
    }
  }

  const validateCPFUnico = (index, value) => {
    const outrosCpfs = autores.map((autor, i) => i !== index && autor.cpf);
    const cpfDuplicado = outrosCpfs.includes(value);

    if (cpfDuplicado) {
      setAlertSeverity("error");
      setAlertMessage("CPF já está sendo utilizado por mais de um autor");
      setAlertOpen(true);
      return false;
    }
    return true;
  };
  const handlePorcentagemChange = (index: number, value: number) => {
    const novosAutores = [...autores];
    novosAutores[index].porcentagem = value;
    const totalPorcentagem = novosAutores.reduce(
      (acc, autor) => acc + (autor.porcentagem || 0),
      0
    );

    if (totalPorcentagem <= 30 && totalPorcentagem > 0) {
      setAutores(novosAutores);
    } else {
      setAlertSeverity("error");
      setAlertMessage("A soma das porcentagens não pode exceder 30%")
      setAlertOpen(true);
    }
  };

  const onSubmit = async (data) => {
    console.log("Data do onSubmit", data);

    const formData = new FormData();
    formData.append("titulo", data.titulo);
    formData.append("descricao", data.descricao);
    formData.append("solucaoProblemaDesc", data.solucaoProblemaDesc);
    formData.append("linguagens", data.linguagens);
    formData.append("autores", JSON.stringify([data.autores] || []));
    if (insercaoOpcao === "arquivo" && codigoFonte) {
      formData.append("codigoFonte", codigoFonte);
    } else if (insercaoOpcao === "link") {
      formData.append("codigoFonteLink", linkCodigoFonte);
    }

    try {
      const response = await postPrograma(formData, token);
      if (response.ok) {
        toast.success("Programa enviado com sucesso!");
        router.push("/");
      } else {
        toast.error("Erro ao enviar o programa. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro ao enviar o programa. Tente novamente.");
    }
  };

  const renderPageContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid
            className="w-[90%] bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
            container
            spacing={2}
          >
             <AlertMessage
              open={alertOpen}
              message={alertMessage}
              severity={alertSeverity}
              onClose={() => setAlertOpen(false)}
            />
            <Stepper activeStep={activeStep} className="flex w-full m-4">
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel className={`flex flex-col items-center ${index !== activeStep ? 'text-xs sm:text-base' : ''}`}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-blue-300 text-white ${index === activeStep ? 'text-lg' : 'text-sm'}`}>
              {index + 1}
            </div>
            <span className={`text-xs sm:text-base ${index !== activeStep ? 'hidden' : ''}`}>
              {label}
            </span>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
           
            <Typography className="text-3xl font-medium m-4 truncate transition-opacity duration-500 opacity-100 sm:opacity-90 md:opacity-75 lg:opacity-50">
              AUTORES
            </Typography>
            {autores.map((autor, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={5}>
                  <TextField
                    required
                    label={`Nome Completo do Autor ${index + 1}: `}
                    fullWidth
                    value={autor.nome}
                    onChange={(e) =>
                      handleAutorChange(index, "nome", e.target.value)
                    }
                    error={!!errors.autores?.[index]?.nome}
                    helperText={errors.autores?.[index]?.nome?.message}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    {...register(`autores.${index}.cpf`, {
                      required: "CPF é obrigatório",
                      validate: (value) => validateCPFUnico(index, value)
                    })}
                    required
                    label={`CPF do Autor ${index + 1}: `}
                    fullWidth
                    value={autor.cpf}
                    onChange={(e) =>
                      handleAutorChange(index, "cpf", e.target.value)
                    }
                    error={!!errors.autores?.[index]?.cpf}
                    helperText={errors.autores?.[index]?.cpf?.message}
                  />
                </Grid>
                <Grid item xs={2}>
                <Button
  variant="outlined"
  onClick={() => buscarAutorByCPF(index)}
  className="flex items-center gap-2"
>
  <Tooltip title="Pesquisar por CPF" arrow>
    <span className="hidden md:inline sm:hidden">Pesquisar</span>
    <SearchIcon />
  </Tooltip>
</Button>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="Telefone"
                    fullWidth
                    value={autor.telefone}
                    onChange={(e) =>
                      handleAutorChange(index, "telefone", e.target.value)
                    }
                    error={!!errors.autores?.[index]?.telefone}
                    helperText={errors.autores?.[index]?.telefone?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="RG"
                    fullWidth
                    value={autor.rg}
                    onChange={(e) =>
                      handleAutorChange(index, "rg", e.target.value)
                    }
                    error={!!errors.autores?.[index]?.rg}
                    helperText={errors.autores?.[index]?.rg?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="Email"
                    fullWidth
                    value={autor.email}
                    onChange={(e) =>
                      handleAutorChange(index, "email", e.target.value)
                    }
                    error={!!errors.autores?.[index]?.email}
                    helperText={errors.autores?.[index]?.email?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="Endereço"
                    fullWidth
                    value={autor.endereco}
                    onChange={(e) =>
                      handleAutorChange(index, "endereco", e.target.value)
                    }
                    error={!!errors.autores?.[index]?.endereco}
                    helperText={errors.autores?.[index]?.endereco?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="Bairro"
                    fullWidth
                    value={autor.bairro}
                    onChange={(e) =>
                      handleAutorChange(index, "bairro", e.target.value)
                    }
                    error={!!errors.autores?.[index]?.bairro}
                    helperText={errors.autores?.[index]?.bairro?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="CEP"
                    fullWidth
                    value={autor.cep}
                    onChange={(e) =>
                      handleAutorChange(index, "cep", e.target.value)
                    }
                    error={!!errors.autores?.[index]?.cep}
                    helperText={errors.autores?.[index]?.cep?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="Data de Nascimento"
                    fullWidth
                    value={autor.dataNascimento}
                    onChange={(e) =>
                      handleAutorChange(index, "dataNascimento", e.target.value)
                    }
                    error={!!errors.autores?.[index]?.dataNascimento}
                    helperText={
                      errors.autores?.[index]?.dataNascimento?.message
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="Orgão Emissor"
                    fullWidth
                    value={autor.orgaoEmissor}
                    onChange={(e) =>
                      handleAutorChange(index, "orgaoEmissor", e.target.value)
                    }
                    error={!!errors.autores?.[index]?.orgaoEmissor}
                    helperText={errors.autores?.[index]?.orgaoEmissor?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="Profissão"
                    fullWidth
                    value={autor.profissao}
                    onChange={(e) =>
                      handleAutorChange(index, "profissao", e.target.value)
                    }
                    error={!!errors.autores?.[index]?.profissao}
                    helperText={errors.autores?.[index]?.profissao?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="Cidade"
                    fullWidth
                    value={autor.cidade}
                    onChange={(e) =>
                      handleAutorChange(index, "cidade", e.target.value)
                    }
                    error={!!errors.autores?.[index]?.cidade}
                    helperText={errors.autores?.[index]?.cidade?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="Estado"
                    fullWidth
                    value={autor.estado}
                    onChange={(e) =>
                      handleAutorChange(index, "estado", e.target.value)
                    }
                    error={!!errors.autores?.[index]?.estado}
                    helperText={errors.autores?.[index]?.estado?.message}
                  />
                </Grid>
          
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    label="Porcentagem de Contribuição (%): "
                    fullWidth
                    value={autor.porcentagem || 0}
                    helperText="Você deve inserir a porcentagem de participação do autor neste programa"
                    onChange={(e) =>
                      handlePorcentagemChange(index, parseFloat(e.target.value))
                    }
                  />
                </Grid>
                
            {/* Radio Group Vinculo Unitins */}
{/* Radio Group Vinculo Unitins */}
<Grid item xs={12}>
  <Controller
    name={`autores[${index}].vinculoUnitins`} // Vinculando ao array de autores
    control={control}
    rules={{ required: "Campo obrigatório" }}
    render={({ field }) => (
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">
          Este autor há vínculo com a Unitins
        </FormLabel>
        <RadioGroup
          row
          {...field}
          value={field.value === true ? "true" : "false"} // Convertendo o valor para string
          onChange={(e) => field.onChange(e.target.value === "true")} // Convertendo de volta para booleano
        >
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="Sim"
          />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="Não"
          />
        </RadioGroup>
        {errors?.autores?.[index]?.vinculoUnitins && (
          <FormHelperText error>
            {errors.autores[index].vinculoUnitins.message}
          </FormHelperText>
        )}
      </FormControl>
    )}
  />
</Grid>

{/* Campos adicionais quando vinculoUnitins for 'true' */}
{watch(`autores[${index}].vinculoUnitins`) === true && (
  <Grid item xs={12}>
    <Controller
      name={`autores[${index}].vinculoUnitinsDesc`} // Acessando o campo correto
      control={control}
      rules={{ required: "Campo obrigatório" }}
      render={({ field }) => (
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">
            Escolha o vínculo com a Unitins:
          </FormLabel>
          <RadioGroup
            row
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
            value={field.value || ""}
          >
            <FormControlLabel
              value="Professor"
              control={<Radio />}
              label="Professor"
            />
            <FormControlLabel
              value="Aluno de graduação"
              control={<Radio />}
              label="Aluno de graduação"
            />
            <FormControlLabel
              value="Aluno de especialização"
              control={<Radio />}
              label="Aluno de especialização"
            />
            <FormControlLabel
              value="Aluno de pós-graduação"
              control={<Radio />}
              label="Aluno de pós-graduação"
            />
            <FormControlLabel
              value="Técnico administrativo"
              control={<Radio />}
              label="Técnico administrativo"
            />
          </RadioGroup>
          {errors?.autores?.[index]?.vinculoUnitinsDesc && (
            <FormHelperText error>
              {errors.autores[index].vinculoUnitinsDesc.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  </Grid>
)}

{/* Campos adicionais quando vinculoUnitins for 'false' */}
{watch(`autores[${index}].vinculoUnitins`) === false && (
  <Grid item xs={12}>
    <Controller
      name={`autores[${index}].nomeInstituicao`} // Acessando o campo correto
      control={control}
      rules={{ required: "Campo obrigatório" }} // Se desejar tornar o campo obrigatório
      render={({ field }) => (
        <TextField
          required
          label="Nome da Instituição"
          fullWidth
          {...field}
          error={!!errors.autores?.[index]?.nomeInstituicao}
          helperText={
            errors.autores?.[index]?.nomeInstituicao
              ? errors.autores[index].nomeInstituicao.message
              : "(Apenas preencha, se caso não fazer parte da UNITINS)"
          }
        />
      )}
    />
    <Controller
      name={`autores[${index}].vinculoInstituicao`} // Acessando o campo correto
      control={control}
      rules={{ required: "Campo obrigatório" }} // Se desejar tornar o campo obrigatório
      render={({ field }) => (
        <TextField
          required
          label="Descreva qual o vínculo que tem para com a instituição:"
          fullWidth
          {...field}
          error={!!errors.autores?.[index]?.vinculoInstituicao}
          helperText={
            errors.autores?.[index]?.vinculoInstituicao
              ? errors.autores[index].vinculoInstituicao.message
              : "(Apenas preencha, se caso não fazer parte da UNITINS)"
          }
        />
      )}
    />
  </Grid>
)}

              
                <Grid className="flex gap-2 w-full m-4">
                <Button
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => removerAutor(index)}
                  >
                    Remover
                  </Button>
<Button
              className="mt-4"
              variant="outlined"
              onClick={adicionarAutor}
            >
              Adicionar Autor
            </Button>

            
                  
                </Grid>
              </Grid>
            ))}

          </Grid>
        );
      case 1:
        return (
          <Grid
            className="w-[90%] bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
            container
            spacing={2}
          >
            <Stepper activeStep={activeStep} className="flex w-full m-4">
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel className={`flex flex-col items-center ${index !== activeStep ? 'text-xs sm:text-base' : ''}`}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-blue-300 text-white ${index === activeStep ? 'text-lg' : 'text-sm'}`}>
              {index + 1}
            </div>
            <span className={`text-xs sm:text-base ${index !== activeStep ? 'hidden' : ''}`}>
              {label}
            </span>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
            <Typography className="text-3xl font-medium m-4">
              PROGRAMA
            </Typography>

            {/* Título */}
            <Grid item xs={12}>
              <Controller
                name="titulo"
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    label="Título do programa: "
                    fullWidth
                    {...field}
                    error={!!errors.titulo}
                    helperText={errors.titulo?.message}
                  />
                )}
              />
            </Grid>

            {/* Descrição */}
            <Grid item xs={12}>
              <Controller
                name="descricao"
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    label="Descrição do programa: "
                    fullWidth
                    multiline
                    rows={4}
                    {...field}
                    error={!!errors.descricao}
                    helperText={errors.descricao?.message}
                  />
                )}
              />
            </Grid>

            {/* Solução do Problema */}
            <Grid item xs={12}>
              <Controller
                name="solucaoProblemaDesc"
                control={control}
                render={({ field }) => (
                  <TextField
                    required
                    label="Solução do Problema: "
                    fullWidth
                    multiline
                    rows={4}
                    {...field}
                    error={!!errors.solucaoProblemaDesc}
                    helperText={errors.solucaoProblemaDesc?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="descricaoMercado"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Descrição do Mercado: "
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.descricaoMercado}
                    helperText={errors.descricaoMercado?.message}
                  />
                )}
              />
            </Grid>
            {/* Fase de Publicação */}
            <Grid item xs={12}>
              <Controller
                name="fasePublicacao"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    required
                    label="Em qual fase de publicação está o seu programa?"
                    fullWidth
                    {...field}
                    error={!!errors.fasePublicacao}
                    helperText={errors.fasePublicacao?.message}
                  >
                    {["TESE", "ARTIGO", "TCC", "OUTRO"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="dataCriacaoPrograma"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Data de Criação do Programa: "
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.dataCriacaoPrograma}
                    helperText={errors.dataCriacaoPrograma?.message}
                  />
                )}
              />
            </Grid>
            {/* Linguagens */}
            <Grid item xs={12}>
              <Controller
                name="linguagens"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    freeSolo
                    options={linguagensDisponiveis.map((option) => option.nome)}
                    getOptionLabel={(option) => option}
                    onChange={(event, newValue) =>
                      field.onChange(newValue as string[])
                    }
                    value={field.value || []}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => {
                        const linguagem = linguagensDisponiveis.find(
                          (linguagem) => linguagem.nome === option
                        );
                        return (
                          <Chip
                            variant="outlined"
                            label={linguagem ? option : `${option} (nova tag)`}
                            {...getTagProps({ index })}
                          />
                        );
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Linguagens"
                        error={!!errors.linguagens}
                        helperText={errors.linguagens?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            {/* Opção de Inserção de Código Fonte */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Inserir Código Fonte</Typography>
              <RadioGroup
                aria-required
                row
                value={insercaoOpcao}
                onChange={(e) =>
                  setInsercaoOpcao(e.target.value as "arquivo" | "link")
                }
              >
                <FormControlLabel
                  value="arquivo"
                  control={<Radio />}
                  label="Inserir Arquivo"
                />
                <FormControlLabel
                  value="link"
                  control={<Radio />}
                  label="Inserir Link"
                />
              </RadioGroup>
            </Grid>

            {insercaoOpcao === "arquivo" && (
              <Grid item xs={12}>
                <h2
                  className="text-1xl font-medium"
                  style={{ marginBottom: 8 }}
                >
                  Adicionar Documento
                </h2>
                <Grid className="flex flex-col w-full space-y-5 justify-between">
                  <Button
                    className="w-[100%] flex p-2"
                    style={{
                      height: 100,
                      backgroundColor: "#F5F5F5",
                      color: "#999999",
                      marginTop: 10,
                    }}
                    variant="contained"
                    component="label"
                  >
                    {codigoFonte ? (
                      codigoFonte.name
                    ) : (
                      <>
                        Adicione o documento aqui <UploadFileIcon />
                      </>
                    )}
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleFileChange(e, setCodigoFonte)}
                    />
                  </Button>

                  {codigoFonte && (
                    <TextField
                      className="w-[100%]"
                      label="Documento Selecionado"
                      variant="standard"
                      value={codigoFonte.name}
                      disabled
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() => setCodigoFonte(null)}
                            edge="end"
                            aria-label="delete"
                          >
                            <CancelOutlinedIcon />
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            )}

            {insercaoOpcao === "link" && (
              <Grid item xs={12}>
                <TextField
                  label="Link do Código Fonte"
                  fullWidth
                  value={linkCodigoFonte}
                  onChange={(e) => setLinkCodigoFonte(e.target.value)}
                  error={!!errors.linkCodigoFonte}
                  helperText={errors.linkCodigoFonte?.message}
                />
              </Grid>
            )}
          </Grid>
        );
      case 2:
        return (
          <Grid
            className="w-[90%] bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
            container
            spacing={2}
          >
            <Stepper activeStep={activeStep} className="flex w-full m-4">
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel className={`flex flex-col items-center ${index !== activeStep ? 'text-xs sm:text-base' : ''}`}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-blue-300 text-white ${index === activeStep ? 'text-lg' : 'text-sm'}`}>
              {index + 1}
            </div>
            <span className={`text-xs sm:text-base ${index !== activeStep ? 'hidden' : ''}`}>
              {label}
            </span>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
            <Typography className="text-3xl font-medium m-4">
              CARACTERIZAÇÃO DO PROGRAMA
            </Typography>
            <Grid container spacing={2}>
              {/* Opções de Sim e Não */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Existe Natureza de outras obras de propriedade intelectual
                  neste programa?
                </Typography>
                <RadioGroup
                  aria-required
                  row
                  value={existeOutrasObras}
                  onChange={(e) =>
                    setExisteOutrasObras(e.target.value as "sim" | "nao")
                  }
                >
                  <FormControlLabel
                    value="sim"
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value="nao"
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
              </Grid>

              {/* Descrição das Obras */}
              {existeOutrasObras === "sim" && (
                <Grid item xs={12}>
                  <Controller
                    name="outrasObrasDesc"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Descrição das Obras: "
                        multiline
                        rows={3}
                        fullWidth
                        error={!!errors.outrasObrasDesc}
                        helperText={errors.outrasObrasDesc?.message}
                      />
                    )}
                  />
                </Grid>
              )}

              {/* Opções de Sim e Não para Fonte de Financiamento */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Existe Fonte de Financiamento externa ou interna para este
                  programa?
                </Typography>
                <RadioGroup
                  aria-required
                  row
                  value={existeFonteFinanciamento}
                  onChange={(e) =>
                    setExisteFonteFinanciamento(e.target.value as "sim" | "nao")
                  }
                >
                  <FormControlLabel
                    value="sim"
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value="nao"
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
              </Grid>

              {/* Descrição de Fonte de Financiamento */}
              {existeFonteFinanciamento === "sim" && (
                <Grid item xs={12}>
                  <Controller
                    name="fonteFinanciamentoDesc"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Descrição da Fonte de Financiamento: "
                        multiline
                        rows={3}
                        fullWidth
                        error={!!errors.fonteFinanciamentoDesc}
                        helperText={errors.fonteFinanciamentoDesc?.message}
                      />
                    )}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid
            className="w-[90%] bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
            container
            spacing={2}
          >
            <Stepper activeStep={activeStep} className="flex w-full m-4">
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel className={`flex flex-col items-center ${index !== activeStep ? 'text-xs sm:text-base' : ''}`}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-blue-300 text-white ${index === activeStep ? 'text-lg' : 'text-sm'}`}>
              {index + 1}
            </div>
            <span className={`text-xs sm:text-base ${index !== activeStep ? 'hidden' : ''}`}>
              {label}
            </span>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
            <Typography className="text-3xl font-medium m-4">
              FATOS DE RELEVÂNCIA E CATEGORIA
            </Typography>
            <Grid container spacing={2}>
              {/* Opções de Sim e Não para Confissão/Revelação para Outras Fontes */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Já houve confissão/revelação deste programa para outras
                  fontes?
                </Typography>
                <RadioGroup
                  aria-required
                  row
                  value={confissaoOutrasFontes}
                  onChange={(e) =>
                    setConfissaoOutrasFontes(e.target.value as "sim" | "nao")
                  }
                >
                  <FormControlLabel
                    value="sim"
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value="nao"
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
              </Grid>

              {/* Descrição de Confissão/Revelação para Outras Fontes */}
              {confissaoOutrasFontes === "sim" && (
                <Grid item xs={12}>
                  <Controller
                    name="revelacaoDesc"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Descrição de Confissão/Revelação para Outras Fontes: "
                        multiline
                        rows={3}
                        fullWidth
                        error={!!errors.revelacaoDesc}
                        helperText={errors.revelacaoDesc?.message}
                      />
                    )}
                  />
                </Grid>
              )}

              {/* Opções de Sim e Não para Revelação Pública */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Já houve revelação pública deste programa?
                </Typography>
                <RadioGroup
                  aria-required
                  row
                  value={revelacaoPublica}
                  onChange={(e) =>
                    setRevelacaoPublica(e.target.value as "sim" | "nao")
                  }
                >
                  <FormControlLabel
                    value="sim"
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value="nao"
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
              </Grid>

              {/* Descrição de Revelação Pública */}
              {revelacaoPublica === "sim" && (
                <Grid item xs={12}>
                  <Controller
                    name="revelacaoPublicaDesc"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Descrição de Revelação Pública: "
                        multiline
                        rows={3}
                        fullWidth
                        error={!!errors.revelacaoPublicaDesc}
                        helperText={errors.revelacaoPublicaDesc?.message}
                      />
                    )}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        );
      default:
        return <div>Conteúdo não encontrado</div>;
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center p-4">
      {renderPageContent()}
      <div className="mt-4">
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          className="bg-azulEscuroGradient ml-2"
        >
          {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
        </Button>
      </div>

      <AlertDialog
        open={showConfirmationModal}
        token={token}
        formData={formData}
        title="Confirmar Envio"
        onConfirm={handleSubmit(onSubmit)} // Esta função deve chamar handleSubmit(onSubmit)
        onCancel={handleCancel}
      />
      <ConfirmationModal
        open={autoresModal}
        onClose={() => setAutoresModal(false)}
        onConfirm={handleConfirmAutores} // Passa a função de confirmação aqui
        title="Confirmação"
        message="Você deseja confirmar a adição desses autores?"
      />
    </div>
  );
}
