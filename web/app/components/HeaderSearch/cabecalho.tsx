import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import UnitinsLogo from "@/public/logoUnitins.png";
import Image from "next/image";
import React from "react";
import { Button } from "@mui/material";

export function Search() {
    return (
        <>
            <div className="w-full h-56 bg-gray-100 flex items-center justify-evenly ">
                {/* Cabeçalho */}
                <header className={`flex justify-start sm:justify-center sm:border-b-4 sm:border-cinzaTraco items-center bg-white h-56 w-full shadow-cinzaTraco shadow-lg`}>
                    <Image src={UnitinsLogo} alt="Unitins Logo" className="sm:hidden border-r-4 border-b-4 border-cinzaTraco h-56 w-52 mr-10"/>
                            <TextField
                                type="text"
                                placeholder="Pesquisar pelo titulo: "
                                className="border border-gray-300 px-6 py-4 rounded-lg focus:outline-none text-lg h-20 w-2/4"
                                InputProps={{
                                    startAdornment: <SearchIcon className="h-6 w-6 m-2" />,
                                }}
                            />
                            <Button variant="contained" className={`h-12 bg-azulEscuroGradient text-white`}>Pesquisar</Button>

                </header>
                {/* Conteúdo principal */}
            </div>
        </>
    );
}
