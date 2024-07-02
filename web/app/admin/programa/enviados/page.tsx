"use client"
import React, {useEffect, useState} from "react";
import {getStorageItem} from "@/app/functions/storage/getStorageItem/getStorageItem";
import {CardProgram} from "@/app/components/CardPrograma/Card";
import Title from "@/app/components/Title/title";
import {fetchPerfil} from "@/app/service/perfil/logUser";
import { getProgramasEnviados } from "@/app/service/programa/admin/getEnviados/getEnviados";
import { ProgramCountCard } from "@/app/components/CardPrograma/cardCounter";

export default function ProgramasEnviados() {
    const token = getStorageItem();
    const [programas, setProgramas] = useState<IPrograma[]>([]);
    const [usuario, setUsuario] = useState<Perfil>();

    useEffect(() => {
        getProgramasEnviados(token).then(data => setProgramas(data ?? []));
        fetchPerfil(token).then(data => setUsuario(data));
    }, [token]);

    return (
  <div className="flex flex-col h-full">
    <Title>Status: ENVIADO</Title>
    <ProgramCountCard count={programas.length} />
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
