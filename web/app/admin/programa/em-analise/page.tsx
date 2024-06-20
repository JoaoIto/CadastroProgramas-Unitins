"use client"
import React, {useEffect, useState} from "react";
import {getStorageItem} from "@/app/functions/storage/getStorageItem/getStorageItem";
import {CardProgram} from "@/app/components/CardPrograma/Card";
import Title from "@/app/components/Title/title";
import {fetchPerfil} from "@/app/service/perfil/logUser";
import { getProgramasEmAnalise } from "@/app/service/programa/admin/getEmAnalise/getEmAnalise";

export default function ProgramasEmAnalise() {
    const token = getStorageItem();
    const [programas, setProgramas] = useState<IPrograma[]>([]);
    const [usuario, setUsuario] = useState<Perfil>();

    useEffect(() => {
        getProgramasEmAnalise(token).then(data => setProgramas(data ?? []));
        fetchPerfil(token).then(data => setUsuario(data));
    }, [token]);

    return (
  <div className="flex flex-col h-screen">
    <Title>Status: EM ANÁLISE</Title>
      <main className="flex flex-wrap items-center">
          {programas.map((programa) => (
              <CardProgram
                  key={programa._id}
                  programa={programa}
              />
          ))}
      </main>
  </div>
);
}
