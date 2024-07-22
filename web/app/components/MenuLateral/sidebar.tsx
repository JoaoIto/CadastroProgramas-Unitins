import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from '@mui/icons-material/Send';
import { Button, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { useUserPayload } from "@/app/hooks/user/userPayload";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const router = useRouter();
  const { profile, isLoading } = useUserPayload();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isAdmin = profile.perfil === "admin";

  const routerProgramas = () => {
    router.push('/programa/listar')
  };

  const routerDashboard = () => {
    router.push('/')
  };

  return (
    <div>
      <aside className="sticky top-20 left-0 h-[250px] bg-azulEscuro py-12 px-6 rounded-e-3xl shadow-lg shadow-cinzaTraco w-64">
        <nav aria-labelledby="menu-sidebar">
          <List
            sx={{ width: '100%', maxWidth: 360 }}
            className="bg-azulEscuro text-[#D0D0D0] min-w-1/4"
            component="nav"
            subheader={
              <ListSubheader
                component="div"
                id="menu-sidebar"
                className="bg-azulEscuro text-white"
              >
                Menu Lateral
              </ListSubheader>
            }
          >
            <ListItemButton onClick={routerDashboard}>
              <ListItemIcon>
                <HomeIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Inicial" />
            </ListItemButton>
            <ListItemButton onClick={routerProgramas}>
              <ListItemIcon>
                <SendIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Programas" />
            </ListItemButton>
          </List>
        </nav>
      </aside>
    </div>
  );
}
