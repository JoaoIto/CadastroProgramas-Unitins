import React from "react";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UnitinsLogo from "../../../public/logoUnitins.png";
import ButtonLinkPage from "../ButtonLinkPage/ButtonLinkPage";

export function Sidebar(){

    return (
        <aside
            className={`w-[300px] h-full bg-azulEscuro text-white flex flex-col items-center shadow-2xl shadow-black`}>
            {/* Logo */}
            {/* Conteúdo da barra lateral */}
            <ul className="flex flex-col items-center gap-10 mt-8 flex-1">
                <li className="flex items-center space-x-2">
                    <ButtonLinkPage href="/">
                        <HomeIcon className="h-10 w-10" />
                        <h3 className="sm:hidden font-medium text-lg p-4">Inicial</h3>
                    </ButtonLinkPage>
                </li>
                <li className="flex items-center space-x-2">
                    <ButtonLinkPage href="/programa/listar">
                        <ListIcon className="h-10 w-10" />
                        <h3 className="sm:hidden font-medium text-lg p-4">Programas</h3>
                    </ButtonLinkPage>
                </li>
                <li className="flex items-center space-x-2">
                    <ButtonLinkPage href="/perfil">
                        <AccountCircleIcon className="h-10 w-10" />
                        <h3 className="sm:hidden font-medium text-lg p-4">Perfil</h3>
                    </ButtonLinkPage>
                </li>
            </ul>
        </aside>
    );
};
