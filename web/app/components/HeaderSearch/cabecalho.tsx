
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ButtonLinkPage from "@/app/components/ButtonLinkPage/ButtonLinkPage";
export const Cabecalho = () => {
    return (
        <>
        <main className="w-5/6 bg-gray-100">
      {/* Cabeçalho */}
      <header className="p-4 flex justify-evenly items-center bg-white h-52 w-full">
        <div className="flex items-center space-x-2 w-1/2 mx-auto">
          {/* Ícone de pesquisa */}
          <SearchIcon className="h-12 w-12 m-2"/>
          <input
            type="text"
            placeholder="Pesquisar por programa: "
            className="border border-gray-300 px-6 py-4 rounded-lg focus:outline-none text-lg h-20 w-full"
          />
        </div>
        {/* Ícone de perfil */}
        <AccountCircleIcon className="h-12 w-12 m-2" />

        <span className="font-bold text-2xl"><ButtonLinkPage href="/perfil">Perfil</ButtonLinkPage></span>
      </header>
      {/* Conteúdo principal */}
    </main>
        </>
    )
}