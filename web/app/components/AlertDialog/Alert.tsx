import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Grid, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from '@mui/icons-material/Download';
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
interface AlertDialogProps {
  open: boolean;
  title: string;
  formData?: Record<string, any> | null; // Prop para passar os dados do formulário
  onConfirm: () => void;
  onCancel: () => void;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  title,
  formData,
  onConfirm,
  onCancel,
}) => {

  const [nomeDocumento, setNomeDocumento] = useState("");
  
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Você deseja enviar essa solicitação?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Para enviar a solicitação, você precisa encaminhar o documento abaixo!
        </Typography>
        <Typography variant="body2" gutterBottom>
          Depois de baixar, você precisa anexar o documento abaixo!
        </Typography>
        <div className="mt-4">
          <a href="/termos/Currículo%203%20(3).pdf" className='text-azulClaroGradient bg-azulEscuro p-2 rounded border-2 border-azulClaroGradient' download>
            Baixar Termos de Confidencialidade <DownloadIcon/>
          </a>
        </div>
        <Grid item xs={12} style={{ marginTop: 16 }}>
          <Typography variant="h6" gutterBottom>
            Adicionar Termo de Cofidencialidade assinado:
          </Typography>
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
              <>
                Adicione o documento aqui <UploadFileIcon />
              </>
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setNomeDocumento(e.target.files?.[0]?.name || "")
                }
              />
            </Button>
          
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
          </Grid>
        </Grid>
        {formData && (
          <div>
            {Object.entries(formData).map(([key, value]) => (
              <TextField
                key={key}
                label={key}
                value={value}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            ))}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
