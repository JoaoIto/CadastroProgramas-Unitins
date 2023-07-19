import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonLinkPage from '@/app/components/ButtonLinkPage/ButtonLinkPage';
import ApiUtils from '@/app/Utils/Api/apiMethods';
import Perfil from "@/app/perfil/page";

interface CardProgramProps {
  programa: Programa;
  userId: string;
  isOwner: boolean; // Adicionando o atributo isOwner para verificar se o usuário é dono do card ou administrador
}

interface Programa {
  _id: string;
  nomeCompleto: string;
  rg: string;
  cpf: string;
  dataNascimento: string;
  estadoCivil: string;
  alunosId: string[];
}

export const CardProgram: React.FC<CardProgramProps> = ({ programa, userId }) => {
  const [perfil, setPerfil] = useState<string>('');
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const handleConfirmDelete = async (uuid: string) => {
    try {
      // Chame a API para deletar o programa com o UUID fornecido
      await ApiUtils.delete(`http://localhost:3333/programa/${uuid}`);
      const updatedData = await ApiUtils.getByUuid<Perfil>(`http://localhost:3333/programa`, uuid);
      if (!updatedData) {
        window.open('/dashboard', '_self');
      }
    } catch (error) {
      console.error('Erro ao deletar o programa:', error);
    }
  };

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const perfilData = await ApiUtils.getByUuid<Perfil>(`http://localhost:3333/usuario`, userId);

        if (perfilData) {
          setPerfil(perfilData.perfil);

          // Verifica se o perfil é "administrador" ou se o usuário é o dono do programa
          setIsOwner(
              perfilData.perfil === 'administrador' || programa.alunosId === userId
          );
        }
      } catch (error) {
        console.error('Erro ao obter o perfil:', error);
      }
    };

    fetchPerfil();
  }, [userId, programa.alunosId]);

  return (
      <Card className="w-2/5 m-8">
        <CardContent className="p-4">
          <Typography variant="h5" component="div">
            {programa.nomeCompleto}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            RG: {programa.rg}
          </Typography>
          <Typography variant="body2">CPF: {programa.cpf}</Typography>
          <Typography variant="body2">
            Data de Nascimento: {programa.dataNascimento}
          </Typography>
          <Typography variant="body2">Estado Civil: {programa.estadoCivil}</Typography>
          <div className="flex gap-2">
            <Button className="bg-indigo-900 m-10" variant="contained" size="small">
              Visualizar
            </Button>
            {isOwner && (
                <>
                  <ButtonLinkPage href="/programa/editar" uuid={programa._id}>
                    Editar
                  </ButtonLinkPage>
                  <ButtonLinkPage onClick={() => handleConfirmDelete(programa._id)} uuid={programa._id}>
                    Deletar
                  </ButtonLinkPage>
                </>
            )}
          </div>
        </CardContent>
      </Card>
  );
};
