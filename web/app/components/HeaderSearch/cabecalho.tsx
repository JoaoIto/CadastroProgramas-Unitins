import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@mui/material";
import UnitinsLogo from "@/public/logoUnitins.png";
import ApiUtils from "@/app/Utils/Api/apiMethods";
import { getStorageItem } from "@/app/functions/storage/getStorageItem/getStorageItem";
import { setProgramaItem } from "@/app/functions/storage/setProgramaSearch";

export function Search() {
  const token = getStorageItem();
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResults, setSearchResults] = useState<IPrograma[]>([]);

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
    window.location.reload();// Recarrega a página após a pesquisa
  };

  return (
    <>
      <div className="w-full h-56 bg-gray-100 flex items-center justify-evenly ">
        {/* Cabeçalho */}
        <header className="flex justify-start sm:justify-center sm:border-b-4 sm:border-cinzaTraco items-center bg-white h-56 w-full shadow-cinzaTraco shadow-lg">
          <Image
            src={UnitinsLogo}
            alt="Unitins Logo"
            className="sm:hidden border-r-4 border-b-4 border-cinzaTraco h-56 w-52 mr-10"
          />
          <TextField
            type="text"
            placeholder="Pesquisar pelo titulo: "
            className="border border-gray-300 px-6 py-4 rounded-lg focus:outline-none text-lg h-20 w-2/4"
            InputProps={{
              startAdornment: <SearchIcon className="h-6 w-6 m-2" />,
            }}
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <div className="flex gap-2">
            <Button
              variant="contained"
              className="h-12 bg-azulEscuroGradient text-white"
              onClick={handleSearch}
            >
              Pesquisar
            </Button>
            {/* Botão para limpar a pesquisa */}
            <Button
              variant="outlined"
              className="h-12"
              onClick={handleClearSearch}
            >
              Limpar pesquisa
            </Button>
          </div>
        </header>
      </div>
    </>
  );
}
