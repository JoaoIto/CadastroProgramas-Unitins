"use client";

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import Title from "@/app/components/Title/title";
import { getStorageItem } from "@/app/functions/storage/getStorageItem/getStorageItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { getProgramaById } from "@/app/service/programa/getById/getById";
import { tokenService } from "@/app/Utils/Cookies/tokenStorage";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CodeIcon from "@mui/icons-material/Code";
import { useUserPayload } from "@/app/hooks/user/userPayload";
import { downloadFile } from "@/app/service/programa/admin/dowload/dowloadFile";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import { IPrograma } from "@/app/interfaces/IPrograma";
import { enviarJustificativa } from "@/app/service/programa/admin/justificativa/enviarJustificativa";
import { ProgramaStatus } from "@/app/enum/programa-status.enum";
import AlertMessage from "@/app/components/AlertMessage";
import { getStatusStyles } from "@/app/components/CardPrograma/getStatusStyles";
import JustificativaCard from "@/app/components/CardPrograma/JustificativaCard";
import { useUsersByIds } from "@/app/hooks/user/userGetByIds";

const VizualizarSolicitacao = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programaData, setProgramaData] = useState<IPrograma | null>(null);
  const [mostrarDescricao, setMostrarDescricao] = useState<boolean>(true);
  const [mostrarSolucao, setMostrarSolucao] = useState<boolean>(true);
  const [mostrarMercado, setMostrarMercado] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [justificativa, setJustificativa] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const router = useRouter();
  const token = getStorageItem();
  const programaId = tokenService.getProgramaId();
  const { profile, isLoading: isProfileLoading } = useUserPayload();
  const isAdmin = profile.perfil === "admin";
  const [authorIds, setAuthorIds] = useState<string[]>([]);
  const { autores, isLoading: isAutoresLoading } = useUsersByIds(authorIds);

  useEffect(() => {
    if (programaData) {
      // Supondo que `programaData.autores` contém os IDs dos autores
      setAuthorIds(programaData.autores);
    }
  }, [programaData]);

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

  // Funções para abrir e fechar o modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Função para enviar a justificativa
  const handleSubmitJustificativa = async () => {
    try {
      const response = await enviarJustificativa(
        token,
        justificativa,
        programaId
      );
      setAlertSeverity("success");
      setAlertMessage("Justificativa enviada com sucesso");
      setAlertOpen(true);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("Erro ao enviar justificativa");
      setAlertOpen(true);
    } finally {
      setAlertOpen(true);
    }
  };

  const handleEdit = () => {
    router.push(`/programa/editar`);
  };

  const handleArquivos = () => {
    router.push(`/programa/vizualizar/arquivos`);
  };

  const handleProcesso = () => {
    router.push(`/admin/programa/processo`);
  };

  const shouldShowButton = (text: string) => {
    return text.length > 100; // Exemplo de limiar para mostrar o botão
  };

  if (isLoading || isProfileLoading) {
    return <div>Carregando...</div>;
  }

  const handleDownload = async (tipo: string) => {
    try {
      await downloadFile(tipo, programaId, token);
    } catch (error) {
      console.error("Erro ao baixar o arquivo:", error);
    }
  };

  return (
    <div className="flex-grow bg-sky-200 p-8">
      <Title>Visualizar Solicitação</Title>
      <div className="mx-auto">
        <Grid
          container
          spacing={2}
          className="bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
        >
          {/* Dados do Programa (Esquerda) */}
          <Grid item xs={12} md={6}>
              <Typography variant="h2" className="text-2xl font-medium mb-4">
                Dados dos Autores
              </Typography>
              {isAutoresLoading ? (
                <div>Carregando dados dos autores...</div>
              ) : autores.length > 0 ? (
                autores.map((autor) => (
                  <Grid
                    key={autor._id}
                    container
                    direction="column"
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <TextField
                        label="Nome do autor"
                        value={autor.nome || "N/A"}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="CPF do autor"
                        value={autor.cpf || "N/A"}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="RG do autor"
                        value={autor.rg || "N/A"}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Matrícula do autor"
                        value={autor.matricula || "N/A"}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                ))
              ) : (
                <div>Não há dados de autores disponíveis.</div>
              )}

            <h2 className="text-2xl font-medium mb-4">
              Dados do Programa:{" "}
              {programaData?.status && (
                <Chip
                  label={programaData.status}
                  variant="outlined"
                  style={{
                    borderColor: getStatusStyles(programaData.status)
                      .borderColor,
                    backgroundColor: getStatusStyles(programaData.status)
                      .backgroundColor,
                    color: getStatusStyles(programaData.status).color,
                    fontWeight: "bold",
                    padding: "2px 4px",
                  }}
                />
              )}
            </h2>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Título do Programa"
                  value={programaData?.titulo || "N/A"}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Vínculo com a Unitins"
                  value={programaData?.vinculoUnitins ? "Sim" : "Não"}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Fase de Publicação"
                  value={programaData?.fasePublicacao || "N/A"}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              {(isAdmin && programaData?.justificativa) ||
                (programaData?.status === ProgramaStatus.EM_AJUSTES &&
                  programaData?.justificativa && (
                    <Grid item xs={12}>
                      <JustificativaCard
                        justificativa={programaData.justificativa}
                      />
                    </Grid>
                  ))}
              {isAdmin && programaData?.hashType && programaData.hash && (
                <Grid item xs={20}>
                  <Grid item xs={12}>
                    <Typography className="font-semibold my-2">
                      Código hash: {programaData?.hashType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Código hash"
                      value={programaData?.hash || "N/A"}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              )}
              <Grid item xs={12}>
                <h2 className="text-xl font-medium mb-2">Linguagens:</h2>
                <div className="flex flex-wrap gap-2">
                  {programaData?.linguagens &&
                  programaData.linguagens.length > 0 ? (
                    programaData.linguagens.map(
                      (linguagem: string, index: number) => (
                        <Chip key={index} label={linguagem} />
                      )
                    )
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={2}>
                  {programaData?.codigoFontePath && (
                    <Grid item xs={12}>
                      <TextField
                        className="w-[100%]"
                        label="Nome do Arquivo"
                        variant="standard"
                        value={programaData?.codigoFontePath || "N/A"} // Use o nome do arquivo se disponível
                        disabled
                        InputProps={{
                          endAdornment: (
                            <IconButton edge="end" aria-label="view">
                              <VisibilityOutlinedIcon />
                            </IconButton>
                          ),
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} md={4}>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => handleDownload("codigoFonte")}
                      disabled={!programaData?.codigoFontePath}
                    >
                      Visualizar Código Fonte
                      <CodeIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Descrições do Programa (Direita) */}
          <Grid item xs={12} md={6}>
            <h2 className="text-2xl font-medium mb-4">
              Descrições do Programa:
            </h2>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Descrição do Programa"
                  value={
                    mostrarDescricao ? programaData?.descricao || "N/A" : "N/A"
                  }
                  multiline
                  rows={4}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
                {shouldShowButton(programaData?.descricao || "") && (
                  <Button
                    onClick={() => setMostrarDescricao(!mostrarDescricao)}
                  >
                    {mostrarDescricao ? "Ocultar" : "Mostrar"}
                  </Button>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Solução do Problema"
                  value={
                    mostrarSolucao
                      ? programaData?.solucaoProblemaDesc || "N/A"
                      : ""
                  }
                  multiline
                  rows={4}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
                {shouldShowButton(programaData?.solucaoProblemaDesc || "") && (
                  <Button onClick={() => setMostrarSolucao(!mostrarSolucao)}>
                    {mostrarSolucao ? "Ocultar" : "Mostrar"}
                  </Button>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Descrição do Mercado"
                  value={
                    mostrarMercado
                      ? programaData?.descricaoMercado || "N/A"
                      : ""
                  }
                  multiline
                  rows={4}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
                {shouldShowButton(programaData?.descricaoMercado || "") && (
                  <Button onClick={() => setMostrarMercado(!mostrarMercado)}>
                    {mostrarMercado ? "Ocultar" : "Mostrar"}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <h2 className="text-2xl font-medium mb-4">Arquivos do Programa:</h2>
            <Button
              variant="outlined"
              className=" w-1/3"
              onClick={handleArquivos}
            >
              Vizualizar arquivos <ArchiveOutlinedIcon />
            </Button>
          </Grid>
          <Grid className="w-full justify-evenly flex">
            <Grid container className="flex flex-col w-full" mt={2}>
              {(isAdmin ||
                programaData?.status === ProgramaStatus.RASCUNHO ||
                programaData?.status === ProgramaStatus.EM_AJUSTES) && (
                <>
                  <Typography variant="body1">
                    Deseja editar essa solicitação?
                  </Typography>
                  <Button
                    variant="outlined"
                    className="w-1/3"
                    onClick={handleEdit}
                  >
                    Editar
                  </Button>
                </>
              )}
            </Grid>
            {isAdmin && (
              <Grid container className="flex flex-col self-end w-full" mt={2}>
                <Typography variant="body1">
                  Deseja rejeitar essa solicitação?
                </Typography>
                <Button
                  variant="contained"
                  className="bg-vermelho w-1/3"
                  onClick={handleOpen}
                >
                  Rejeitar
                </Button>
              </Grid>
            )}
            {isAdmin && ( // Verificação se o usuário é admin
              <Grid container className="flex flex-col self-end w-full" mt={2}>
                <Typography variant="body1">
                  Deseja prosseguir com a solicitação?
                </Typography>
                <Button
                  variant="contained"
                  className="bg-azulEscuro w-1/3"
                  onClick={handleProcesso}
                >
                  Avançar
                </Button>
              </Grid>
            )}
          </Grid>
          <AlertMessage
            open={alertOpen}
            message={alertMessage}
            severity={alertSeverity}
            onClose={() => setAlertOpen(false)}
          />
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Justificativa</DialogTitle>

            <DialogContent>
              <Typography>
                Aqui será enviado uma justificativa do por quê a solicitação foi
                rejeitada:{" "}
              </Typography>
              <TextField
                required
                label="Justificativa"
                multiline
                rows={4}
                value={justificativa}
                onChange={(e) => setJustificativa(e.target.value)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="error">
                Cancelar
              </Button>
              <Button
                onClick={handleSubmitJustificativa}
                className="bg-azulEscuro"
                variant="contained"
              >
                Enviar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    </div>
  );
};

export default VizualizarSolicitacao;
