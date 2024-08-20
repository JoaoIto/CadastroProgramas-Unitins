import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardActions from '@mui/material/CardActions';
import { useRouter } from 'next/navigation';
import { tokenService } from '@/app/Utils/Cookies/tokenStorage';
import { getStatusStyles } from './getStatusStyles';
import { IPrograma } from '@/app/interfaces/IPrograma';
import { Grid } from '@mui/material';

interface CardProgramProps {
    programa: IPrograma;
}

export const CardProgram: React.FC<CardProgramProps> = ({ programa }) => {
    const [mostrarDescricao, setMostrarDescricao] = useState(false);
    const router = useRouter();

    const handleEdit = () => {
        tokenService.setProgramaId(programa._id);
        router.push(`/programa/editar`);
    };

    const handleView = () => {
        tokenService.setProgramaId(programa._id);
        router.push(`/programa/vizualizar`);
    };

    const statusStyles = getStatusStyles(programa.status);

    return (
        <Card className="w-full border-l-8 border-l-azulEscuroGradient shadow-md shadow-cinzaTraco rounded-2xl m-4">
            <CardContent className="p-4">
                <Typography variant="h5" component="div">
                    {programa.titulo}
                </Typography>
                <div className="flex flex-wrap gap-2 my-2">
                    {programa.linguagens.map((linguagem, index) => (
                        <Chip color='primary' key={index} label={linguagem} variant="outlined" />
                    ))}
                </div>
                <Grid className='flex flex-col'>
                <Chip
                    label={programa.status}
                    variant="outlined"
                    style={{
                        borderColor: statusStyles.borderColor,
                        backgroundColor: statusStyles.backgroundColor,
                        color: statusStyles.color,
                        fontWeight: 'bold',
                        padding: '4px 8px',
                    }}
                />
                <Typography variant="caption">
                    Data de Criação do Programa: {programa.dataCriacaoPrograma ? new Date(programa.dataCriacaoPrograma).toLocaleDateString() : 'N/A'}
                </Typography>
                <CardActions>
                    <Button
                        className="text-azulEscuro hover:text-white hover:bg-azulEscuro"
                        onClick={() => setMostrarDescricao(!mostrarDescricao)}
                        startIcon={mostrarDescricao ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    >
                        Descrição
                    </Button>
                </CardActions>
                {mostrarDescricao && (
                    <Typography className="mt-2" variant="subtitle2">
                        {programa.descricao}
                    </Typography>
                )}
                <div className="flex gap-2 items-center mt-2">
                    <Button className="bg-azulEscuroGradient" variant="contained" onClick={handleView}>
                        Visualizar
                    </Button>
                    {programa.status === 'RASCUNHO' && (
                        <Button className="bg-azulEscuroGradient" variant="contained" onClick={handleEdit}>
                            Editar
                        </Button>
                    )}
                </div>
                </Grid>
            </CardContent>
        </Card>
    );
};
