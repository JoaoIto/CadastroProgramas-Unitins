"use client";
import React from "react";
import { Sidebar } from "../components/MenuLateral/sidebar";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

interface FormData {
  nomeCompleto: string;
  estadoCivil: string;
  dataNascimento: string;
  telefone: string;
  rg: string;
  orgaoEmissor: string;
  cpf: string;
  email: string;
  profissao: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  vinculoUnitins: string;
}

const NovaSolicitacao = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="w-3/4 flex flex-col p-6 item-center text-center">
        <h1 className="text-3xl font-bold text-center justify-center">
          Nova Solicitação:
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <TextField
              label="Nome Completo"
              {...register("nomeCompleto", {
                required: true,
                pattern: /^[a-zA-Z\s]*$/,
              })}
              variant="outlined"
              fullWidth
              error={!!errors.nomeCompleto}
              helperText={errors.nomeCompleto ? "Campo obrigatório" : ""}
            />
          </div>

          <div className="mb-4">
            <FormControl fullWidth>
              <InputLabel htmlFor="estadoCivil">Estado Civil</InputLabel>
              <Select
                id="estadoCivil"
                {...register("estadoCivil", { required: true })}
              >
                <MenuItem value="solteiro">Solteiro</MenuItem>
                <MenuItem value="casado">Casado</MenuItem>
                <MenuItem value="viuvo">Viúvo</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="mb-4">
            <TextField
              label=""
              type="date"
              {...register("dataNascimento", { required: true })}
              variant="outlined"
              fullWidth
              error={!!errors.dataNascimento}
              helperText={errors.dataNascimento ? "Campo obrigatório" : ""}
            />
          </div>
          <div className="mb-4">
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovaSolicitacao;
