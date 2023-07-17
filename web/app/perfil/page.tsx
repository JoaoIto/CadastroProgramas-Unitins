"use client"
import React from "react";
import {Sidebar} from "@/app/components/MenuLateral/sidebar";
import {Cabecalho} from "@/app/components/HeaderSearch/cabecalho";
import { useRouter, useSearchParams } from 'next/navigation';

function Perfil(){

    const { get } = useSearchParams();
    const uuid = get('uuid');
    const router = useRouter();

    return(
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col w-full">
                <Cabecalho />
                <main className="p-4">
                    <h2>Perfil</h2>
                </main>
            </div>
        </div>
    )
}

export default Perfil;