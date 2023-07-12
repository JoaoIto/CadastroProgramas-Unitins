"use client";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UnitinsLogo from "../../public/logoUnitins.png";
import { CardProgram } from "../components/CardPrograma/Card";
import ButtonLinkPage from "../components/ButtonLinkPage/ButtonLinkPage"

interface Programa {
  _id: string;
  nomeCompleto: string;
  rg: string;
  cpf: string;
  dataNascimento: string;
  estadoCivil: string;
}
const DashboardPage = () => {

  const [programas, setProgramas] = useState<Programa[]>([]);

  useEffect(() => {
    // Função assíncrona para buscar os programas do banco de dados
    const fetchProgramas = async () => {
      try {
        const response = await fetch('http://localhost:3333/programa/listar');
        if (response.ok) {
          const data = await response.json();
          setProgramas(data);
        } else {
          console.log('Erro ao buscar os programas:', response.status);
        }
      } catch (error) {
        console.error('Erro ao buscar os programas:', error);
      }
    };

    fetchProgramas();
  }, []); // O array vazio [] como segundo argumento faz com que o efeito só seja executado uma vez, no momento em que o componente é montado

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
          <SearchIcon className="h-12 w-12 m-2"/>
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

        <ButtonLinkPage href="/novaSolicitacao">Nova solicitação +</ButtonLinkPage>

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
