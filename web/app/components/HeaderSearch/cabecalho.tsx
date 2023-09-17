import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ButtonLinkPage from "@/app/components/ButtonLinkPage/ButtonLinkPage";
import TextField from "@mui/material/TextField";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const isSmallScreen = window.innerWidth < 870;

export function Cabecalho() {
    return (
        <>
            <div className="w-full h-56 bg-gray-100 flex items-center justify-between border-b-8 border-slate-700">
                {/* Cabeçalho */}
                <header className={`flex justify-between items-start bg-white h-56 w-full ${isSmallScreen ? 'flex-col' : 'flex'}`}>
                    {isSmallScreen ? (
                        <div  className={`flex h-full items-center justify-center space-x-2 m-4`}>
                            <TextField
                                type="text"
                                placeholder="Pesquisar"
                                className="border border-gray-300 px-6 py-4 rounded-lg focus:outline-none text-lg h-20 w-full"
                                InputProps={{
                                    startAdornment: <SearchIcon className="h-12 w-12 m-2" />,
                                }}
                                style={{ maxWidth: '220px' }}
                            />
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
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2 w-1/2">
                            <TextField
                                type="text"
                                placeholder="Pesquisar"
                                className="border border-gray-300 px-6 py-4 rounded-lg focus:outline-none text-lg h-20 w-full"
                                InputProps={{
                                    startAdornment: <SearchIcon className="h-12 w-12 m-2" />,
                                }}
                                style={{ maxWidth: '220px' }}
                            />
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
                        </div>
                    )}

                    {!isSmallScreen && (
                        <div className="font-bold text-3xl">
                            <ButtonLinkPage href="/perfil">
                                <AccountCircleIcon className="h-10 w-10" /> Perfil
                            </ButtonLinkPage>
                        </div>
                    )}
                </header>
                {/* Conteúdo principal */}
            </div>
        </>
    );
}
