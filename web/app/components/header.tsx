import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUserPayload } from "@/app/hooks/user/userPayload";
import { useRouter } from "next/navigation";
import AlertMessage from "./AlertMessage"; // Import the AlertMessage component
import { getStorageItem } from "../functions/storage/getStorageItem/getStorageItem";
import { tokenService } from "../Utils/Cookies/tokenStorage";
import Image from 'next/image'

export function Header() {
  const token = getStorageItem();
  const router = useRouter();
  const { profile, isLoading } = useUserPayload();
  const isAdmin = profile.perfil === "admin";
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleLogout = () => {
    tokenService.delete(); // Remove o token
    setTimeout(() => {
      window.location.reload(); // Recarrega a página após 1 segundo
    }, 1000);
  };

  const handleOpenLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const routerDashboard = () => {
    setAlertMessage("Redirecionando para a página inicial...");
    setAlertSeverity("success");
    setAlertOpen(true);
    setTimeout(() => {
      router.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 500); // Recarrega a página após o redirecionamento
    }, 2000);
  };

  const handleProfileRedirect = () => {
    setAlertMessage("Redirecionando para a página de perfil...");
    setAlertSeverity("success");
    setAlertOpen(true);
    setTimeout(() => {
      router.push(`${isAdmin ? "/admin/perfil" : "/perfil"}`);
    }, 2000); // Redireciona após 2 segundos
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <div className="flex w-full justify-around px-2 py-6 h-[120px] shadow-lg shadow-cinzaTraco">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
      <Image
    className="sm:w-[300px] sm:h-[50px]"
    src="/logo/softwareHub.png" // Utilize o arquivo responsivo que você carregou
    alt="Logo Software Hub"
    width={500} // Tamanho para telas maiores
    height={80} // Altura padrão para telas maiores
    style={{ 
      cursor: 'pointer', 
      maxWidth: '100%', // Faz com que a imagem se ajuste ao tamanho do container
      height: 'auto' // Mantém a proporção da imagem
    }}
    onClick={routerDashboard} // Mantém o comportamento de redirecionamento ao clicar
  />
</div>
        <li className="flex items-center">
          <IconButton onClick={handleOpenLogoutModal} color="primary">
            <ExitToAppIcon />
          </IconButton>
          <Button
            variant="contained"
            className="bg-azulEscuro"
            onClick={handleProfileRedirect}
          >
            <AccountCircleIcon />
            <h3 className="sm:hidden font-light text-lg">Perfil</h3>
          </Button>
        </li>
      </div>

      {/* Modal de confirmação de logout */}
      <Dialog open={logoutModalOpen} onClose={handleCloseLogoutModal}>
        <DialogTitle>Confirmar Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você tem certeza que deseja sair?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Sair
          </Button>
        </DialogActions>
      </Dialog>

      {/* AlertMessage component */}
      <AlertMessage
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        onClose={handleAlertClose}
      />
    </>
  );
}

export default Header;
