"use client";
import React, { useEffect, useState } from "react";
import { CardProgram } from "./components/CardPrograma/Card";
import Title from "./components/Title/title";
import {getStorageItem} from "@/app/functions/getStorageItem/getStorageItem";
import {getProgramasUsuario} from "@/app/service/programa/programaUserLogado";
import Button from "@mui/material/Button";

export default function DashboardPage (){
    const token = getStorageItem();
    const [programas, setProgramas] = useState<IPrograma[]>([]);
    useEffect(() => {
        getProgramasUsuario(token).then(data => setProgramas(data ?? []));
    }, [token]);

    return (
        <div className="flex w-full h-full">
            <div className="flex flex-col">
                <div className="w-full h-full i">
                    <Title>Dashboard</Title>
                    <div className="flex self-end p-4">
                        <Button variant='contained' href={`/programa/cadastrar`}>
                            Nova solicitação +
                        </Button>
                    </div>
                    <main className="flex flex-wrap items-center justify-center">
                        {programas.map((programa) => (
                            <CardProgram
                                key={programa._id}
                                programa={programa}
                            />
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
};
