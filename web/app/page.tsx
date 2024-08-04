"use client";
import React, { useEffect, useState } from "react";
import { CardProgram } from "./components/CardPrograma/Card";
import Title from "./components/Title/title";
import { getStorageItem } from "@/app/functions/storage/getStorageItem/getStorageItem";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import AlertMessage from "./components/AlertMessage";
import { getProgramasUsuarioPaginado } from "./service/programa/programaUserLogadoPaginado";
import { Typography } from "@mui/material";
import { getProgramasSearch } from "./functions/storage/getProgramaSearch";
import { ProgramCountCard } from "./components/CardPrograma/cardCounter";

const PAGE_LIMIT = 5; // Define um limite padrão para a paginação

export default function DashboardPage() {
  const token = getStorageItem();
  const [programas, setProgramas] = useState<IPrograma[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1); // Página inicial deve ser 1
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        // Verifica se há dados de pesquisa armazenados
        const searchResults = getProgramasSearch();
        if (searchResults) {
          setProgramas(JSON.parse(searchResults));
          setTotal(searchResults.length);
          setTotalPages(1); // Considera uma única página para resultados de pesquisa
        } else {
          const response = await getProgramasUsuarioPaginado(
            token,
            currentPage,
            PAGE_LIMIT
          );
          if (response) {
            const { data = [], total = 0 } = response;
            setProgramas(data);
            setTotal(total);
            setTotalPages(Math.ceil(total / PAGE_LIMIT));
          }
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

  const handleNewRequest = () => {
    setAlertMessage("Redirecionando para a página de nova solicitação...");
    setAlertSeverity("success");
    setAlertOpen(true);
    setTimeout(() => {
      window.location.href = "/programa/cadastrar"; // Redireciona para a página após a mensagem
    }, 2000); // Exibe a mensagem por 2 segundos
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col">
        <div className="w-full h-full">
          <Title>Dashboard</Title >
          <ProgramCountCard count={programas.length} />
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
          <div className="flex self-end p-4">
            <Button
              variant="contained"
              className="bg-azulEscuro"
              onClick={handleNewRequest}
            >
              Nova solicitação +
            </Button>
          </div>
          <AlertMessage
            open={alertOpen}
            message={alertMessage}
            severity={alertSeverity}
            onClose={() => setAlertOpen(false)}
          />

          <main className="flex flex-wrap items-center justify-center">
            {programas.length === 0 ? (
              <p>Nenhum programa encontrado.</p>
            ) : (
              programas.map((programa) => (
                <CardProgram key={programa._id} programa={programa} />
              ))
            )}
          </main>

          <div className="flex justify-center mt-4">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
