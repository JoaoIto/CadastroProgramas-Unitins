"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UnitinsLogo from '../../public/logoUnitins.png';
import {useRouter, useSearchParams} from 'next/navigation';
import { CardProgram } from '../components/CardPrograma/Card';
import Button from '@mui/material/Button';
import ButtonLinkPage from '../components/ButtonLinkPage/ButtonLinkPage';
import ApiUtils from '@/app/Utils/Api/apiMethods';

interface Programa {
  _id: string;
  nomeCompleto: string;
  rg: string;
  cpf: string;
  dataNascimento: string;
  estadoCivil: string;
}

const DashboardPage = () => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const router = useRouter();
  // @ts-ignore
  const { uuid } = useSearchParams();
  const handleDeleteClick = (uuid: string) => {
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = async (uuid: string) => {
    try {
      // Chame a API para deletar o programa com o UUID fornecido
      await ApiUtils.delete(`http://localhost:3333/programa/${uuid}`);
    } catch (error) {
      console.error('Erro ao deletar o programa:', error);
    }
    setShowDeleteAlert(false);
  };


  const [programas, setProgramas] = useState<Programa[]>([]);

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const data = await ApiUtils.get<Programa[]>('http://localhost:3333/programa');
        if (data) {
          setProgramas(data);
        }
      } catch (error) {
        console.error('Erro ao buscar os programas:', error);
      }
    };

    fetchProgramas();
  }, []);

  return (
      <div className="flex h-screen">
        <aside className="w-1/6 bg-blue-900 text-white flex flex-col items-center">
          {/* Logo */}
          <Image src={UnitinsLogo} alt="Unitins Logo" className="h-52 w-full" />
          {/* Conteúdo da barra lateral */}
          <ul className="mt-8">
            <li className="flex items-center space-x-2 p-2">
              <HomeIcon />
              <span className="font-bold text-xl">Inicial</span>
            </li>
            <li className="flex items-center space-x-2 p-2">
              <NotificationsIcon />
              <span className="font-bold text-xl">Notificações</span>
            </li>
            <li className="flex items-center space-x-2 p-2">
              <SettingsIcon />
              <span className="font-bold text-xl">Configurações</span>
            </li>
            <li className="flex items-center space-x-2 p-2">
              <AccountCircleIcon />
              <span className="font-bold text-xl">Perfil</span>
            </li>
          </ul>
        </aside>
        <main className="w-5/6 bg-gray-100">
          {/* Cabeçalho */}
          <header className="p-4 flex justify-evenly items-center bg-white h-52 w-full">
            <div className="flex items-center space-x-2 w-1/2 mx-auto">
              {/* Ícone de pesquisa */}
              <SearchIcon className="h-12 w-12 m-2" />
              <input
                  type="text"
                  placeholder="Pesquisar por programa: "
                  className="border border-gray-300 px-6 py-4 rounded-lg focus:outline-none text-lg h-20 w-full"
              />
            </div>
            {/* Ícone de perfil */}
            <AccountCircleIcon className="h-12 w-12 m-2" />
            <span className="font-bold">Perfil</span>
          </header>
          {/* Conteúdo principal */}
          <ButtonLinkPage uuid={uuid} href="/programa/cadastrar">Nova solicitação +</ButtonLinkPage>
          {showDeleteAlert && (
              <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded">
                  <p>Tem certeza que deseja deletar?</p>
                  <div className="flex justify-end mt-4">
                    <Button
                        className="bg-red-900 mr-2"
                        variant="contained"
                        color="primary"
                        onClick={() => handleConfirmDelete(uuid)}
                    >
                      Confirmar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShowDeleteAlert(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
          )}

          <div className="flex flex-wrap">
            {programas.map((programa) => (
                <CardProgram key={programa._id} programa={programa} />
            ))}
          </div>
        </main>
      </div>
  );
};

export default DashboardPage;
