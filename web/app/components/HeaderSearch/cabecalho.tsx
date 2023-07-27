import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ButtonLinkPage from "@/app/components/ButtonLinkPage/ButtonLinkPage";
import TextField from "@mui/material/TextField";

export function Cabecalho() {
  return (
    <>
      <div className="w-full h-56 bg-gray-100 flex items-center justify-between">
        {/* Cabeçalho */}
        <header className="p-4 flex justify-evenly items-center bg-white h-56 w-full">
          <div className="flex items-center space-x-2 w-1/2 mx-auto">
            {/* Ícone de pesquisa */}
            <TextField
              type="text"
              placeholder="Pesquisar por programa: "
              className="border border-gray-300 px-6 py-4 rounded-lg focus:outline-none text-lg h-20 w-full"
              InputProps={{
                startAdornment: <SearchIcon className="h-12 w-12 m-2" />,
              }}
            />
          </div>
          {/* Ícone de perfil */}
          <span className="font-bold text-3xl">
            <ButtonLinkPage href="/perfil">
              <AccountCircleIcon className="h-10 w-10" /> Perfil
            </ButtonLinkPage>
          </span>
        </header>
        {/* Conteúdo principal */}
      </div>
    </>
  );
}
