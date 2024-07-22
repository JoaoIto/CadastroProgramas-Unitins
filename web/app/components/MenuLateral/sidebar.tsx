import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from '@mui/icons-material/Send';
import { Button } from "@mui/material";
import { useUserPayload } from "@/app/hooks/user/userPayload";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const router = useRouter();
  const { profile, isLoading } = useUserPayload();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>; // Você pode substituir isso por um spinner ou qualquer outro indicador de carregamento
  }

  const isAdmin = profile.perfil === "admin";

  const routerProgramas = () => {
    router.push('/')
  };

  const routerDashboard = () => {
    router.push('/')
  };

  return (
    <div>
      <aside className="sticky top-0 left-0 h-[250px] bg-azulEscuro py-12 px-6 rounded-e-3xl shadow-lg shadow-cinzaTraco w-64">
        <nav className="text-white">
          <ul className="flex flex-col gap-4">
            <li>
              <Button onClick={routerDashboard} className="flex items-center space-x-2 text-white">
                <HomeIcon />
                <span className="text-md">Inicial</span>
              </Button>
            </li>
            <li>
              <Button onClick={routerProgramas} className="flex items-center space-x-2 text-white">
                <SendIcon />
                <span className="text-md">Programas</span>
              </Button>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
