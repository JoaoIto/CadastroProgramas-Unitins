import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonLinkPage from "@/app/components/ButtonLinkPage/ButtonLinkPage";
import {useRouter, useSearchParams} from "next/navigation";
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
  const router = useRouter();
  const [programas, setProgramas] = useState<Programa[]>([]);

  const {get} = useSearchParams();
  const uuid = programa._id || '';
  const id = get('id');

  const handleConfirmDelete = async (uuid: string) => {
    try {
      // Chame a API para deletar o programa com o UUID fornecido
      await ApiUtils.delete(`http://localhost:3333/programa/${uuid}`);
      const updatedData = await ApiUtils.getByUuid(`http://localhost:3333/programa`, uuid);
      if (!updatedData) {
        window.open('/dashboard', '_self');
      }
    } catch (error) {
      console.error('Erro ao deletar o programa:', error);
    }
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
          <div className="flex gap-2">
          <Button className="bg-indigo-900 m-10" variant="contained" size="small">
            Visualizar
          </Button>
          <ButtonLinkPage href="/programa/editar" uuid={programa._id} id={id}>Editar</ButtonLinkPage>
          <ButtonLinkPage onClick={() => handleConfirmDelete(uuid)} uuid={programa._id}>Deletar</ButtonLinkPage>
          </div>
          </CardContent>
      </Card>
  );
};
