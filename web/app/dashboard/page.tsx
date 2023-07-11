"use client";
import React from "react";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UnitinsLogo from "../../public/logoUnitins.png";
import { CardProgram } from "../components/CardPrograma/Card";
import ButtonLinkPage from "../components/ButtonLinkPage/ButtonLinkPage"

const DashboardPage: React.FC = () => {
  // Dados dos cards
  const cardsData = [
    {
      title: 'Título do Card 1',
      description: 'Descrição do Card 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '01/01/2022',
    },
    {
      title: 'Título do Card 2',
      description: 'Descrição do Card 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '02/01/2022',
    },
    // Adicione mais dados dos cards aqui...
  ];
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
          <CardProgram/>
          <CardProgram/>
          <CardProgram/>
          <CardProgram/>
          <CardProgram/>
          <CardProgram/>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
