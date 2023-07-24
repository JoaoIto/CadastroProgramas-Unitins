"use client"

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { Sidebar } from '../../components/MenuLateral/sidebar';
import { useRouter, useSearchParams } from 'next/navigation';
import ApiUtils from '@/app/Utils/Api/apiMethods';
import ButtonLinkPage from "@/app/components/ButtonLinkPage/ButtonLinkPage";

const programaSchema = z.object({
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

type Programa = z.infer<typeof programaSchema>;

const EditarSolicitacao = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Programa>({
        resolver: zodResolver(programaSchema),
    });
    const { get } = useSearchParams();
    const uuid = get('uuid');
    const router = useRouter();

    useEffect(() => {
        if (uuid) {
            fetchProgramaData(uuid);
        }
    }, [uuid]);

    const fetchProgramaData = async (uuid: string) => {
        try {
            const programData = await ApiUtils.getByUuid<Programa>('http://localhost:3333/programa', uuid);
            if (programData) {
                Object.entries(programData).forEach(([key, value]) => {
                    setValue(key as keyof Programa, value);
                });
            } else {
                console.error('Programa não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
        }
    };

    const onSubmit = async (data: Programa) => {
        try {
            if (uuid) {
                await ApiUtils.put(`http://localhost:3333/programa/${uuid}`, data);
                window.open('/dashboard', '_self');
            } else {
                console.error('UUID não encontrado');
            }
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error);
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-grow p-8">
                <h1 className="text-3xl font-bold mb-4 text-center">Editar Programa</h1>
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
                        <button type="submit">Editar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarSolicitacao;
