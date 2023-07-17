"use client"
import React, { useState, useEffect } from 'react';
import { CardProgram } from '../components/CardPrograma/Card';
import ButtonLinkPage from '../components/ButtonLinkPage/ButtonLinkPage';
import ApiUtils from '@/app/Utils/Api/apiMethods';
import {Sidebar} from "@/app/components/MenuLateral/sidebar";
import {Cabecalho} from "@/app/components/HeaderSearch/cabecalho";
import {useSearchParams} from "next/navigation";

interface Programa {
  _id: string;
  nomeCompleto: string;
  rg: string;
  cpf: string;
  dataNascimento: string;
  estadoCivil: string;
}

const DashboardPage = () => {
  const [programas, setProgramas] = useState<Programa[]>([]);
  const { get } = useSearchParams();
  const uuid = get('uuid');
  const id = get('id');

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const data = await ApiUtils.get<Programa[]>('http://localhost:3333/programa');
        if (data) {
          setProgramas(data);
        }
      } catch (error) {
        console.error('Erro ao buscar os programas:', error);
      }
    };

    fetchProgramas();
  }, []);

  return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Cabecalho/>
          <main className="p-4">
            <ButtonLinkPage href={`/programa/cadastrar?`}>Nova solicitação +</ButtonLinkPage>
            <div className="w-full flex">
              {programas.map((programa) => (
                  <CardProgram key={programa._id} programa={programa} />
              ))}
            </div>
          </main>
        </div>
      </div>
  );
};

export default DashboardPage;
