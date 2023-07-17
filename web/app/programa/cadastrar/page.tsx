"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Sidebar } from '../../components/MenuLateral/sidebar';
import ApiUtils from "@/app/Utils/Api/apiMethods";
import {useSearchParams} from "next/navigation";

const programa = z.object({
  nomeCompleto: z.string().nonempty('Campo obrigatório'),
  rg: z.string().refine(value => /^\d+$/.test(value), {
    message: 'Somente números',
    path: ['rg'],
  }).refine(value => value.length >= 7, {
    message: 'Mínimo de 7 dígitos',
    path: ['rg'],
  }),
  cpf: z.string().refine(value => /^\d+$/.test(value), {
    message: 'Somente números',
    path: ['cpf'],
  }).refine(value => value.length >= 11, {
    message: 'Mínimo de 11 dígitos',
    path: ['cpf'],
  }),
  dataNascimento: z.string().nonempty('Campo obrigatório'),
  estadoCivil: z.string().nonempty('Campo obrigatório'),
});

type FormData = z.infer<typeof programa>;

const NovaSolicitacao = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(programa),
  });

  const onSubmit = async (data: FormData) => {
  try {
    await ApiUtils.post('http://localhost:3333/programa/cadastrar', data);
    window.open('/dashboard', '_self'); // Abre a página de dashboard na mesma janela
  } catch (error) {
    console.error('Erro ao cadastrar o programa:', error);
  }
};

  const { get } = useSearchParams();
  const id = get('id');

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
                    {...register('nomeCompleto')}
                    fullWidth
                    type="text"
                    error={!!errors.nomeCompleto}
                    helperText={errors.nomeCompleto?.message || ' '}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                    label="RG"
                    {...register('rg')}
                    fullWidth
                    type="text"
                    error={!!errors.rg}
                    helperText={errors.rg?.message || ' '}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                    label="CPF"
                    {...register('cpf')}
                    fullWidth
                    type="text"
                    error={!!errors.cpf}
                    helperText={errors.cpf?.message || ' '}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                    label="Data de Nascimento"
                    type="date"
                    {...register('dataNascimento')}
                    fullWidth
                    error={!!errors.dataNascimento}
                    helperText={errors.dataNascimento?.message || ' '}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.estadoCivil}>
                  <InputLabel htmlFor="estadoCivil">Estado Civil</InputLabel>
                  <Select id="estadoCivil" {...register('estadoCivil')}>
                    <MenuItem value="solteiro">Solteiro</MenuItem>
                    <MenuItem value="casado">Casado</MenuItem>
                    <MenuItem value="viuvo">Viúvo</MenuItem>
                  </Select>
                  {errors.estadoCivil && (
                      <span className="text-red-500">{errors.estadoCivil.message}</span>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <div className="mt-4">
              <Button
                  className="bg-blue-900"
                  type="submit"
                  variant="contained"
                  color="primary">
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default NovaSolicitacao;