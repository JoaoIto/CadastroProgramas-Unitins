import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ButtonLinkPage from "@/app/components/ButtonLinkPage/ButtonLinkPage";
import TextField from "@mui/material/TextField";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export function Cabecalho() {
  return (
    <>
      <div className="w-full h-56 bg-gray-100 flex items-center justify-between border-b-8 border-slate-700">
        {/* Cabeçalho */}
        <header className="flex justify-evenly items-center bg-white h-56 w-full">
          <div className="flex items-center space-x-2 w-1/2">
            {/* Ícone de pesquisa */}

            <FormControl className="flex">
              <FormLabel id="demo-radio-buttons-group-label">Filtrar por: </FormLabel>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Nome" />
                <FormControlLabel value="male" control={<Radio />} label="Título" />
              </RadioGroup>
            </FormControl>

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
