import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ApiUtils from "@/app/Utils/Api/apiMethods";
import { getStorageItem } from "@/app/functions/storage/getStorageItem/getStorageItem";
import { setProgramaItem } from "@/app/functions/storage/setProgramaSearch";
import { tokenService } from "@/app/Utils/Cookies/tokenStorage";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUserPayload } from "@/app/hooks/user/userPayload";

export function Search() {
  const token = getStorageItem();
  const { profile, isLoading } = useUserPayload();
  const isAdmin = profile.perfil === "admin";
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResults, setSearchResults] = useState<IPrograma[]>([]);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await ApiUtils.get<IPrograma[]>(
        `/programa/porUsuario/${searchTitle}`,
        token
      );
      if (response) {
        setSearchResults(response);
        setProgramaItem("programaSearch", JSON.stringify(response)); // Armazena os resultados da pesquisa no sessionStorage
        console.log("Resultados da pesquisa:", response);
        window.location.reload(); // Recarrega a página após a pesquisa
      } else {
        setSearchResults([]);
        console.log("Nenhum resultado encontrado.");
      }
    } catch (error) {
      console.error("Erro ao realizar a pesquisa:", error);
      setSearchResults([]);
    }
  };

  const handleClearSearch = () => {
    sessionStorage.removeItem("programaSearch"); // Remove a pesquisa do sessionStorage
    setSearchResults([]); // Limpa os resultados da pesquisa
    window.location.reload(); // Recarrega a página após a pesquisa
  };

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

  return (
    <>
      <div className="flex w-full justify-around px-2 py-6">
        <h1
          style={{ textShadow: "2px 2px 2px rgb(211, 211, 211)" }}
          className="text-azulEscuroGradient font-semibold text-5xl p-2 w-1/2"
        >
          Software Hub
        </h1>
        <li className="flex items-center justify-end">
          <IconButton onClick={handleOpenLogoutModal} color="primary">
            <ExitToAppIcon />
          </IconButton>
          <Button
            variant="contained"
            className="text-white"
            href={`${isAdmin ? "/admin/perfil" : "/perfil"}`}
          >
            <AccountCircleIcon />
            <h3 className="sm:hidden font-light text-lg">Perfil</h3>
          </Button>
        </li>
      </div>
        {/* Cabeçalho */}
        <header className="flex justify-evenly sm:justify-center sm:border-b-4 sm:border-cinzaTraco items-center bg-white h-full w-full shadow-cinzaTraco shadow-lg">
          <div className="flex flex-col h-full w-1/2">
            <label htmlFor="pesquisar">Deseja pesquisar por um título?</label>
            <TextField
              type="text"
              placeholder="Digite o titulo: "
              className="border border-gray-300 px-6 py-4 rounded-lg focus:outline-none text-lg min-h-20 w-full"
              InputProps={{
                startAdornment: <SearchIcon className="h-6 w-6 m-2" />,
              }}
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              id="pesquisar"
            />
          </div>
          <div className="h-full flex gap-2 sm:flex-col">
            <Button
              variant="contained"
              className="md:h-12 sm:h-6 sm:w-6 bg-azulEscuroGradient text-white flex items-center justify-center"
              onClick={handleSearch}
            >
              <span className="sm:hidden">Pesquisar</span>
              <SearchIcon className="lg:hidden md:hidden" />
            </Button>
            <Button
              variant="outlined"
              className="md:h-12 sm:h-6 sm:w-6 flex items-center justify-center"
              onClick={handleClearSearch}
            >
              <span className="sm:hidden">Limpar</span>
              <RestartAltIcon className="lg:hidden md:hidden" />
            </Button>
          </div>
        </header>

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
    </>
  );
}

export default Search;
