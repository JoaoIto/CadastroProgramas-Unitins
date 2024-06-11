"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Title from "@/app/components/Title/title";
import { getStorageItem } from "@/app/functions/getStorageItem/getStorageItem";
import { fetchPerfil } from "@/app/service/perfil/logUser";
import { updatePerfil } from "../service/perfil/put/putUser";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";

const Perfil: React.FC = () => {
  const router = useRouter();
  const [perfil, setPerfil] = useState<Partial<Perfil>>({
    cpf: "",
    rg: "",
    perfil: "",
    nome: "",
    matricula: "",
  });
  const [perfilId, setPerfilId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const token = getStorageItem();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPerfil(token);
      if (data) {
        setPerfil(data);
        setPerfilId(data._id);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [token]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPerfil((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    try {
      await updatePerfil(perfilId, perfil, token);
      toast.success("Perfil atualizado com sucesso!");
      router.push('/');
    } catch (error) {
      toast.error("Erro ao atualizar o perfil. Tente novamente.");
    }
    handleClose();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleOpen();
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="bg-sky-200 flex h-screen">
      <div className="flex flex-col w-full">
        <main className="p-4">
          <Title>Perfil</Title>
          <form onSubmit={handleSubmit} className="bg-white p-4 shadow-2xl border-l-[10px] border-l-black rounded-2xl">
            <h2 className="font-medium text-2xl mb-4">Informações do usuário: </h2>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  label="Nome completo"
                  name="nome"
                  value={perfil.nome}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="CPF"
                  name="cpf"
                  value={perfil.cpf}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="RG"
                  name="rg"
                  value={perfil.rg}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Tipo de Perfil"
                  name="perfil"
                  value={perfil.perfil}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Matrícula"
                  name="matricula"
                  value={perfil.matricula}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid className="w-full flex justify-end" item xs={12}>
                <Button
                  variant="contained"
                  className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2" 
                  type="submit"
                >
                  Atualizar
                </Button>
              </Grid>
            </Grid>
          </form>
        </main>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar Atualização do Perfil
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja atualizar o perfil?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Perfil;
