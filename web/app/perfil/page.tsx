"use client"
import React, { useEffect, useState } from "react";
import ApiUtils from "@/app/Utils/Api/apiMethods";
import Title from "@/app/components/Title/title";
import {getStorageItem} from "@/app/functions/getStorageItem/getStorageItem";
import {getProgramasUsuario} from "@/app/service/programa/programaUserLogado";
import {fetchPerfil} from "@/app/service/perfil/logUser";

function Perfil() {
    const [perfil, setPerfil] = useState<Perfil>();
    const token = getStorageItem();
    useEffect(() => {
        fetchPerfil(token).then(data => setPerfil(data));
    }, [token]);

    return (
        <div className="bg-sky-200 flex h-screen">
            <div className="flex flex-col w-full">
                <main className="p-4">
                    <Title>Perfil</Title>
                    {perfil && (
                        <div
                            className="bg-white p-2 shadow-2xl border-l-[10px] border-l-black rounded-2xl">
                            <h2 className="font-medium text-2xl my-4">Informações do usuário: </h2>
                            <p>CPF: {perfil.cpf}</p>
                            <p>RG: {perfil.rg}</p>
                            <p>Tipo de Perfil: {perfil.perfil}</p>
                            <p>Nome completo: {perfil.nome}</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Perfil;