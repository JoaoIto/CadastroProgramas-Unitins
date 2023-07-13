import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonLinkPage from "@/app/components/ButtonLinkPage/ButtonLinkPage";
import ApiUtils from "@/app/Utils/Api/apiMethods";
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
}

export const CardProgram: React.FC<CardProgramProps> = ({ programa }) => {

  const onSubmit = async (data: FormData, uuid: string) => {
    await ApiUtils.get(`http://localhost:3333/programa/${uuid}`);
    // Realize qualquer ação necessária após a atualização
  };


  return (
      <Card className='w-2/5 m-8'>
        <CardContent className='p-4'>
          <Typography variant="h5" component="div">
            {programa.nomeCompleto}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            RG: {programa.rg}
          </Typography>
          <Typography variant="body2">
            CPF: {programa.cpf}
          </Typography>
          <Typography variant="body2">
            Data de Nascimento: {programa.dataNascimento}
          </Typography>
          <Typography variant="body2">
            Estado Civil: {programa.estadoCivil}
          </Typography>
          <Button className="bg-indigo-900 m-10" variant="contained" size="small">
            Visualizar
          </Button>
          <ButtonLinkPage onClick={() => onSubmit(data, _id)} href="/programa/editar">Editar</ButtonLinkPage>
        </CardContent>
      </Card>
  );
};
