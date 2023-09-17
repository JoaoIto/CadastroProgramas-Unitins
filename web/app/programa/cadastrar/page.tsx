"use client"

import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {Sidebar} from '../../components/MenuLateral/sidebar';
import ApiUtils from '@/app/Utils/Api/apiMethods';
import {ProgramaStatus} from '@/app/enum/programa-status.enum';
import Grid from "@mui/material/Grid";
import Title from "@/app/components/Title/title";

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
    status: z.string(),
    nomeArquivo: z.any(),
});

type FormData = z.infer<typeof programa>;

function NovaSolicitacao() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(programa),
    });

    const usuarioId = sessionStorage.getItem('perfilId');
    let fileName: string | undefined = undefined;
    const [status, setStatus] = useState<ProgramaStatus>(ProgramaStatus.RASCUNHO);

    console.log("Render")

    // Função para enviar o arquivo para /programa/uploads
    async function enviarArquivo(arquivo: File) {
        try {
            const formData = new FormData();
            formData.append('file', arquivo);
            const response = await ApiUtils.post('http://localhost:3333/programa/uploads', formData);
            return response;
        } catch (error) {
            console.error('Erro ao enviar o arquivo:', error);
            throw error;
        }
    }

    const onSubmit = async (data: FormData) => {
        try {
            if (fileName) {
                const response = await enviarArquivo(data.nomeArquivo[0]);
            }
            data.nomeArquivo = data.nomeArquivo[0].name;
            console.log(data);
            // Enviar o formulário para /programa/cadastrar
            const programaCriado = await ApiUtils.post('http://localhost:3333/programa/cadastrar', {
                ...data,
                status: status,
            });
            // window.open('/dashboard', '_self'); // Abre a página de dashboard na mesma janela
        } catch (error) {
            console.error('Erro ao cadastrar o programa:', error);
        }
    };

    const handleSave = () => {
        console.log("Salvar clickado!")
        setStatus(ProgramaStatus.RASCUNHO); // Altera o status para RASCUNHO antes de chamar a função de submissão
        handleSubmit(onSubmit); // Chama a função de submissão passando os dados do formulário
    };
    const handleSend = () => {
        console.log("Enviar clickado!")
        setStatus(ProgramaStatus.ENVIADO); // Altera o status para ENVIADO antes de chamar a função de submissão
        handleSubmit(onSubmit); // Chama a função de submissão passando os dados do formulário
    };

    const isSmallScreen = window.innerWidth < 870;

    return <div className="flex w-screen h-screen">
        <Sidebar/>
        <div className="flex-grow bg-sky-200 p-8">
            <Title>Nova Solicitação</Title>
            <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    style={{ maxWidth: isSmallScreen ? '400px' : 'none' }} // Aplicar largura máxima em uma visualização móvel
                    className="bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
                    container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Nome Completo"
                            {...register('nomeCompleto')}
                            fullWidth
                            type="text"
                            error={!!errors.nomeCompleto}
                            helperText={errors.nomeCompleto?.message || ' '}
                            style={{ maxWidth: isSmallScreen ? '220px' : 'none' }} // Aplicar largura máxima em uma visualização móvel
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
                            style={{ maxWidth: isSmallScreen ? '220px' : 'none' }} // Aplicar largura máxima em uma visualização móvel
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
                            style={{ maxWidth: isSmallScreen ? '220px' : 'none' }} // Aplicar largura máxima em uma visualização móvel
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
                            style={{ maxWidth: isSmallScreen ? '220px' : 'none' }} // Aplicar largura máxima em uma visualização móvel
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
                            {errors.estadoCivil && <span className="text-red-500">{errors.estadoCivil.message}</span>}
                        </FormControl>
                    </Grid>
                    <Grid>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx, .json, .zip, .java, .py"
                            {...register('nomeArquivo')}
                            onChange={(event) => {
                                if (event.target.files && event.target.files.length > 0) {
                                    fileName = event.target.files[0].name;
                                }
                            }}
                        />
                    </Grid>
                </Grid>

                <div className="mt-4">
                    <button className="bg-blue-500 border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2" type="submit"
                            onClick={handleSave}>
                        Salvar
                    </button>
                    <button className="bg-blue-700 border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2" type="submit"
                            onClick={handleSend}>
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    </div>;
}

export default NovaSolicitacao;
