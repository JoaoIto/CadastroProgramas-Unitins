"use client"

import { Sidebar } from "@/app/components/MenuLateral/sidebar";
import { Cabecalho } from "@/app/components/HeaderSearch/cabecalho";
import React, { useEffect, useState } from "react";
import ApiUtils from "@/app/Utils/Api/apiMethods";
import Title from "@/app/components/Title/title";

interface Perfil {
    _id: string;
    cpf: string;
    perfil: string;
    nome: string;
    rg: string;
}

function Perfil() {
    const [perfil, setPerfil] = useState<Perfil | null>(null);

    useEffect(() => {
        const perfilId = sessionStorage.getItem("perfilId");

        if (perfilId) {
            const fetchPerfil = async () => {
                try {
                    const perfilData = await ApiUtils.getByUuid<Perfil>(
                        `http://localhost:3333/usuario`,
                        perfilId
                    );
                    if (perfilData) {
                        setPerfil(perfilData);
                    }
                } catch (error) {
                    console.error("Erro ao obter o perfil:", error);
                }
            };

            fetchPerfil();
        }
    }, []);

    const isSmallScreen = window.innerWidth < 870;
    return (
        <div className="bg-sky-200 flex h-screen">
            <Sidebar />
            <div className="flex flex-col w-full">
                <main className="p-4">
                    <Title>Perfil</Title>
                    {perfil && (
                        <div
                            style={{ maxWidth: isSmallScreen ? '400px' : 'none' }} // Aplicar largura máxima em uma visualização móvel
                            className="bg-white p-2 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl">
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