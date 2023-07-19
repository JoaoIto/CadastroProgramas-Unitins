"use client"

import React, { useState, useEffect } from 'react';
import { CardProgram } from '../components/CardPrograma/Card';
import ButtonLinkPage from '../components/ButtonLinkPage/ButtonLinkPage';
import ApiUtils from '@/app/Utils/Api/apiMethods';
import { Sidebar } from '@/app/components/MenuLateral/sidebar';
import { Cabecalho } from '@/app/components/HeaderSearch/cabecalho';
import { useSearchParams } from 'next/navigation';
import Perfil from "@/app/perfil/page";

export interface Programa {
  _id: string;
  nomeCompleto: string;
  rg: string;
  cpf: string;
  dataNascimento: string;
  estadoCivil: string;
  alunosId: string[];
}

const DashboardPage = () => {
  const [programas, setProgramas] = useState<Programa[]>([]);
  const { get } = useSearchParams();
  const uuid = get('uuid');

  const perfilId = sessionStorage.getItem("perfilId");
  const [userId, setUserId] = useState<string>('');
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const fetchPerfil = async () => {
    try {
      const perfil = await ApiUtils.getByUuid<Perfil>("http://localhost:3333/usuario", perfilId!);
      if (perfil) {
        setUserId(perfil._id);
        return perfil;
      }
      return null;
    } catch (error) {
      console.error('Erro ao obter o perfil:', error);
      return null;
    }
  };

  const fetchProgramasUsuario = async () => {
    try {
      const perfilData = await fetchPerfil();
      if (perfilData) {
        if (perfilData.perfil === 'administrador') {
          // Se for administrador, retorna todos os programas
          const data = await ApiUtils.get<Programa[]>('http://localhost:3333/programa');
          return data || [];
        } else if (perfilData.programas) {
          // Se não for administrador, busca os programas do usuário
          const programasUsuario = await Promise.all(
              perfilData.programas.map((programaId) =>
                  ApiUtils.getByUuid<Programa>("http://localhost:3333/programa", programaId._id)
              )
          );
          return programasUsuario.filter((programa) => programa !== null) as Programa[];
        }
      }
      return [];
    } catch (error) {
      console.error('Erro ao buscar os programas do usuário:', error);
      return [];
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const programasUsuario = await fetchProgramasUsuario();
      setProgramas(programasUsuario);
    };

    fetchData();
  }, [perfilId]);

  useEffect(() => {
    const checkIsOwner = async () => {
      const perfilData = await fetchPerfil();
      if (perfilData) {
        setIsOwner(perfilData.perfil === 'administrador');
      }
    };

    checkIsOwner();
  }, [perfilId]);

  return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Cabecalho />
          <main className="p-4">
            <ButtonLinkPage href={`/programa/cadastrar?uuid=${uuid}`}>Nova solicitação +</ButtonLinkPage>
            <div className="w-full flex">
              {programas.map((programa) => (
                  <CardProgram key={programa._id} programa={programa} userId={userId} isOwner={isOwner} />
              ))}
            </div>
          </main>
        </div>
      </div>
  );
};

export default DashboardPage;
