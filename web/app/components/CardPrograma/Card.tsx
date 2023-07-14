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

  const searchParams = useSearchParams();
  const uuid = searchParams.get('uuid') || '';

  const handleConfirmDelete = async (uuid: string) => {
    try {
      // Chame a API para deletar o programa com o UUID fornecido
      await ApiUtils.delete(`http://localhost:3333/programa/${uuid}`);
      console.log("UUID de programa deletado!")
      // Atualize a lista de programas removendo o programa deletado
      setProgramas(programas.filter((programa) => programa._id !== uuid));
      router.push('/dashboard');
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
          <Button className="bg-indigo-900 m-10" variant="contained" size="small">
            Visualizar
          </Button>
          <ButtonLinkPage href="/programa/editar" uuid={programa._id}>Editar</ButtonLinkPage>
          <ButtonLinkPage onClick={() => handleConfirmDelete(uuid)} uuid={programa._id} href="/dashboard">Deletar</ButtonLinkPage>
        </CardContent>
      </Card>
  );
};
