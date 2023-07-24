"use client"

import React, {useEffect, useState} from 'react';
import {CardProgram} from '../components/CardPrograma/Card';
import ButtonLinkPage from '../components/ButtonLinkPage/ButtonLinkPage';
import ApiUtils from '@/app/Utils/Api/apiMethods';
import {Sidebar} from '@/app/components/MenuLateral/sidebar';
import {Cabecalho} from '@/app/components/HeaderSearch/cabecalho';
import {useSearchParams} from 'next/navigation';
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

export interface UsuarioPrograma {
  _id: string;
  usuarioId: string;
  programaId: string;
}


const DashboardPage = () => {
  const [programas, setProgramas] = useState<Programa[]>([]);
  const { get } = useSearchParams();
  const uuid = get('uuid');

  const perfilId = typeof window !== "undefined" ? window.sessionStorage.getItem('perfilId') : '';
  console.log(`PerfilId é: ${perfilId}`)
  const [userId, setUserId] = useState<string>('');
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [programasUsuario, setProgramasUsuario] = useState<UsuarioPrograma[]>([]);

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
        } else {
          // Se não for administrador, busca os programas do usuário na tabela usuario-programa
          const programasUsuario = await ApiUtils.get<UsuarioPrograma[]>(`http://localhost:3333/usuario-programa/${perfilData._id}/programas`);

          const programaIds = programasUsuario ? programasUsuario.map((programa) => programa.programaId) : [];

          // Busca os detalhes completos dos programas usando os IDs
          const programasCompletos = await Promise.all(
              programaIds.map(async (programaId) => {
                const programaCompleto = await ApiUtils.getByUuid<Programa>('http://localhost:3333/programa', programaId);
                return programaCompleto || null;
              })
          );
          setIsOwner(true)
          return programasCompletos.filter((programa) => programa !== null) as Programa[];
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


  console.log(isOwner)

  // Função auxiliar para verificar a permissão de edição/deleção para cada programa
  const calculatePermission = (programa: Programa, userId: string, programasUsuario: UsuarioPrograma[]): boolean => {
    // Verifica se o usuário é administrador
    if (isOwner) {
      return true;
    }
    // Verifica se o programa pertence ao usuário atual através da lista de programas do usuário
    return programasUsuario.some(
        (usuarioPrograma) => usuarioPrograma.programaId === programa._id && usuarioPrograma.usuarioId === userId
    );
  };

  return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Cabecalho />
          <main className="p-4">
            <ButtonLinkPage href={`/programa/cadastrar`}>Nova solicitação +</ButtonLinkPage>
            <div className="w-full flex">
              {programas.map((programa) => (
                  <CardProgram
                      key={programa._id}
                      programa={programa}
                      userId={userId}
                      isOwner={isOwner}
                      hasPermission={isOwner}
                  />
              ))}
            </div>
          </main>
        </div>
      </div>
  );
};

export default DashboardPage;
