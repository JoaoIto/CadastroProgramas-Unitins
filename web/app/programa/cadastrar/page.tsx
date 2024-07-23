"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getUsuarioId } from "@/app/functions/getUsuarioId/getUsuarioId";
import { postPrograma } from "@/app/service/programa/post/postPrograma";
import { getStorageItem } from "@/app/functions/storage/getStorageItem/getStorageItem";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Typography,
  FormHelperText,
  IconButton,
  TextareaAutosize,
  RadioGroup,
  Radio,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

// Validação com Zod
const schema = z.object({
  titulo: z.string().min(1, { message: "Campo obrigatório" }),
  descricao: z.string().min(1, { message: "Campo obrigatório" }),
  solucaoProblemaDesc: z.string().min(1, { message: "Campo obrigatório" }),
  linguagens: z.array(z.string()).nonempty({ message: "Campo obrigatório" }),
  descricaoMercado: z.string().min(1, { message: "Campo obrigatório" }),
  dataCriacaoPrograma: z.string().min(1, { message: "Campo obrigatório" }),
  vinculoUnitins: z.boolean(),
  fasePublicacao: z.string().min(1, { message: "Campo obrigatório" }),
  status: z.string().min(1, { message: "Campo obrigatório" }),
  outrasObrasDesc: z.string().optional(),
  fonteFinanciamentoDesc: z.string().optional(),
  revelacaoDesc: z.string().optional(),
  revelacaoPublicaDesc: z.string().optional(),
  nomeArquivo: z.any().optional(),
  autores: z.array(z.string()).nonempty({ message: "Campo obrigatório" }),
});

type FormData = z.infer<typeof schema>;

export default function NovaSolicitacao() {
  const router = useRouter();
  const token = getStorageItem();
  const [currentPage, setCurrentPage] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const steps = [
    "Informações dos Autores",
    "Informações do Programa",
    "Caracterização do Programa",
    "Fatores de Relevância e Categoria",
  ];
  const [activeStep, setActiveStep] = useState(0);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    trigger,
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
      nomeArquivo: null,
      autores: [],
    },
  });

  // Lógica de navegação
  const handleNext = async () => {
    let isValid = false;
    switch (activeStep) {
      case 0:
        isValid = await trigger(["titulo", "descricao"]);
        break;
      case 1:
        isValid = await trigger([
          "descricaoMercado",
          "dataCriacaoPrograma",
          "vinculoUnitins",
        ]);
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
      const id = await getUsuarioId(token);
      if (typeof id === "string") {
        setValue("autores", [id]);
      }
    };

    fetchUsuarioId();
  }, [token, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      await postPrograma(data, token);
      toast.success("Programa enviado com sucesso!");
      router.push("/");
    } catch (error) {
      toast.error("Erro ao enviar o programa. Tente novamente.");
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
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
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText className="text-lg">Autor 1</FormHelperText>
                <Controller
                  name="titulo"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      label="Título do Programa"
                      fullWidth
                      error={!!errors.titulo}
                      helperText={errors.titulo?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
                variant="contained"
                onClick={handleNext}
              >
                Próximo
              </Button>
            </Grid>
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
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText className="text-lg">
                  1. Informe o título do seu programa de computador.
                </FormHelperText>
                <Controller
                  name="titulo"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      label="Título do Programa"
                      fullWidth
                      error={!!errors.titulo}
                      helperText={errors.titulo?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText className="text-lg">
                  2. Descreva o seu programa de computador, incluindo seus
                  principais recursos e funcionalidades.
                </FormHelperText>
                <Controller
                  name="descricao"
                  control={control}
                  render={({ field }) => (
                    <TextareaAutosize
                      {...field}
                      required
                      minRows={15}
                      placeholder="Descrição do Programa..."
                      className="w-full p-2 border-2 border-cinzaTraco placeholder:text-slate-400 rounded resize-none"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            {/* Outros campos... */}
            <Grid item xs={12}>
              <Button
                className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
                variant="contained"
                onClick={handleNext}
              >
                Próximo
              </Button>
            </Grid>
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
              CARACTERIZAÇÃO DO PROGRAMA DE COMPUTADOR
            </Typography>
            {/* Campos de modificação tecnológica, outras obras, fonte de financiamento */}
            <Grid item xs={12}>
              <Button
                className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
                variant="contained"
                onClick={handleBack}
              >
                Anterior
              </Button>
              <Button
                className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
                variant="contained"
                onClick={handleNext}
              >
                Próximo
              </Button>
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
              FATORES DE RELEVÂNCIA E CATEGORIA DE IMPACTO
            </Typography>
            {/* Campos de relevância e categorias */}
            <Grid item xs={12}>
              <Button
                className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
                variant="contained"
                onClick={handleBack}
              >
                Anterior
              </Button>
              <Button
                className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
                variant="contained"
                onClick={handleNext}
              >
                Próximo
              </Button>
            </Grid>
          </Grid>
        );
      case 4:
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
            <Typography className="text-2xl font-medium">CONCLUSÃO</Typography>
            {/* Revisão e resumo dos dados */}
            <Grid item xs={12}>
              <Button
                className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
                variant="contained"
                onClick={handleBack}
              >
                Anterior
              </Button>
              <Button
                className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
                variant="contained"
                onClick={handleNext}
              >
                Finalizar
              </Button>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderPageContent()}
      {showConfirmationModal && (
        <ConfirmationModal
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={() => handleSubmit(onSubmit)()}
        />
      )}
    </div>
  );
}

function ConfirmationModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="modal">
      <Typography variant="h6">Confirmar envio?</Typography>
      <Button onClick={onConfirm} color="primary">
        Confirmar
      </Button>
      <Button onClick={onClose} color="secondary">
        Cancelar
      </Button>
    </div>
  );
}
