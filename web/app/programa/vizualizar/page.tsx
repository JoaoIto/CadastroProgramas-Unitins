"use client";

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import Title from "@/app/components/Title/title";
import { getStorageItem } from "@/app/functions/storage/getStorageItem/getStorageItem";
import Button from "@mui/material/Button";
import { getProgramaById } from "@/app/service/programa/getById/getById";
import { tokenService } from "@/app/Utils/Cookies/tokenStorage";

const VizualizarSolicitacao = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programaData, setProgramaData] = useState<any>({});
  const router = useRouter();
  const token = getStorageItem();
  const programaId = tokenService.getProgramaId(); // Função getProgramaId() que retorna o ID

  useEffect(() => {
    if (programaId) {
      const fetchProgramaData = async () => {
        try {
          const programaData = await getProgramaById(token, programaId);
          if (programaData) {
            setProgramaData(programaData);
            setIsLoading(false);
          } else {
            console.error("Programa não encontrado");
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Erro ao buscar os dados:", error);
          setIsLoading(false);
        }
      };

      fetchProgramaData();
    }
  }, [programaId, token]);

  const handleEdit = () => {
    router.push(`/programa/editar`);
};

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex-grow bg-sky-200 p-8">
      <Title>Vizualizar Solicitação</Title>
      <div className="mx-auto">
        <Grid
          className="bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
          container
          spacing={2}
        >
          <h2 className="text-2xl font-medium">
            Dados do programa de computador:
          </h2>
          <Grid item xs={12}>
            <p>
              <strong>Título do Programa:</strong>{" "}
              {programaData.titulo || "N/A"}
            </p>
          </Grid>
          <Grid item xs={12}>
            <p>
              <strong>Descrição do Programa:</strong>{" "}
              {programaData.descricao || "N/A"}
            </p>
          </Grid>
          <Grid item xs={12}>
            <p>
              <strong>Solução do Problema:</strong>{" "}
              {programaData.solucaoProblemaDesc || "N/A"}
            </p>
          </Grid>
          <Grid item xs={12}>
            <p>
              <strong>Descrição do Mercado:</strong>{" "}
              {programaData.descricaoMercado || "N/A"}
            </p>
          </Grid>
          <Grid item xs={12}>
            <p>
              <strong>Linguagens:</strong>{" "}
              {programaData.linguagens
                ? programaData.linguagens.join(", ")
                : "N/A"}
            </p>
          </Grid>
          <Grid item xs={12}>
            <p>
              <strong>Vínculo com a Unitins:</strong>{" "}
              {programaData.vinculoUnitins ? "Sim" : "Não"}
            </p>
          </Grid>
          <Grid item xs={12}>
            <p>
              <strong>Fase de Publicação:</strong>{" "}
              {programaData.fasePublicacao || "N/A"}
            </p>
          </Grid>
          <Grid item xs={12}>
            <p>
              <strong>Status:</strong> {programaData.status || "N/A"}
            </p>
          </Grid>
          <Grid item xs={12}>
            <p>
              <strong>Nome do Arquivo:</strong>{" "}
              {programaData.nomeArquivo || "N/A"}
            </p>
          </Grid>

          <Grid item xs={12}>
            <p className="text-2xl text-azulEscuro">
              <strong>Deseja editar?</strong>{" "}
              <Button
                className="bg-azulEscuroGradient"
                variant="contained"
                onClick={handleEdit}
              >
                Editar
              </Button>
            </p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default VizualizarSolicitacao;
