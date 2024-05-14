import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonLinkPage from '@/app/components/ButtonLinkPage/ButtonLinkPage';

interface CardProgramProps {
    programa: IPrograma;
}

export const CardProgram: React.FC<CardProgramProps> = ({ programa }) => {
    return (
        <Card
            key={programa._id}
            className="w-4/5 m-8 border-l-8 border-l-azulEscuroGradient shadow-md shadow-cinzaTraco rounded-2xl">
            <CardContent className="p-4">
                <Typography variant="h5" component="div">
                    {programa.titulo}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Usuário ID: {programa.usuarioId}
                </Typography>
                <Typography variant="body2">Descrição: {programa.descricao}</Typography>
                <Typography variant="body2">Solução do Problema: {programa.solucaoProblemaDesc}</Typography>
                <Typography variant="body2">Linguagens: {programa.linguagens.join(', ')}</Typography>
                {programa.modificacaoTecnologicaDesc && (
                    <Typography variant="body2">Modificação Tecnológica: {programa.modificacaoTecnologicaDesc}</Typography>
                )}
                <Typography variant="body2">Descrição do Mercado: {programa.descricaoMercado}</Typography>
                <Typography variant="body2">
                    Data de Criação do Programa: {new Date(programa.dataCriacaoPrograma).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                    Data de Criação: {new Date(programa.dataCriacao).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">Vínculo com a Unitins: {programa.vinculoUnitins ? 'Sim' : 'Não'}</Typography>
                {programa.vinculoInstitucional && (
                    <Typography variant="body2">Vínculo Institucional: {programa.vinculoInstitucional}</Typography>
                )}
                <Typography variant="body2">Fase de Publicação: {programa.fasePublicacao}</Typography>
                <Typography variant="body2">Status: {programa.status}</Typography>
                {programa.nomeArquivo && (
                    <Typography variant="body2">Nome do Arquivo: {programa.nomeArquivo}</Typography>
                )}
                <div className="flex gap-2 items-center">
                    <Button className="bg-azulEscuroGradient" variant="contained">
                        Visualizar
                    </Button>
                    <div>
                        <ButtonLinkPage href="/programa/editar" uuid={programa._id}>Editar</ButtonLinkPage>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
