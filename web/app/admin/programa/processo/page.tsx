"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  Button,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import ExplanationModal from "@/app/components/Modal";
import FileUploadField from "@/app/components/FileUploadField";

interface FormData {
  boleto: File | null;
  veracidade: File | null;
  rpi: string;
  certificadoRegistro: File | null;
  protocoloINPI: string;
}

const ProcessoPage: React.FC = () => {
  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      boleto: null,
      veracidade: null,
      rpi: "",
      certificadoRegistro: null,
      protocoloINPI: "",
    },
  });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);

  const [openModal, setOpenModal] = useState<boolean>(true);

  const [fileNames, setFileNames] = useState({
    boleto: "",
    veracidade: "",
    certificadoRegistro: "",
  });

  const pages = [
    "Boleto",
    "Documento de Veracidade",
    "RPI",
    "Certificado de Registro",
    "Protocolo INPI",
  ];

  const modalPages = [
    "Bem-vindo à página de Processo de Solicitação. Aqui você irá completar os passos necessários conseguir aprovar uma solicitação de registro",
    "Certifique-se de preencher todos os campos obrigatórios e anexar os documentos necessários em cada etapa.",
    "Ao completar todas as etapas, você poderá enviar seus documentos de devolução para o aluno submetedor.",
    "Todas as etapas, mesmo que não todas, assim que submetidas, são avisadas ao usuário e registradas por data!",
    "Preste atenção ao preencher todas as etapas! Clique em 'Confirmar' para prosseguir."
  ];

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Lógica de envio do formulário
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setActiveStep(activeStep - 1);
    }
  };

  const handlePageSelect = (event: SelectChangeEvent<number>) => {
    const selectedPage = event.target.value as number;
    setCurrentPage(selectedPage);
    setActiveStep(selectedPage);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleFileChange = (key: keyof FormData) => (file: File | null) => {
    setValue(key, file);
    setFileNames((prev) => ({ ...prev, [key]: file ? file.name : "" }));
  };

  const handleFileClear = (key: keyof FormData) => () => {
    setValue(key, null);
    setFileNames((prev) => ({ ...prev, [key]: "" }));
  };

  const renderPageContent = () => {
    switch (pages[currentPage]) {
      case "Boleto":
        return (
          <div>
            <Typography variant="body2">Aqui deve ser inserido o boleto de pagamento da solicitação no INPI: </Typography>
            <Typography className="text-vermelho">Insira o documento no campo abaixo: </Typography>
            <FileUploadField
              label="Boleto"
              fileName={fileNames.boleto}
              onFileChange={handleFileChange("boleto")}
              onClear={handleFileClear("boleto")}
            />
          </div>
        );
      case "Documento de Veracidade":
        return (
          <div>
            <Typography variant="body2">Aqui deve ser inserido o Documento de veracidade da solicitação: </Typography>
            <Typography className="text-vermelho">Insira o documento no campo abaixo: </Typography>
          <FileUploadField
            label="Documento de Veracidade"
            fileName={fileNames.veracidade}
            onFileChange={handleFileChange("veracidade")}
            onClear={handleFileClear("veracidade")}
          />
          </div>
        );
      case "RPI":
        return (
          <div>
             <Typography variant="body2">Aqui deve ser inserido o número de registro RPI</Typography>
            <Typography className="text-vermelho">Insira o número no campo abaixo: </Typography>
          <Controller
            name="rpi"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="RPI" fullWidth />
            )}
          />
          </div>
        );
      case "Certificado de Registro":
        return (
          <div>
            <Typography variant="body2">Aqui deve ser documento do certificado de registro INPI</Typography>
            <Typography className="text-vermelho">Insira o documento no campo abaixo: </Typography>
          <FileUploadField
            label="Certificado de Registro"
            fileName={fileNames.certificadoRegistro}
            onFileChange={handleFileChange("certificadoRegistro")}
            onClear={handleFileClear("certificadoRegistro")}
          />
          </div>
        );
      case "Protocolo INPI":
        return (
          <div>
          <Typography variant="body2">Aqui deve ser inserido o número de registro já no INPI</Typography>
          <Typography className="text-vermelho">Insira o número no campo abaixo: </Typography>
          <Controller
            name="protocoloINPI"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Protocolo INPI" fullWidth />
            )}
          />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-grow bg-sky-200 p-8">
      <Typography variant="h4" className="mb-4">
        Processo de Solicitação
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl"
      >
        <Typography variant="h6" className="mb-4">
          {pages[currentPage]}
        </Typography>
        <Stepper activeStep={activeStep} className="w-full mt-4">
          {pages.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Select value={currentPage} onChange={handlePageSelect} fullWidth>
              {pages.map((page, index) => (
                <MenuItem key={page} value={index}>
                  {page}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            {renderPageContent()}
          </Grid>
          <Grid item container justifyContent="space-between">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleBack}
              disabled={currentPage === 0}
            >
              Voltar
            </Button>
            {currentPage === pages.length - 1 ? (
              <Button
                variant="contained"
                className="bg-azulEscuro"
                type="submit"
              >
                Enviar
              </Button>
            ) : (
              <Button
                variant="contained"
                className="bg-azulEscuro"
                onClick={handleNext}
              >
                Avançar
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
      <ExplanationModal
        open={openModal}
        pages={modalPages}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProcessoPage;
