"use client";

import React, { useEffect, useState, useCallback } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useRouter } from "next/navigation";
import Title from "@/app/components/Title/title";
import { getStorageItem } from "@/app/functions/storage/getStorageItem/getStorageItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getProgramaById } from "@/app/service/programa/getById/getById";
import { tokenService } from "@/app/Utils/Cookies/tokenStorage";
import { putPrograma } from "@/app/service/programa/put/putPrograma";
import { toast } from "react-toastify";
import { getUsuarioId } from "@/app/functions/getUsuarioId/getUsuarioId";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const VizualizarSolicitacao = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [linguagens, setLinguagens] = useState<string[]>([]);
  const [linguagemInput, setLinguagemInput] = useState<string>("");
  const [programaData, setProgramaData] = useState<any>({});
  const [open, setOpen] = useState(false);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
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
            setLinguagens(programaData.linguagens || []);
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

  useEffect(() => {
    const fetchUsuarioId = async () => {
      try {
        const id = await getUsuarioId(token);
        if (id !== undefined) {
          setUsuarioId(id);
        }
      } catch (error) {
        console.error("Erro ao obter o usuarioId:", error);
      }
    };

    fetchUsuarioId();
  }, [token]);

  const handleLinguagensKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const trimmedInput = linguagemInput.trim();
      if (
        (event.key === "Enter" || event.key === " " || event.key === ",") &&
        trimmedInput !== ""
      ) {
        event.preventDefault();
        console.log("Nova linguagem:", trimmedInput); // Adicione este console.log para verificar a nova linguagem
        setLinguagens((prev) => [...prev, trimmedInput]);
        console.log(linguagens);
        setLinguagemInput("");
      }
    },
    [linguagemInput, linguagens]
  );

  const handleRemoveLinguagem = (index: number) => {
    setLinguagens((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    const formData = new FormData(
      document.getElementById("editar-form") as HTMLFormElement
    );

    const data: Partial<IPrograma> = {
      titulo: formData.get("titulo") as string,
      descricao: formData.get("descricao") as string,
      solucaoProblemaDesc: formData.get("solucaoProblemaDesc") as string,
      linguagens: linguagens,
      descricaoMercado: formData.get("descricaoMercado") as string,
      dataCriacaoPrograma: formData.get("dataCriacaoPrograma") as string,
      vinculoUnitins: formData.get("vinculoUnitins") === "Sim",
      fasePublicacao: formData.get("fasePublicacao") as string,
      status: formData.get("status") as string,
      nomeArquivo: formData.get("nomeArquivo") as File,
      usuarioId: usuarioId !== null ? usuarioId : undefined, // Add this line
    };

    console.log(data);

    try {
      await putPrograma(data, programaId, token);
      toast.success("Programa atualizado com sucesso!");
      router.push("/");
    } catch (error) {
      toast.error("Erro ao atualizar o programa. Tente novamente.");
    }
    handleClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleOpen();
  };

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
