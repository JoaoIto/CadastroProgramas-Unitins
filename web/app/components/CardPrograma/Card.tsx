import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonLinkPage from '@/app/components/ButtonLinkPage/ButtonLinkPage';
import {ProgramaStatus} from "@/app/enum/programa-status.enum";
import ApiUtils from '@/app/Utils/Api/apiMethods';
import Perfil from "@/app/perfil/page";

interface CardProgramProps {
    programa: Programa;
}

interface Programa {
    _id: string;
    nomeCompleto: string;
    rg: string;
    cpf: string;
    dataNascimento: string;
    estadoCivil: string;
    status?: string;
}

export const CardProgram: React.FC<CardProgramProps> = ({programa}) => {
    const [perfil, setPerfil] = useState<string>('');

    return (
        <Card
            className="w-4/5 m-8 border-l-8 border-l-azulEscuroGradient shadow-md shadow-cinzaTraco rounded-2xl">
            <CardContent className="p-4">
                <Typography variant="h5" component="div">
                    {programa.nomeCompleto}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    RG: {programa.rg}
                </Typography>
                <Typography variant="body2">CPF: {programa.cpf}</Typography>
                <Typography variant="body2">
                    Data de Nascimento: {programa.dataNascimento}
                </Typography>
                <Typography variant="body2">Estado Civil: {programa.estadoCivil}</Typography>
                <Typography variant="body2">Status: {programa.status}</Typography>
                <div className="flex gap-2 items-center">
                    <Button className="bg-azulEscuroGradient" variant="contained" size="small">
                        Visualizar
                    </Button>
                    <div>
                        <ButtonLinkPage href="/programa/editar" uuid={programa._id}>Editar</ButtonLinkPage>
                    {/*    <button className="text-white bg-red-800 p-2 rounded font-Inter"*/}
                    {/*            color="primary">*/}
                    {/*            Deletar*/}
                    {/*</button>*/}
                </div>
                {/*<div>*/}
                {/*    <button>Cancelar</button>*/}
                {/*</div>*/}
            </div>
        </CardContent>
</Card>
)
    ;
};
