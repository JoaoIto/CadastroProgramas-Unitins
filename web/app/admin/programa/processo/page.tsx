"use client"
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Grid, Button, TextField, Typography, Stepper, Step, StepLabel, Select, MenuItem } from '@mui/material';

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
      rpi: '',
      certificadoRegistro: null,
      protocoloINPI: '',
    },
  });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);

  const pages = [
    'Boleto',
    'Documento de Veracidade',
    'RPI',
    'Certificado de Registro',
    'Protocolo INPI',
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

  const handlePageSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedPage = event.target.value as number;
    setCurrentPage(selectedPage);
    setActiveStep(selectedPage);
  };

  const renderPageContent = () => {
    switch (pages[currentPage]) {
      case 'Boleto':
        return (
          <Controller
            name="boleto"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                onChange={(e) => setValue('boleto', e.target.files ? e.target.files[0] : null)}
              />
            )}
          />
        );
      case 'Documento de Veracidade':
        return (
          <Controller
            name="veracidade"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                onChange={(e) => setValue('veracidade', e.target.files ? e.target.files[0] : null)}
              />
            )}
          />
        );
      case 'RPI':
        return (
          <Controller
            name="rpi"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="RPI" fullWidth />
            )}
          />
        );
      case 'Certificado de Registro':
        return (
          <Controller
            name="certificadoRegistro"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                onChange={(e) => setValue('certificadoRegistro', e.target.files ? e.target.files[0] : null)}
              />
            )}
          />
        );
      case 'Protocolo INPI':
        return (
          <Controller
            name="protocoloINPI"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Protocolo INPI" fullWidth />
            )}
          />
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
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl">
        <Typography variant="h6" className="mb-4">{pages[currentPage]}</Typography>
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
            <Button variant="outlined" color="primary" onClick={handleBack} disabled={currentPage === 0}>
              Voltar
            </Button>
            {currentPage === pages.length - 1 ? (
              <Button variant="contained" className='bg-azulEscuro' type="submit">
                Enviar
              </Button>
            ) : (
              <Button variant="contained" className='bg-azulEscuro' onClick={handleNext}>
                Avançar
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ProcessoPage;
