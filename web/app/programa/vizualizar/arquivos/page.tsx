"use client";

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Title from "@/app/components/Title/title";
import { getStorageItem } from "@/app/functions/storage/getStorageItem/getStorageItem";
import { useRouter } from "next/navigation";
import { getProgramaById } from "@/app/service/programa/getById/getById";
import { downloadFile } from "@/app/service/programa/admin/dowload/dowloadFile";
import { tokenService } from "@/app/Utils/Cookies/tokenStorage";

const ArquivosPrograma = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programaData, setProgramaData] = useState<IPrograma | null>(null);
  const router = useRouter();
  const token = getStorageItem();
  const programaId = tokenService.getProgramaId();

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

  const handleDownload = async (tipo: string) => {
    try {
      await downloadFile(tipo, programaId, token);
    } catch (error) {
      console.error("Erro ao baixar o arquivo:", error);
    }
  };

  const renderButton = (
    label: string,
    filePath: string | undefined,
    tipo: string
  ) => {
    return (
      <Button
        variant="outlined"
        onClick={() => handleDownload(tipo)}
        disabled={!filePath}
      >
        {filePath ? label : `${label} - Arquivo ainda não anexado`}
      </Button>
    );
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex-grow bg-sky-200 p-8">
      <Title>Arquivos do Programa</Title>
      <div className="mx-auto">
        {/* Seção para arquivos anexados */}
        <Grid
          container
          spacing={2}
          className="bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
        >
          <Grid item xs={12}>
            <Typography variant="h6">Arquivos Anexados:</Typography>
          </Grid>
          <Grid className="flex flex-col gap-2" item xs={12}>
            {programaData?.codigoFontePath && renderButton(
              "Código Fonte",
              programaData.codigoFontePath,
              "codigoFonte"
            )}
            {programaData?.documentoConfidencialidadePath && renderButton(
              "Documento de Confidencialidade",
              programaData.documentoConfidencialidadePath,
              "documentoConfidencialidade"
            )}
            {programaData?.certificadoRegistroPath && renderButton(
              "Certificado de Registro",
              programaData.certificadoRegistroPath,
              "certificadoRegistro"
            )}
            {programaData?.boletoPath && renderButton(
              "Boleto",
              programaData.boletoPath,
              "boleto"
            )}
            {programaData?.veracidadePath && renderButton(
              "Termo de Veracidade",
              programaData.veracidadePath,
              "veracidade"
            )}
          </Grid>
        </Grid>

        {/* Seção para arquivos a serem anexados */}
        <Grid
          container
          className="bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-red-300 border-t-red-300 rounded-xl mt-4"
        >
          <Grid item xs={12}>
            <Typography variant="h6">Arquivos a Serem Anexados: EM ANÁLISE</Typography>
          </Grid>
          <Grid className="flex flex-col gap-2" item xs={12}>
            {!programaData?.codigoFontePath && renderButton(
              "Código Fonte",
              undefined,
              "codigoFonte"
            )}
            {!programaData?.documentoConfidencialidadePath && renderButton(
              "Documento de Confidencialidade",
              undefined,
              "documentoConfidencialidade"
            )}
            {!programaData?.certificadoRegistroPath && renderButton(
              "Certificado de Registro",
              undefined,
              "certificadoRegistro"
            )}
            {!programaData?.boletoPath && renderButton(
              "Boleto",
              undefined,
              "boleto"
            )}
            {!programaData?.veracidadePath && renderButton(
              "Termo de Veracidade",
              undefined,
              "veracidade"
            )}
          </Grid>
        </Grid>

        {/* Botão para voltar */}
        <Grid container justifyContent="center" spacing={2} mt={4}>
          <Button
            variant="outlined"
            onClick={() => router.push(`/programa/vizualizar`)}
          >
            Voltar para Visualizar Solicitação
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default ArquivosPrograma;
