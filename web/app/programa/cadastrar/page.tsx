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
  nomeArquivo: z.string().optional(),
  linkCodigoFonte: z.string().optional(),
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
  const [nomeDocumento, setNomeDocumento] = useState("");

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
      nomeArquivo: "",
      linkCodigoFonte: "",
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
          | "outrasObrasDesc"
          | "linguagens"
          | "nomeArquivo"
          | "linkCodigoFonte";
        const fieldsToValidate: FormFieldNames[] = [
          "titulo",
          "descricao",
          "solucaoProblemaDesc",
          "outrasObrasDesc",
          "linguagens",
        ];

        if (insercaoOpcao === "arquivo") {
          fieldsToValidate.push("nomeArquivo");
        } else if (insercaoOpcao === "link") {
          fieldsToValidate.push("linkCodigoFonte");
        }

        // Passa os nomes dos campos individualmente para o trigger
        isValid = await trigger(...fieldsToValidate);
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
            ...(Array.isArray(getValues("autores")) ? getValues("autores") : []),
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

  const onSubmit = async (data: FormData) => {
    setFormData(getValues());
    try {
      await postPrograma(data, token);
      toast.success("Programa enviado com sucesso!");
      router.push("/");
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
                    label={`Nome Completo do Autor ${index + 1}`}
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
                    label={`Matrícula do Autor ${index + 1}`}
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
                label="Porcentagem de Contribuição (%)"
                fullWidth
                value={autores[index].porcentagem || 0}
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
                    <FormLabel component="legend">Vínculo Unitins</FormLabel>
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
                    label="Título"
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
                    label="Descrição"
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
                    label="Solução do Problema"
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
        onChange={(event, newValue) => field.onChange(newValue as string[])}
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
                    {nomeDocumento ? (
                      nomeDocumento
                    ) : (
                      <>
                        Adicione o documento aqui <UploadFileIcon />
                      </>
                    )}
                    <input
                      type="file"
                      hidden
                      onChange={(e) =>
                        setNomeDocumento(e.target.files?.[0]?.name || "")
                      }
                    />
                  </Button>

                  {nomeDocumento && (
                    <TextField
                      className="w-[100%]"
                      label="Documento Selecionado"
                      variant="standard"
                      value={nomeDocumento}
                      disabled
                      InputProps={{
                        endAdornment: nomeDocumento && (
                          <IconButton
                            onClick={() => setNomeDocumento("")}
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
                  Existe Natureza de Outras Obras
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
                  <TextField
                    label="Descrição das Obras"
                    multiline
                    rows={3}
                    fullWidth
                    value={descricaoObras}
                    onChange={(e) => setDescricaoObras(e.target.value)}
                    error={!!errors.outrasObrasDesc}
                    helperText={errors.outrasObrasDesc?.message}
                  />
                </Grid>
              )}

              {/* Opções de Sim e Não para Fonte de Financiamento */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Existe Fonte de Financiamento
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
                  <TextField
                    label="Descrição de Fonte de Financiamento"
                    multiline
                    rows={3}
                    fullWidth
                    value={descricaoFonteFinanciamento}
                    onChange={(e) =>
                      setDescricaoFonteFinanciamento(e.target.value)
                    }
                    error={!!errors.fonteFinanciamentoDesc}
                    helperText={errors.fonteFinanciamentoDesc?.message}
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
                  Já houve confissão/revelação para outras fontes?
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
                  <TextField
                    label="Descrição de Confissão/Revelação para Outras Fontes"
                    multiline
                    rows={3}
                    fullWidth
                    value={descricaoConfissaoOutrasFontes}
                    onChange={(e) =>
                      setDescricaoConfissaoOutrasFontes(e.target.value)
                    }
                    error={!!errors.revelacaoDesc}
                    helperText={errors.revelacaoDesc?.message}
                  />
                </Grid>
              )}

              {/* Opções de Sim e Não para Revelação Pública */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Já houve revelação pública?
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
                  <TextField
                    label="Descrição de Revelação Pública"
                    multiline
                    rows={3}
                    fullWidth
                    value={descricaoRevelacaoPublica}
                    onChange={(e) =>
                      setDescricaoRevelacaoPublica(e.target.value)
                    }
                    error={!!errors.revelacaoPublicaDesc}
                    helperText={errors.revelacaoPublicaDesc?.message}
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
        formData={formData}
        title="Confirmar Envio"
        onConfirm={handleSubmit(onSubmit)}
        onCancel={handleCancel}
      />
    </div>
  );
}
