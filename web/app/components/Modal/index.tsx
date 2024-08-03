import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Stepper, Step, StepLabel } from '@mui/material';

interface ExplanationModalProps {
  open: boolean;
  pages: string[];
  onClose: () => void;
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({ open, pages, onClose }) => {
  const [modalStep, setModalStep] = useState<number>(0);

  const handleModalNext = () => {
    if (modalStep < pages.length - 1) {
      setModalStep(modalStep + 1);
    } else {
      onClose();
    }
  };

  const handleModalBack = () => {
    if (modalStep > 0) {
      setModalStep(modalStep - 1);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Bem-vindo</Typography>
        <Stepper activeStep={modalStep} alternativeLabel>
          {pages.map((_, index) => (
            <Step key={index}>
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>
      <DialogContent>
        <Typography>{pages[modalStep]}</Typography>
      </DialogContent>
      <DialogActions>
        {modalStep > 0 && <Button onClick={handleModalBack}>Voltar</Button>}
        <Button onClick={handleModalNext}>
          {modalStep === pages.length - 1 ? 'Confirmar' : 'Próximo'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExplanationModal;
