"use client";
import { useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "@mui/material";
import { useRouter } from "next/navigation";
import AlertMessage from "@/app/components/AlertMessage"; // Importa o componente
import { postUserCadastro } from "@/app/service/auth/postRegister";

const novoUsuarioSchema = z.object({
  nome: z.string().nonempty("Nome é obrigatório"),
  cpf: z.string().refine((value) => /^\d{11}$/.test(value), {
    message: "CPF deve ter 11 dígitos",
  }),
  rg: z.string().refine((value) => /^\d{7}$/.test(value), {
    message: "RG deve ter 7 dígitos",
  }),
  rua: z.string().nonempty("Rua é obrigatória"),
  bairro: z.string().nonempty("Bairro é obrigatório"),
  cep: z.string().refine((value) => /^\d{8}$/.test(value), {
    message: "CEP deve ter 8 dígitos",
  }),
  senha: z.string().min(4, "Mínimo de 4 caracteres"),
  matricula: z.string().nonempty("Matrícula é obrigatória"),
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

  const steps = ["Dados Pessoais", "Endereço", "Senha e Matrícula"];

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };

  const handleNext = async () => {
    let isValid = false;
    switch (activeStep) {
      case 0:
        isValid = await trigger(["nome", "cpf", "rg"]);
        break;
      case 1:
        isValid = await trigger(["rua", "bairro", "cep"]);
        break;
      case 2:
        isValid = await trigger(["matricula", "senha"]);
        break;
    }

    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  async function onSubmit(data: NovoUsuario) {
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
          </>
        );
      case 1:
        return (
          <>
            <TextField
              margin="normal"
              placeholder="Insira sua rua: "
              required
              fullWidth
              label="Rua"
              {...register("rua")}
              error={!!errors.rua}
              helperText={errors.rua?.message}
            />
            <TextField
              margin="normal"
              placeholder="Insira seu bairro: "
              required
              fullWidth
              label="Bairro"
              {...register("bairro")}
              error={!!errors.bairro}
              helperText={errors.bairro?.message}
            />
            <TextField
              margin="normal"
              placeholder="Insira seu CEP: "
              required
              fullWidth
              label="CEP"
              {...register("cep")}
              error={!!errors.cep}
              helperText={errors.cep?.message}
            />
          </>
        );
      case 2:
        return (
          <>
            <TextField
              margin="normal"
              placeholder="Insira sua matrícula: "
              required
              fullWidth
              label="Matrícula"
              {...register("matricula")}
              error={!!errors.matricula}
              helperText={errors.matricula?.message}
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
              <Button onClick={handleBack} variant="contained" color="primary" className="bg-azulEscuro">
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
              <>
              <div>
              <Typography>
              Já possui conta? 
              </Typography>
              <Button
    onClick={routerLogin}
    className="mt-2 bg-azulEscuro"
    variant="contained"
    size="small"
  >
    Entrar
  </Button>
  </div>
              <Button
                onClick={handleNext}
                variant="contained"
                color="primary"
                className="bg-azulEscuro"
              >
                Próximo
              </Button>
              </>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
}
