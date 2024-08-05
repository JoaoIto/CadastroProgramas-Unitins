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
import { getUsuarioId } from "@/app/functions/getUsuarioId/getUsuarioId";
import { postPrograma } from "@/app/service/programa/post/postPrograma";
import { getStorageItem } from "@/app/functions/storage/getStorageItem/getStorageItem";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

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
import { getByMatricula } from "@/app/service/perfil/get/getByMatricula";

// Validação com Zod
const schema = z.object({
  titulo: z.string().min(1, { message: "Campo obrigatório" }),
  descricao: z.string().min(1, { message: "Campo obrigatório" }),
  solucaoProblemaDesc: z.string().min(1, { message: "Campo obrigatório" }),
  linguagens: z.array(z.string()).nonempty({ message: "Campo obrigatório" }),
  descricaoMercado: z.string().min(1, { message: "Campo obrigatório" }),
  dataCriacaoPrograma: z.string().min(1, { message: "Campo obrigatório" }),
  vinculoUnitins: z.boolean(),
  nomeInstituicao: z.string().min(1, { message: "Campo obrigatório" }),
  fasePublicacao: z.string().min(1, { message: "Campo obrigatório" }),
  status: z.string().min(1, { message: "Campo obrigatório" }),
  outrasObrasDesc: z.string().optional(),
  fonteFinanciamentoDesc: z.string().optional(),
  revelacaoDesc: z.string().optional(),
  revelacaoPublicaDesc: z.string().optional(),
  linkCodigoFonte: z.string().optional(),
  arquivoCodigoFonte: z.instanceof(File).optional(),
  autores: z
    .array(
      z.object({
        nome: z.string().min(1, { message: "Nome é obrigatório" }),
        matricula: z.string().min(1, { message: "Matrícula é obrigatória" }),
        cpf: z.string().optional(),
        nomeCompleto: z.string().optional(),
        id: z.string().optional(),
      })
    )
    .nonempty({ message: "Pelo menos um autor é necessário" }),
});

type FormData = z.infer<typeof schema>;

export default function NovaSolicitacao() {
  const router = useRouter();
  const { profile, isLoading } = useUser();
  const token = getStorageItem();
  const [activeStep, setActiveStep] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  const steps = [
    "Informações dos Autores",
    "Informações do Programa",
    "Caracterização do Programa",
    "Fatores de Relevância e Categoria",
  ];

  const [error, setError] = useState<string | null>(null);

  const [autores, setAutores] = useState<IAutor[]>([]);
  const [insercaoOpcao, setInsercaoOpcao] = useState<"arquivo" | "link">(
    "arquivo"
  );
  // Estado para armazenar a opção selecionada para Natureza de Outras Obras
  const [existeOutrasObras, setExisteOutrasObras] = useState<"sim" | "nao">(
    "nao"
  );

  // Estado para armazenar a descrição das obras
  const [descricaoObras, setDescricaoObras] = useState<string>("");

  // Estado para armazenar a opção selecionada para Fonte de Financiamento
  const [existeFonteFinanciamento, setExisteFonteFinanciamento] = useState<
    "sim" | "nao"
  >("nao");

  // Estado para armazenar a descrição de fonte de financiamento
  const [descricaoFonteFinanciamento, setDescricaoFonteFinanciamento] =
    useState<string>("");

  // Estado para armazenar a opção de confissão/revelação para outras fontes
  const [confissaoOutrasFontes, setConfissaoOutrasFontes] = useState<
    "sim" | "nao"
  >("nao");

  // Estado para armazenar a descrição de confissão/revelação para outras fontes
  const [descricaoConfissaoOutrasFontes, setDescricaoConfissaoOutrasFontes] =
    useState<string>("");

  // Estado para armazenar a opção de revelação pública
  const [revelacaoPublica, setRevelacaoPublica] = useState<"sim" | "nao">(
    "nao"
  );

  // Estado para armazenar a descrição de revelação pública
  const [descricaoRevelacaoPublica, setDescricaoRevelacaoPublica] =
    useState<string>("");

  const [linkCodigoFonte, setLinkCodigoFonte] = useState<string>("");

  const [linguagensDisponiveis, setLinguagensDisponiveis] = useState<
    ILinguagem[]
  >([]);

  const [arquivoCodigoFonte, setArquivoCodigoFonte] = useState<File | null>(
    null
  );

  const [formData, setFormData] = useState<FormData | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    watch,
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
      vinculoUnitins: true,
      fasePublicacao: "",
      status: "ENVIADO",
      outrasObrasDesc: "",
      fonteFinanciamentoDesc: "",
      revelacaoDesc: "",
      revelacaoPublicaDesc: "",
      linkCodigoFonte: "",
      arquivoCodigoFonte: undefined,
      autores: [],
    },
  });

  // Preenche os campos do autor com os dados do perfil do usuário
  useEffect(() => {
    if (!isLoading && profile) {
      const nome = profile.nome || "";
      const matricula = profile.matricula || "";
      setAutores([{ nome, matricula }]);
      setValue("autores", [{ nome, matricula }]);
    }
  }, [profile, isLoading, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArquivoCodigoFonte(file);
      setValue("arquivoCodigoFonte", file);
    }
  };

  // Lógica de navegação
  const handleNext = async () => {
    let isValid = false;
    switch (activeStep) {
      case 0:
        isValid = await trigger(["autores", "vinculoUnitins"]);
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

        // Passa os nomes dos campos individualmente para o trigger
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
      if (activeStep >= steps.length - 1) {
        const formValues = getValues();
        // Formata o campo autores
        formValues.autores = formValues.autores
          .map((autor) => autor.nome)
          .join(", ");

        console.log("Form values before confirmation:", formValues);
        setFormData(formValues);
        setShowConfirmationModal(true);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const fetchUsuarioId = async () => {
      try {
        const id = await getUsuarioId(token);
        if (typeof id === "string") {
          setAutores((prevAutores) => [
            ...prevAutores,
            { nome: "", matricula: "", id },
          ]);
          setValue("autores", [
            ...(Array.isArray(getValues("autores"))
              ? getValues("autores")
              : []),
            { nome: "", matricula: "", id },
          ]);
        }
      } catch (error) {
        console.error("Erro ao buscar o ID do usuário:", error);
      }
    };

    fetchUsuarioId();
    getLinguagensAll(token)
      .then((response) => {
        setLinguagensDisponiveis(response || []);
      })
      .catch((error) => {
        console.error("Erro ao buscar linguagens:", error);
      });
  }, [token, setAutores, setValue, getValues]);

  const handleFormSubmit = handleSubmit((data) => {
    const formDataWithFile = { ...data, arquivoCodigoFonte };
    console.log("Form data before confirmation:", data);
    setFormData(data);
    setShowConfirmationModal(true);
  });

  const adicionarAutor = () => {
    setAutores((prevAutores) => [...prevAutores, { nome: "", matricula: "" }]);
    setValue("autores", [...getValues("autores"), { nome: "", matricula: "" }]);
  };

  const handleAutorChange = (
    index: number,
    field: keyof FormData["autores"][number],
    value: string
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

  const buscarAutor = async (index: number) => {
    // Lógica para buscar o autor na plataforma usando nome ou matrícula
    const matricula = autores[index].matricula;
    if (!matricula) {
      alert("Por favor, insira uma matrícula para buscar.");
      return;
    }

    const autorData = await getByMatricula(token, matricula);
    if (autorData) {
      handleAutorChange(index, "nome", autorData.nome);
      // Preencher outros campos do autor se necessário
    } else {
      alert("Autor não encontrado.");
    }
  };

  const handlePorcentagemChange = (index: number, value: number) => {
    const novosAutores = [...autores];
    novosAutores[index].porcentagem = value;
    const totalPorcentagem = novosAutores.reduce(
      (acc, autor) => acc + (autor.porcentagem || 0),
      0
    );

    if (totalPorcentagem <= 30) {
      setAutores(novosAutores);
      setError(null);
    } else {
      setError("A soma das porcentagens não pode exceder 30%");
    }
  };

  const onSubmit = async (data) => {
    console.log("Data do onSubmit", data);

    const formData = new FormData();
    formData.append("titulo", data.titulo);
    formData.append("descricao", data.descricao);
    formData.append("solucaoProblemaDesc", data.solucaoProblemaDesc);
    formData.append("linguagens", data.linguagens);
    formData.append("autores", JSON.stringify(data.autores));
    if (insercaoOpcao === "arquivo" && arquivoCodigoFonte) {
      formData.append("codigoFonte", arquivoCodigoFonte);
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
    const vinculoUnitins = getValues("vinculoUnitins");
    switch (activeStep) {
      case 0:
        return (
          <Grid
            className="w-[90%] bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
            container
            spacing={2}
          >
            <Stepper activeStep={activeStep} className="w-full mt-4">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Typography className="text-2xl font-medium">
              INFORMAÇÕES DOS AUTORES
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
                    required
                    label={`Matrícula do Autor ${index + 1}: `}
                    fullWidth
                    value={autor.matricula}
                    onChange={(e) =>
                      handleAutorChange(index, "matricula", e.target.value)
                    }
                    error={!!errors.autores?.[index]?.matricula}
                    helperText={errors.autores?.[index]?.matricula?.message}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button variant="outlined" onClick={() => buscarAutor(index)}>
                    Pesquisar
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    color="error"
                    onClick={() => removerAutor(index)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    label="Porcentagem de Contribuição (%): "
                    fullWidth
                    value={autores[index].porcentagem || 0}
                    helperText="Você deve inserir a porcentagem de participação do autor neste programa"
                    onChange={(e) =>
                      handlePorcentagemChange(index, parseFloat(e.target.value))
                    }
                  />
                </Grid>
              </Grid>
            ))}
            <Button
              className="mt-4"
              variant="outlined"
              onClick={adicionarAutor}
            >
              Adicionar Autor
            </Button>

            {/* Barra de Porcentagem */}
            <PorcentagemAutores autores={autores} />

            {/* Radio Group Vinculo Unitins */}
            <Grid item xs={12}>
              <Controller
                name="vinculoUnitins"
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
                      value={field.value === true ? "true" : "false"}
                      onChange={(e) =>
                        field.onChange(e.target.value === "true")
                      }
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
                    {errors.vinculoUnitins && (
                      <FormHelperText error>
                        {errors.vinculoUnitins.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Nome da Instituição */}
            {watch("vinculoUnitins") === false && (
              <Grid item xs={12}>
                <Controller
                  name="nomeInstituicao"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      required
                      label="Nome da Instituição (Apenas preencha, se caso não fazer parte da UNITINS)"
                      fullWidth
                      {...field}
                      error={!!errors.nomeInstituicao}
                      helperText={errors.nomeInstituicao?.message}
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>
        );
      case 1:
        return (
          <Grid
            className="w-[90%] bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
            container
            spacing={2}
          >
            <Stepper activeStep={activeStep} className="w-full mt-4">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Typography className="text-2xl font-medium">
              INFORMAÇÕES DO PROGRAMA
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
                    {["Tese", "Artigo", "TCC", "Outro"].map((option) => (
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
                    {arquivoCodigoFonte ? (
                      arquivoCodigoFonte.name
                    ) : (
                      <>
                        Adicione o documento aqui <UploadFileIcon />
                      </>
                    )}
                    <input
                      type="file"
                      hidden
                      onChange={(e) =>
                        handleFileChange(e, setArquivoCodigoFonte)
                      }
                    />
                  </Button>

                  {arquivoCodigoFonte && (
                    <TextField
                      className="w-[100%]"
                      label="Documento Selecionado"
                      variant="standard"
                      value={arquivoCodigoFonte.name}
                      disabled
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() => setArquivoCodigoFonte(null)}
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
            <Stepper activeStep={activeStep} className="w-full mt-4">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Typography className="text-2xl font-medium">
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
            <Stepper activeStep={activeStep} className="w-full mt-4">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Typography className="text-2xl font-medium">
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
    </div>
  );
}
