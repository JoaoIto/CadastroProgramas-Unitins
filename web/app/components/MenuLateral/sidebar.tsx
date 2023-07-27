import React from "react";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UnitinsLogo from "../../../public/logoUnitins.png";
import ButtonLinkPage from "../ButtonLinkPage/ButtonLinkPage";

export const Sidebar = () => {
  return (
      <aside className="w-full bg-blue-900 text-white flex flex-col items-center">
        {/* Logo */}
        <Image src={UnitinsLogo} alt="Unitins Logo" className="h-56 w-full" />
        {/* Conteúdo da barra lateral */}
        <div className="w-full h-2 bg-gray-950"></div>
        <ul className="flex flex-col mt-8 flex-1">
          <li className="flex items-center space-x-2 p-2">
            <ButtonLinkPage href="/dashboard">
              <HomeIcon /> Inicial
            </ButtonLinkPage>
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
            <ButtonLinkPage href="/perfil">
              <AccountCircleIcon /> Perfil
            </ButtonLinkPage>
          </li>
          {/* O restante do conteúdo da barra lateral aqui */}
        </ul>
      </aside>
  );
};
