"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  TextField,
  Typography,
  Container,
  Avatar,
  Box,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useRouter } from "next/navigation";
import AlertMessage from "@/app/components/AlertMessage";
import { postUserCadastro } from "@/app/service/auth/postRegister";

const novoUsuarioSchema = z.object({
  nome: z.string().nonempty("Nome é obrigatório"),
  cpf: z.string().refine((value) => /^\d{11}$/.test(value), {
    message: "CPF deve ter 11 dígitos",
  }),
  rg: z.string().refine((value) => /^\d{7}$/.test(value), {
    message: "RG deve ter 7 dígitos",
  }),
  senha: z.string().min(4, "Mínimo de 4 caracteres"),
  email: z.string().email().nonempty("Email é obrigatória"),
});

export type NovoUsuario = z.infer<typeof novoUsuarioSchema>;

export default function CadastroPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<NovoUsuario>({
    resolver: zodResolver(novoUsuarioSchema),
    mode: "onChange",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Dados Pessoais", "Email e senha"];

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };

  const handleNext = async () => {
    let isValidStep = false;
    switch (activeStep) {
      case 0:
        isValidStep = await trigger(["nome", "cpf", "rg"]);
        break;
      case 1:
        isValidStep = await trigger(["senha", "email"]);
        break;
    }

    if (isValidStep) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  async function onSubmit(data: NovoUsuario) {
    console.log(data);
    
    try {
      await postUserCadastro(data);
      setMessage("Cadastro bem-sucedido!");
      setSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Erro durante o cadastro:", error);
      setMessage("Erro ao cadastrar. Tente novamente.");
      setSeverity("error");
      setSnackbarOpen(true);
    }
  }

  const routerLogin = () => {
    router.push("login");
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              margin="normal"
              placeholder="Insira seu nome completo: "
              required
              fullWidth
              label="Nome"
              {...register("nome")}
              error={!!errors.nome}
              helperText={errors.nome?.message}
            />
            <TextField
              margin="normal"
              placeholder="Insira seu CPF: "
              required
              fullWidth
              label="CPF"
              {...register("cpf")}
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
            />
            <TextField
              margin="normal"
              placeholder="Insira seu RG: "
              required
              fullWidth
              label="RG"
              {...register("rg")}
              error={!!errors.rg}
              helperText={errors.rg?.message}
            />
            <Typography
              component="p"
              variant="body2"
              className="mt-4 text-center flex flex-col"
            >
              Já possui conta? Faça login.
              <Button
                onClick={routerLogin}
                className="bg-azulEscuro"
                variant="contained"
                color="primary"
                size="small"
              >
                Entrar
              </Button>
            </Typography>
          </>
        );
      case 1:
        return (
          <>
            <TextField
              margin="normal"
              placeholder="Insira seu melhor email: "
              required
              fullWidth
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              placeholder="Insira sua senha: ****"
              required
              fullWidth
              label="Senha"
              type="password"
              {...register("senha")}
              error={!!errors.senha}
              helperText={errors.senha?.message}
            />
          </>
        );
      default:
        return "Desconhecido";
    }
  };

  return (
    <Container maxWidth="xs">
      <Box className="mt-8 flex flex-col items-center">
        <AlertMessage
          open={snackbarOpen}
          message={message}
          severity={severity}
          onClose={handleCloseSnackbar}
        />
        <Avatar className="m-1 bg-secondary-main">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className="mt-4 text-center">
          Software Hub - Unitins
        </Typography>
        <Stepper activeStep={activeStep} className="w-full mt-4">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {renderStepContent(activeStep)}
          <Box className="flex justify-between mt-4">
            {activeStep !== 0 && (
              <Button
                onClick={handleBack}
                variant="contained"
                color="primary"
                className="bg-azulEscuro"
              >
                Voltar
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="bg-azulEscuro"
              >
                Cadastrar
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                variant="contained"
                color="primary"
                className="bg-azulEscuro"
              >
                Próximo
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
}
