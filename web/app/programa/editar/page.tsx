"use client"

import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useRouter } from 'next/navigation';
import ApiUtils from '@/app/Utils/Api/apiMethods';
import Title from "@/app/components/Title/title";
import { getStorageItem } from "@/app/functions/getStorageItem/getStorageItem";
import { toast } from 'react-toastify';
//import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import { getProgramaById } from '@/app/service/programa/getById/getById';
import { getProgramaId } from '@/app/functions/programa/getProgramaId/getProgramaId';
import { tokenService } from '@/app/Utils/Cookies/tokenStorage';

const programaSchema = z.object({
    titulo: z.string().min(1, { message: 'Campo obrigatório' }),
    descricao: z.string().min(1, { message: 'Campo obrigatório' }),
    solucaoProblemaDesc: z.string().min(1, { message: 'Campo obrigatório' }),
    linguagens: z.array(z.string()).nonempty({ message: 'Campo obrigatório' }),
    descricaoMercado: z.string().min(1, { message: 'Campo obrigatório' }),
    dataCriacaoPrograma: z.string().min(1, { message: 'Campo obrigatório' }),
    vinculoUnitins: z.boolean(),
    fasePublicacao: z.string().min(1, { message: 'Campo obrigatório' }),
    status: z.string().min(1, { message: 'Campo obrigatório' }),
    nomeArquivo: z.any().optional(),
});

type Programa = z.infer<typeof programaSchema>;

const EditarSolicitacao = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Programa>({
        resolver: zodResolver(programaSchema),
    });
    const router = useRouter();
   
    const token = getStorageItem();
    const [isLoading, setIsLoading] = useState(true);
    const [linguagens, setLinguagens] = useState<string[]>([]);
    const [linguagemInput, setLinguagemInput] = useState<string>('');
    const [programaId, setProgramaId] = useState<string>(''); // State para armazenar o ID do programa

    useEffect(() => {
        // Função para buscar o ID do programa
        const fetchProgramaId = () => {
            try {
                const programaId = tokenService.getProgramaId() // Função getProgramaId() que retorna o ID
                console.log("Esse foi o id do programa", programaId);
                setProgramaId(programaId);
            } catch (error) {
                console.error('Erro ao buscar o ID do programa:', error);
            }
        };

        fetchProgramaId(); // Chamada da função de busca do ID do programa
    }, []);

    useEffect(() => {
        if (programaId) {
            // Função para buscar os dados do programa com base no ID
            const fetchProgramaData = async () => {
                try {
                    const programaData = await getProgramaById(token, programaId);
                    if (programaData) {
                        // Definir os valores nos campos do formulário com base nos dados do programa
                        setValue('titulo', programaData.titulo);
                        setValue('descricao', programaData.descricao);
                        setValue('solucaoProblemaDesc', programaData.solucaoProblemaDesc);
                        if (programaData.linguagens.length > 0) {
                            setLinguagens(programaData.linguagens);
                        }
                                                
                        setValue('descricaoMercado', programaData.descricaoMercado);
                        setValue('dataCriacaoPrograma', programaData.dataCriacaoPrograma);
                        setValue('vinculoUnitins', programaData.vinculoUnitins);
                        setValue('fasePublicacao', programaData.fasePublicacao);
                        setValue('status', programaData.status);
                        setValue('nomeArquivo', programaData.nomeArquivo);
                        setIsLoading(false); // Marcar como não carregando
                    } else {
                        console.error('Programa não encontrado');
                        setIsLoading(false); // Marcar como não carregando
                    }
                } catch (error) {
                    console.error('Erro ao buscar os dados:', error);
                    setIsLoading(false); // Marcar como não carregando
                }
            };

            fetchProgramaData(); // Chamada da função de busca dos dados do programa
        }
    }, [programaId, token, setValue]);

    const handleLinguagensKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        const trimmedInput = linguagemInput.trim();
        if ((event.key === 'Enter' || event.key === ' ' || event.key === ',') && trimmedInput !== '') {
            event.preventDefault();
            setLinguagens(prev => [...prev, trimmedInput]);
            setLinguagemInput('');
        }
    }, [linguagemInput]);

    const onSubmit = async (data: Programa) => {
        console.log('onSubmit');

    if (isLoading) {
        return <div>Carregando...</div>;
    }
}

    return (
        <div className="flex-grow bg-sky-200 p-8">
            <Title>Editar Solicitação</Title>
            <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    className="bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
                    container spacing={2}>
                    <h2 className={`text-2xl font-medium`}>Dados do programa de computador:</h2>
                    <Grid item xs={12}>
                        <TextField
                            label="Título do Programa"
                            {...register('titulo')}
                            fullWidth
                            type="text"
                            error={!!errors.titulo}
                            helperText={errors.titulo?.message || ' '}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextareaAutosize
                                minRows={4}
                                placeholder="Descrição do Programa..."
                                {...register('descricao')}
                                className={`w-full p-2 border-2 border-cinzaTraco placeholder:text-slate-400 rounded resize-none`}
                            />
                            {errors.descricao && (
                                <span className="text-red-500">{errors.descricao.message}</span>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextareaAutosize
                                minRows={4}
                                placeholder="Solução do Problema..."
                                {...register('solucaoProblemaDesc')}
                                className={`w-full p-2 border-2 border-cinzaTraco placeholder:text-slate-400 rounded resize-none`}
                            />
                            {errors.solucaoProblemaDesc && (
                                <span className="text-red-500">{errors.solucaoProblemaDesc.message}</span>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextareaAutosize
                                minRows={4}
                                placeholder="Descrição do Mercado..."
                                {...register('descricaoMercado')}
                                className={`w-full p-2 border-2 border-cinzaTraco placeholder:text-slate-400 rounded resize-none`}
                            />
                            {errors.descricaoMercado && (
                                <span className="text-red-500">{errors.descricaoMercado.message}</span>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Linguagens"
                            fullWidth
                            type="text"
                            value={linguagemInput}
                            onChange={(e) => setLinguagemInput(e.target.value)}
                            onKeyDown={handleLinguagensKeyDown}
                        />
                        <div>
                            {linguagens.map((linguagem, index) => (
                                <span key={index} className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    {linguagem}
                                </span>
                            ))}
                        </div>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <DatePicker
                            label="Data de Criação do Programa"
                            {...register('dataCriacaoPrograma')}
                            renderInput={(params) => <TextField {...params} />}
                            error={!!errors.dataCriacaoPrograma}
                            helperText={errors.dataCriacaoPrograma?.message || ' '}
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="vinculoUnitins">Vínculo com a Unitins</InputLabel>
                            <Select
                                {...register('vinculoUnitins')}
                                error={!!errors.vinculoUnitins}
                                defaultValue="Sim"
                            >
                                <MenuItem value="Sim">Sim</MenuItem>
                                <MenuItem value="Não">Não</MenuItem>
                            </Select>
                            {errors.vinculoUnitins && (
                                <span className="text-red-500">{errors.vinculoUnitins.message}</span>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="fasePublicacao">Fase de Publicação</InputLabel>
                            <Select
                                {...register('fasePublicacao')}
                                error={!!errors.fasePublicacao}
                                defaultValue="ARTIGO"
                            >
                                <MenuItem value="ARTIGO">ARTIGO</MenuItem>
                                <MenuItem value="TESE">TESE</MenuItem>
                                <MenuItem value="RESUMO">RESUMO</MenuItem>
                                <MenuItem value="CONGRESSO">CONGRESSO</MenuItem>
                            </Select>
                            {errors.fasePublicacao && (
                                <span className="text-red-500">{errors.fasePublicacao.message}</span>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx, .json, .zip, .java, .py"
                            {...register('nomeArquivo')}
                            onChange={(event) => {
                                if (event.target.files && event.target.files.length > 0) {
                                    console.log('Nome do arquivo selecionado:', event.target.files[0].name);
                                }
                            }}
                        />
                    </Grid>
                </Grid>
                <div className="mt-4">
                    <Button variant='contained' className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2" type="submit">
                        Atualizar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditarSolicitacao;
