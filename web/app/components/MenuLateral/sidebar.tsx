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
      <aside className="min-w-[300px] w-full bg-blue-900 text-white flex flex-col items-center border-r-8 border-b-8 border-slate-700">
        {/* Logo */}
        <Image src={UnitinsLogo} alt="Unitins Logo" className="h-56 w-full" />
        {/* Conteúdo da barra lateral */}
        <ul className="flex flex-col items-center gap-10 mt-8 flex-1">
          <li className="flex items-center space-x-2 p-2">
            <ButtonLinkPage href="/dashboard">
              <HomeIcon className="h-10 w-10" />
                <h3 className="font-bold text-lg p-4">Inicial</h3>
            </ButtonLinkPage>
          </li>
            <li className="flex items-center space-x-2 p-2">
                <ButtonLinkPage href="/programa/listar">
                    <AccountCircleIcon className="h-10 w-10" /> <h3 className="font-bold text-lg p-4">Programas</h3>
                </ButtonLinkPage>
            </li>
          <li className="flex items-center space-x-2 p-2">
            <ButtonLinkPage href="/perfil">
                <AccountCircleIcon className="h-10 w-10" /> <h3 className="font-bold text-lg p-4">Perfil</h3>
            </ButtonLinkPage>
          </li>
          {/* O restante do conteúdo da barra lateral aqui */}
        </ul>
      </aside>
  );
};
