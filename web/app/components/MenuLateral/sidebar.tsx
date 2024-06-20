import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { Button } from "@mui/material";
import { useUserPayload } from "@/app/hooks/user/userPayload";

export function Sidebar() {
  const { profile, isLoading } = useUserPayload();

  if (isLoading) {
    return <div>Loading...</div>; // Você pode substituir isso por um spinner ou qualquer outro indicador de carregamento
  }

  const isAdmin = profile.perfil === "admin";
  return (
    <div>
      <aside
        className={`h-full bg-azulEscuro text-white flex flex-col items-center flex-shrink-0 shadow-cinzaTraco shadow-lg`}
      >
        <ul className="flex flex-col items-center gap-10 mt-8 flex-1">
          <li className="flex items-center space-x-2">
            <Button variant="text" className="text-white" href="/">
              <HomeIcon className="h-10 w-10" />
              <h3 className="sm:hidden font-light text-lg p-4">Inicial</h3>
            </Button>
          </li>
          <li className="flex items-center space-x-2">
            <Button
              variant="text"
              className="text-white"
              href={`${isAdmin ? "/admin/programa/enviados" : "/programa/listar"}`}
            >
              <ListIcon className="h-10 w-10" />
              <h3 className="sm:hidden font-light text-lg p-4">
                {" "}
                {isAdmin ? "Enviados" : "Programas"}
              </h3>
            </Button>
          </li>
          {isAdmin && (
            <li className="flex items-center space-x-2">
              <Button
                variant="text"
                className="text-white"
                href="/admin/programa/em-analise"
              >
                <AnalyticsIcon className="h-10 w-10" />
                <h3 className="sm:hidden font-light text-lg p-4">Em Análise</h3>
              </Button>
            </li>
          )}
          <li className="flex items-center space-x-2">
            <Button variant="text" className="text-white" href={`${isAdmin ? "/admin/perfil" : "/perfil"}`}>
              <AccountCircleIcon className="h-10 w-10" />
              <h3 className="sm:hidden font-light text-lg p-4">Perfil</h3>
            </Button>
          </li>
        </ul>
      </aside>
    </div>
  );
}
