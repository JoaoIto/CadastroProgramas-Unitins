"use client";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import ApiUtils from "@/app/Utils/Api/apiMethods";
import { useRouter } from "next/navigation";
import { tokenService } from "@/app/Utils/Cookies/tokenStorage";
import AlertMessage from "@/app/components/AlertMessage"; // Importa o componente

export async function postUserLogin(user: ILoginUser): Promise<string> {
  try {
    const response = await ApiUtils.authenticate(user);
    if (response !== undefined) {
      const token = response;
      return token;
    } else {
      throw new Error("A autenticação não retornou um token válido.");
    }
  } catch (error) {
    console.error("Erro durante a autenticação:", error);
    throw error;
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const usuarioSchema = z.object({
    cpf: z.string().refine((value) => /^\d+$/.test(value), {
      message: "Somente números",
    }),
    senha: z.string().min(4, "Mínimo de 4 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUsuario>({
    resolver: zodResolver(usuarioSchema),
  });

  async function onSubmit(data: IUsuario) {
    try {
      const token = await postUserLogin(data);
      tokenService.save(token);
      setMessage("Login bem-sucedido!");
      setSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Erro durante o login:", error);
      setMessage("Falha ao fazer login. Verifique suas credenciais.");
      setSeverity("error");
      setSnackbarOpen(true);
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };

  const routerRegister = () => {
    router.push("cadastro");
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <AlertMessage
          open={snackbarOpen}
          message={message}
          severity={severity}
          onClose={handleCloseSnackbar}
        />
        <Box className="mt-8 flex flex-col items-center">
          <Avatar className="m-1 bg-secondary-main">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className="mt-4 text-center">
            Software Hub - Unitins
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-1 w-full"
          >
            <TextField
              className="font-bold"
              margin="normal"
              required
              fullWidth
              id="cpf"
              label="CPF: "
              autoComplete="cpf"
              autoFocus
              {...register("cpf")}
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Senha: "
              id="senha"
              autoComplete="current-senha"
              {...register("senha")}
              error={!!errors.senha}
              helperText={errors.senha?.message}
            />
            <Grid className="flex flex-col" item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
              <Button
                className="bg-azulEscuro"
                type="submit"
                variant="contained"
                color="primary"
              >
                Entrar
              </Button>
              <Typography
                component="p"
                variant="body2"
                className="mt-4 text-center"
              >
                Não possui conta?
              </Typography>
              <Button
                onClick={routerRegister}
                className="bg-azulEscuro"
                variant="contained"
                color="primary"
              >
                Criar conta
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
