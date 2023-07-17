
import React from "react";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UnitinsLogo from "../../../public/logoUnitins.png";

export const Sidebar = () => {
    return(
        <aside className="w-1/6 h-screen bg-blue-900 text-white flex flex-col items-center">
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
    )
}