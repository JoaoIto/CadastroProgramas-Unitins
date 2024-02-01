"use client"
import React, {useEffect, useState} from "react";
import {getStorageItem} from "@/app/functions/getStorageItem/getStorageItem";
import ApiUtils from "@/app/Utils/Api/apiMethods";
import Perfil from "@/app/perfil/page";
import {getProgramasUsuario} from "@/app/service/programa/programaUserLogado";
import {CardProgram} from "@/app/components/CardPrograma/Card";
import Title from "@/app/components/Title/title";
import {fetchPerfil} from "@/app/service/perfil/logUser";

export default function Programas() {
    const token = getStorageItem();
    const [programas, setProgramas] = useState<IPrograma[]>([]);
    const [usuario, setUsuario] = useState<Perfil>();

    useEffect(() => {
        getProgramasUsuario(token).then(data => setProgramas(data ?? []));
        fetchPerfil(token).then(data => setUsuario(data));
    }, [token]);

    return (
  <div className="flex h-screen">
      <main className="flex flex-wrap items-center">
          <Title>Programas do usuário: </Title>
          <div className={`p-4`}>
              <p>Nome: {usuario?.nome}</p>
              <p>CPF: {usuario?.cpf}</p>
          </div>
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
