"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  Avatar,
  Box,
  Stepper,
  Step,
  StepLabel,
  Link,
} from "@mui/material";
import { useRouter } from "next/navigation";
import AlertMessage from "@/app/components/AlertMessage"; // Importa o componente
import { redefinirSenha } from "@/app/service/auth/postRedPassword";

// Esquema de validação para os campos do formulário
const esqueciSenhaSchema = z
  .object({
    cpf: z.string().refine((value) => /^\d{11}$/.test(value), {
      message: "CPF deve ter 11 dígitos",
    }),
    novaSenha: z.string().min(4, "Mínimo de 4 caracteres"),
    repetirSenha: z.string().min(4, "Mínimo de 4 caracteres"),
  })
  .refine((data) => data.novaSenha === data.repetirSenha, {
    message: "As senhas não coincidem",
    path: ["repetirSenha"],
  });

export type EsqueciSenha = z.infer<typeof esqueciSenhaSchema>;

export default function EsqueciSenhaPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<EsqueciSenha>({
    resolver: zodResolver(esqueciSenhaSchema),
    mode: "onChange",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Insira seu CPF", "Defina uma nova senha"];

  const routerLogin = () => {
    router.push("/auth/login");
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };

  const handleNext = async () => {
    let isValid = false;
    switch (activeStep) {
      case 0:
        isValid = await trigger(["cpf"]);
        break;
      case 1:
        isValid = await trigger(["novaSenha", "repetirSenha"]);
        break;
    }

    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  async function onSubmit(data: EsqueciSenha) {
    try {
      await redefinirSenha(data);
      setMessage("Senha redefinida com sucesso!");
      setSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      setMessage("Erro ao redefinir senha. Tente novamente.");
      setSeverity("error");
      setSnackbarOpen(true);
    }
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="w-full">
            <TextField
              className="w-full"
              margin="normal"
              placeholder="Insira seu CPF: "
              required
              fullWidth
              label="CPF"
              {...register("cpf")}
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
            />
          </div>
        );
      case 1:
        return (
          <div className="w-full">
            <TextField
              margin="normal"
              placeholder="Insira sua nova senha: "
              required
              fullWidth
              label="Nova Senha"
              type="password"
              {...register("novaSenha")}
              error={!!errors.novaSenha}
              helperText={errors.novaSenha?.message}
            />
            <TextField
              margin="normal"
              placeholder="Repita a nova senha: "
              required
              fullWidth
              label="Repetir Nova Senha"
              type="password"
              {...register("repetirSenha")}
              error={!!errors.repetirSenha}
              helperText={errors.repetirSenha?.message}
            />
          </div>
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
          Esqueceu a Senha
        </Typography>
        <Stepper activeStep={activeStep} className="w-full mt-4">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
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
                Redefinir Senha
              </Button>
            ) : (
              <div className="w-full flex justify-between">
                <Button
                  onClick={routerLogin}
                  variant="contained"
                  color="primary"
                  className="bg-azulEscuro"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color="primary"
                  className="bg-azulEscuro"
                >
                  Próximo
                </Button>
              </div>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
}
