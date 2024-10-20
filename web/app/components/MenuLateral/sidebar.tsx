import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from '@mui/icons-material/Send';
import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { useUserPayload } from "@/app/hooks/user/userPayload";
import { useRouter } from "next/navigation";
import AlertMessage from "../AlertMessage";
import AssignmentIcon from '@mui/icons-material/AssignmentLate';
import BuildIcon from '@mui/icons-material/Build';

export function Sidebar() {
  const router = useRouter();
  const { profile, isLoading } = useUserPayload();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isAdmin = profile?.perfil === "admin";

  const routerProgramas = () => {
    const message = isAdmin ? "Redirecionando para programas pendentes..." : "Redirecionando para seus programas enviados...";
    setAlertMessage(message);
    setAlertSeverity("success");
    setAlertOpen(true);
    setTimeout(() => {
      if (isAdmin) {
        router.push('/admin/programa/enviados');
      } else {
        router.push('/programa/listar');
      }
    }, 2000);
  };

  const routerProgramasEmAcompanhamento = () => {
    const message = isAdmin ? "Redirecionando para programas em acompanhamento..." : "Redirecionando para seus programas em análise...";
    setAlertMessage(message);
    setAlertSeverity("success");
    setAlertOpen(true);
    setTimeout(() => {
      router.push('/admin/programa/em-analise');
    }, 2000);
  };

  const routerProgramasEmAjustes = () => {
    const message = "Redirecionando para programas em ajustes pelo usuário...";
    setAlertMessage(message);
    setAlertSeverity("success");
    setAlertOpen(true);
    setTimeout(() => {
      router.push('/admin/programa/em-ajustes');
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
      }, 500); // Recarrega a página após o redirecionamento
    }, 2000);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      <aside className="sticky top-20 left-0 h-[500px] bg-azulEscuro py-12 px-6 rounded-e-3xl shadow-lg shadow-cinzaTraco w-64 sm:w-32">
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
              <ListItemText className="hidden md:block lg:block" primary="Inicial" />
            </ListItemButton>
            <ListItemButton onClick={routerProgramas}>
              <ListItemIcon>
                <SendIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText className="hidden md:block lg:block" primary={isAdmin ? "Pendentes" : "Enviados"} />
            </ListItemButton>
            {isAdmin && (
              <ListItemButton onClick={routerProgramasEmAcompanhamento}>
                <ListItemIcon>
                  <AssignmentIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText className="hidden md:block lg:block" primary="Em Acompanhamento" />
              </ListItemButton>
            )}
            {isAdmin && (
              <ListItemButton onClick={routerProgramasEmAjustes}>
                <ListItemIcon>
                  <BuildIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText className="hidden md:block lg:block" primary="Em Ajustes" />
              </ListItemButton>
            )}
          </List>
        </nav>
      </aside>

      {/* AlertMessage component */}
      <AlertMessage open={alertOpen} message={alertMessage} severity={alertSeverity} onClose={handleAlertClose} />
    </div>
  );
};

export default Sidebar;
