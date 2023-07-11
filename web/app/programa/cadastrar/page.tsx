"use client"
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Sidebar } from '../../components/MenuLateral/sidebar';

type FormData = {
  nomeCompleto: string;
  rg: number;
  cpf: number;
  dataNascimento: string;
  estadoCivil: string;
};

const NovaSolicitacao = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('http://localhost:3333/programa/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Dados enviados com sucesso');
      } else {
        console.log('Erro ao enviar os dados:', response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Nova Solicitação</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nome Completo"
                {...register('nomeCompleto', { required: true })}
                fullWidth
                type="text"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="RG"
                {...register('rg', { required: true, pattern: /^[0-9]+$/ })}
                fullWidth
                inputProps={{ maxLength: 7 }}
                type="number"
                inputMode="numeric"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="CPF"
                {...register('cpf', { required: true, pattern: /^[0-9]+$/ })}
                fullWidth
                inputProps={{ maxLength: 11 }}
                type="number"
                inputMode="numeric"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Data de Nascimento"
                type="date"
                {...register('dataNascimento', { required: true })}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="estadoCivil">Estado Civil</InputLabel>
                <Select
                  id="estadoCivil"
                  {...register('estadoCivil', { required: true })}
                >
                  <MenuItem value="solteiro">Solteiro</MenuItem>
                  <MenuItem value="casado">Casado</MenuItem>
                  <MenuItem value="viuvo">Viúvo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <div className="mt-4">
            <Button
              className="bg-blue-900"
              type="submit"
              variant="contained"
              color="primary"
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovaSolicitacao;
