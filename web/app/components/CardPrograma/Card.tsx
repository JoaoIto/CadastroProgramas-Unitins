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
  userId: string;
  isOwner: boolean;
  hasPermission?: boolean;
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

export const CardProgram: React.FC<CardProgramProps> = ({ programa, userId, isOwner, hasPermission }) => {
  const [perfil, setPerfil] = useState<string>('');

  const handleConfirmDelete = async (uuid: string) => {
    try {
      window.alert("O programa selecionado será deletado!")
      await ApiUtils.delete(`http://localhost:3333/programa/${uuid}`);
      const updatedData = await ApiUtils.getByUuid<Perfil>(`http://localhost:3333/programa`, uuid);
      if (!updatedData) {
        window.open('/dashboard', '_self');
      }
    } catch (error) {
      console.error('Erro ao deletar o programa:', error);
    }
  };

  const handleCancel = async (uuid: string, data: Programa) => {
    try {
      if (uuid) {
        data.status = ProgramaStatus.CANCELADO;
        await ApiUtils.put(`http://localhost:3333/programa/${uuid}`, data);
        window.open('/dashboard', '_self');
      } else {
        console.error('UUID não encontrado');
      }
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
    }
  };

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const perfilData = await ApiUtils.getByUuid<Perfil>(`http://localhost:3333/usuario`, userId);

        if (perfilData) {
          setPerfil(perfilData.perfil);
        }
      } catch (error) {
        console.error('Erro ao obter o perfil:', error);
      }
    };

    fetchPerfil();
  }, [userId]);

  return (
      <Card className="w-2/5 m-8 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl">
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
          <Typography variant="body2">Status: {programa.status}</Typography>
          <div className="flex gap-2">
            <Button className="bg-indigo-900 m-10" variant="contained" size="small">
              Visualizar
            </Button>
            {hasPermission && hasPermission && programa.status === 'RASCUNHO' && (
                <div>
                  <ButtonLinkPage href="/programa/editar" uuid={programa._id}>Editar</ButtonLinkPage>
                  <button className="text-white bg-red-800 p-2 rounded font-Inter"
                          color="primary"
                          onClick={() => handleConfirmDelete(programa._id)}>
                    Deletar
                  </button>
                </div>
            )}

            {hasPermission && hasPermission && programa.status === 'ENVIADO' && (
                <div>
                  <button onClick={() => handleCancel}>Cancelar</button>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
  );
};
