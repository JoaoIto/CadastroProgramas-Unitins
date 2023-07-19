"use client"

import { Sidebar } from "@/app/components/MenuLateral/sidebar";
import { Cabecalho } from "@/app/components/HeaderSearch/cabecalho";
import React, { useEffect, useState } from "react";
import ApiUtils from "@/app/Utils/Api/apiMethods";
import {Programa} from "@/app/dashboard/page";

interface Perfil {
    _id: string;
    cpf: string;
    perfil: string;
    nome: string;
    programas: Programa[];
}

function Perfil() {
    const [perfil, setPerfil] = useState<Perfil | null>(null);

    useEffect(() => {
        const perfilId = sessionStorage.getItem("perfilId");

        if (perfilId) {
            const fetchPerfil = async () => {
                try {
                    const perfilData = await ApiUtils.getByUuid<Perfil>(`http://localhost:3333/usuario`, perfilId);
                    if (perfilData) {
                        setPerfil(perfilData);
                        console.log(perfilData)
                    }
                } catch (error) {
                    console.error("Erro ao obter o perfil:", error);
                }
            };

            fetchPerfil();
        }
    }, []);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col w-full">
                <Cabecalho />
                <main className="p-4">
                    <h2>Perfil</h2>
                    {perfil && (
                        <div>
                            <p>CPF: {perfil.cpf}</p>
                            <p>Tipo de Perfil: {perfil.perfil}</p>
                            <p>Nome: {perfil.nome}</p>
                            {/* Exibindo os programas */}
                            <p>Programas:</p>
                            {perfil.programas.map((programa) => (
                                <div key={programa._id}>
                                    <p>Nome Completo: {programa.nomeCompleto}</p>
                                    <p>RG: {programa.rg}</p>
                                    <p>CPF: {programa.cpf}</p>
                                    <p>Data de Nascimento: {programa.dataNascimento}</p>
                                    <p>Estado Civil: {programa.estadoCivil}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Perfil;
