import React from "react";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UnitinsLogo from "../../../public/logoUnitins.png";
import ButtonLinkPage from "../ButtonLinkPage/ButtonLinkPage";
import { Button } from "@mui/material";

export function Sidebar(){

    return (
        <aside
            className={`bg-azulEscuro text-white flex flex-col items-center flex-shrink-0`}>
            <ul className="flex flex-col items-center gap-10 mt-8 flex-1">
                <li className="flex items-center space-x-2">
                    <Button variant="text" className="text-white" href="/">
                        <HomeIcon className="h-10 w-10" />
                        <h3 className="sm:hidden font-medium text-lg p-4">Inicial</h3>
                    </Button>
                </li>
                <li className="flex items-center space-x-2">
                    <Button variant="text" className="text-white" href="/programa/listar">
                        <ListIcon className="h-10 w-10" />
                        <h3 className="sm:hidden font-medium text-lg p-4">Programas</h3>
                    </Button>
                </li>
                <li className="flex items-center space-x-2">
                    <Button variant="text" className="text-white" href="/perfil">
                        <AccountCircleIcon className="h-10 w-10" />
                        <h3 className="sm:hidden font-medium text-lg p-4">Perfil</h3>
                    </Button>
                </li>
            </ul>
        </aside>
    );
};
