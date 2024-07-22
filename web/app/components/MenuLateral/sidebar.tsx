import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from '@mui/icons-material/Send';
import { Button, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { useUserPayload } from "@/app/hooks/user/userPayload";
import { useRouter } from "next/navigation";
import AlertMessage from "../AlertMessage";

export function Sidebar() {
  const router = useRouter();
  const { profile, isLoading } = useUserPayload();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isAdmin = profile.perfil === "admin";

  const routerProgramas = () => {
    setAlertMessage("Redirecionando para seus programas enviados...");
    setAlertSeverity("success");
    setAlertOpen(true);
    setTimeout(() => {
      router.push('/programa/listar');
      setTimeout(() => {
      window.location.reload(); 
      }, 500)// Recarrega a página após o redirecionamento
    }, 2000);
  };

  const routerDashboard = () => {
    setAlertMessage("Redirecionando para a página inicial...");
    setAlertSeverity("success");
    setAlertOpen(true);
    setTimeout(() => {
      router.push('/');
      setTimeout(() => {
      window.location.reload(); 
      }, 500)// Recarrega a página após o redirecionamento
    }, 2000);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      <aside className="sticky top-20 left-0 h-[500px] bg-azulEscuro py-12 px-6 rounded-e-3xl shadow-lg shadow-cinzaTraco w-64">
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
              <ListItemText className="italic" primary="Inicial" />
            </ListItemButton>
            <ListItemButton onClick={routerProgramas}>
              <ListItemIcon>
                <SendIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText className="italic" primary="Programas" />
            </ListItemButton>
          </List>
        </nav>
      </aside>

      {/* AlertMessage component */}
      <AlertMessage open={alertOpen} message={alertMessage} severity={alertSeverity} onClose={handleAlertClose} />
    </div>
  );
}

export default Sidebar;
