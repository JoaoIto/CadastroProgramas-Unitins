"use client"

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/app/components/MenuLateral/sidebar';
import { Cabecalho } from '@/app/components/HeaderSearch/cabecalho';
import { useRouter, useSearchParams } from 'next/navigation';
import ApiUtils from '@/app/Utils/Api/apiMethods';

interface Usuario {
    _id: string;
    nome: string;
    perfil: string;
    cpf: string;
}

const Perfil = () => {
    const { get } = useSearchParams();
    const id = get('id');
    const router = useRouter();
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const fetchUsuario = async () => {
            if (id) {
                try {
                    const data = await ApiUtils.getByUuid<Usuario>('http://localhost:3333/usuario', id);
                    if (data) {
                        setUsuario(data);
                    }
                } catch (error) {
                    console.error('Erro ao buscar o usuário:', error);
                }
            }
        };

        fetchUsuario();
    }, [id]);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col w-full">
                <Cabecalho />
                <main className="p-4">
                    <h2>Perfil</h2>
                    {usuario && (
                        <div>
                            <p>Nome: {usuario.nome}</p>
                            <p>CPF: {usuario.cpf}</p>
                            <p>Perfil: {usuario.perfil}</p>
                            {/* Adicione outros campos do usuário aqui */}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Perfil;
