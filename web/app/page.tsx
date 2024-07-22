"use client";
import React, { useEffect, useState } from "react";
import { CardProgram } from "./components/CardPrograma/Card";
import Title from "./components/Title/title";
import { getStorageItem } from "@/app/functions/storage/getStorageItem/getStorageItem";
import { getProgramasUsuario } from "@/app/service/programa/programaUserLogado";
import Button from "@mui/material/Button";
import { getProgramasSearch } from "./functions/storage/getProgramaSearch";
import AlertMessage from "./components/AlertMessage";

export default function DashboardPage() {
  const token = getStorageItem();
  const [programas, setProgramas] = useState<IPrograma[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    const programaSearch = getProgramasSearch();
    if (programaSearch) {
      const parsedProgramas = JSON.parse(programaSearch); // Converter a string de volta para um array de programas
      setProgramas(parsedProgramas); // Definir os programas no estado
    } else {
      getProgramasUsuario(token).then((data) => setProgramas(data ?? []));
    }
  }, [token]);

  const handleNewRequest = () => {
    setAlertMessage("Redirecionando para a página de nova solicitação...");
    setAlertSeverity("success");
    setAlertOpen(true);
    setTimeout(() => {
      window.location.href = "/programa/cadastrar"; // Redireciona para a página após a mensagem
    }, 2000); // Exibe a mensagem por 2 segundos
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col">
        <div className="w-full h-full i">
          <Title>Dashboard</Title>
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
            {programas.map((programa) => (
              <CardProgram key={programa._id} programa={programa} />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
