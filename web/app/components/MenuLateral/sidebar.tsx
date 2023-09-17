import React from "react";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UnitinsLogo from "../../../public/logoUnitins.png";
import ButtonLinkPage from "../ButtonLinkPage/ButtonLinkPage";

export const Sidebar = () => {
    const isSmallScreen = window.innerWidth < 870;

    return (
        <aside style={{ maxWidth: isSmallScreen ? '120px' : 'none' }} // Aplicar largura máxima em uma visualização móvel
            className={`w-[300px] bg-blue-900 text-white flex flex-col items-center border-r-4 border-b-4 border-slate-700`}>
            {/* Logo */}
            {!isSmallScreen && <Image src={UnitinsLogo} alt="Unitins Logo" className="h-56 w-full"/>}
            {/* Conteúdo da barra lateral */}
            <ul className="flex flex-col items-center gap-10 mt-8 flex-1">
                <li className="flex items-center space-x-2 p-2">
                    <ButtonLinkPage href="/dashboard">
                        <HomeIcon className="h-10 w-10" />
                        {!isSmallScreen && <h3 className="font-medium text-lg p-4">Inicial</h3>}
                    </ButtonLinkPage>
                </li>
                <li className="flex items-center space-x-2 p-2">
                    <ButtonLinkPage href="/programa/listar">
                        <AccountCircleIcon className="h-10 w-10" />
                        {!isSmallScreen && <h3 className="font-medium text-lg p-4">Programas</h3>}
                    </ButtonLinkPage>
                </li>
                <li className="flex items-center space-x-2 p-2">
                    <ButtonLinkPage href="/perfil">
                        <AccountCircleIcon className="h-10 w-10" />
                        {!isSmallScreen && <h3 className="font-medium text-lg p-4">Perfil</h3>}
                    </ButtonLinkPage>
                </li>
                {/* O restante do conteúdo da barra lateral aqui */}
            </ul>
        </aside>
    );
};
