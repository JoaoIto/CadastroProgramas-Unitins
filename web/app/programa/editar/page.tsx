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

const EditarSolicitacao = () => {
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
        if (id!== undefined) {
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
    const formData = new FormData(document.getElementById('editar-form') as HTMLFormElement);

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
      usuarioId: usuarioId!== null? usuarioId : undefined, // Add this line
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

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex-grow bg-sky-200 p-8">
      <Title>Editar Solicitação</Title>
      <form id="editar-form" className="mx-auto" onSubmit={handleSubmit}>
        <Grid
          className="bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
          container
          spacing={2}
        >
          <h2 className="text-2xl font-medium">Dados do programa de computador:</h2>
          <Grid item xs={12}>
            <TextField
              label="Título do Programa"
              name="titulo"
              fullWidth
              type="text"
              defaultValue={programaData.titulo || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextareaAutosize
                minRows={4}
                placeholder="Descrição do Programa..."
                name="descricao"
                className="w-full p-2 border-2 border-cinzaTraco placeholder:text-slate-400 rounded resize-none"
                defaultValue={programaData.descricao || ""}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextareaAutosize
                minRows={4}
                placeholder="Solução do Problema..."
                name="solucaoProblemaDesc"
                className="w-full p-2 border-2 border-cinzaTraco placeholder:text-slate-400 rounded resize-none"
                defaultValue={programaData.solucaoProblemaDesc || ""}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextareaAutosize
                minRows={4}
                placeholder="Descrição do Mercado..."
                name="descricaoMercado"
                className="w-full p-2 border-2 border-cinzaTraco placeholder:text-slate-400 rounded resize-none"
                defaultValue={programaData.descricaoMercado || ""}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Linguagens"
              fullWidth
              type="text"
              value={linguagemInput}
              onChange={(e) => setLinguagemInput(e.target.value)}
              onKeyDown={handleLinguagensKeyDown}
            />
            <div>
              {linguagens.map((linguagem, index) => (
                <span
                key={index}
                className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {linguagem}
                <IconButton
                  size="small"
                  onClick={() => handleRemoveLinguagem(index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </span>
              
              ))}
            </div>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="vinculoUnitins">Vínculo com a Unitins</InputLabel>
              <Select name="vinculoUnitins" defaultValue={programaData.vinculoUnitins ? "Sim" : "Não"}>
                <MenuItem value="Sim">Sim</MenuItem>
                <MenuItem value="Não">Não</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="fasePublicacao">Fase de Publicação</InputLabel>
              <Select name="fasePublicacao" defaultValue={programaData.fasePublicacao || "ARTIGO"}>
                <MenuItem value="ARTIGO">Artigo</MenuItem>
                <MenuItem value="MONOGRAFIA">Monografia</MenuItem>
                <MenuItem value="LIVRO">Livro</MenuItem>
                <MenuItem value="DISCERTACAO">Dissertação</MenuItem>
                <MenuItem value="TESE">Tese</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl disabled fullWidth>
              <InputLabel htmlFor="status">Status</InputLabel>
              <Select name="status" defaultValue={programaData.status}>
                <MenuItem value="RASCUNHO">RASCUNHO</MenuItem>
                <MenuItem value="ENVIADO">ENVIADO</MenuItem>
                <MenuItem value="EM_ANALISE">EM_ANALISE</MenuItem>
                <MenuItem value="APROVADO">APROVADO</MenuItem>
                <MenuItem value="REPROVADO">REPROVADO</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nome do Arquivo"
              name="nomeArquivo"
              fullWidth
              type="file"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
              type="submit"
            >
              Atualizar
            </Button>
          </Grid>
        </Grid>
      </form>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar Atualização do Programa</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja atualizar o programa?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditarSolicitacao;
