"use client"
import React, { useEffect, useState } from "react";
import { getStorageItem } from "@/app/functions/storage/getStorageItem/getStorageItem";
import { CardProgram } from "@/app/components/CardPrograma/Card";
import Title from "@/app/components/Title/title";
import { fetchPerfil } from "@/app/service/perfil/logUser";
import Pagination from "@mui/material/Pagination";
import AlertMessage from "@/app/components/AlertMessage";
import { getProgramasEnviadosPaginado } from "@/app/service/programa/admin/getEnviados/getEnviadosPaginado";
import { Typography } from "@mui/material";
import { ProgramCountCard } from "@/app/components/CardPrograma/cardCounter";

const PAGE_LIMIT = 5; // Define um limite padrão para a paginação

export default function ProgramasEnviados() {
  const token = getStorageItem();
  const [programas, setProgramas] = useState<IPrograma[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");
  const [usuario, setUsuario] = useState<Perfil | undefined>(undefined);

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const perfilData = await fetchPerfil(token);
        setUsuario(perfilData);

        const response = await getProgramasEnviadosPaginado(token, currentPage, PAGE_LIMIT);
        if (response) {
          const { data = [], total = 0 } = response;
          setProgramas(data);
          setTotal(total);
          setTotalPages(Math.ceil(total / PAGE_LIMIT));
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setAlertMessage("Erro ao buscar os dados.");
        setAlertSeverity("error");
        setAlertOpen(true);
      }
    };

    fetchProgramas();
  }, [token, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-full">
      <main className="flex flex-wrap items-center justify-center">
        <div className="w-full flex flex-col flex-start">
          <Title>Status: ENVIADO</Title>
          <ProgramCountCard count={programas.length} />
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
        {programas.length === 0 ? (
          <p>Nenhum programa encontrado.</p>
        ) : (
          programas.map((programa) => (
            <CardProgram key={programa._id} programa={programa} />
          ))
        )}
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </main>
      <AlertMessage
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
}
