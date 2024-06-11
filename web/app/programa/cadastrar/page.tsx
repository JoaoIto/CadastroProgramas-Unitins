"use client";

import React, { useEffect, useState, useCallback } from "react";
import Button from "@mui/material/Button";
import { z } from "zod";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Title from "@/app/components/Title/title";
import { getStorageItem } from "@/app/functions/getStorageItem/getStorageItem";
import { fetchPerfil } from "@/app/service/perfil/logUser";
import { TextareaAutosize } from "@mui/material";
import { ProgramaStatus } from "@/app/enum/programa-status.enum";
import { postPrograma } from "@/app/service/programa/post/postPrograma";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getUsuarioId } from "@/app/functions/getUsuarioId/getUsuarioId";

const programa = z.object({
  titulo: z.string().min(1, { message: "Campo obrigatório" }),
  descricao: z.string().min(1, { message: "Campo obrigatório" }),
  solucaoProblemaDesc: z.string().min(1, { message: "Campo obrigatório" }),
  linguagens: z.array(z.string()).nonempty({ message: "Campo obrigatório" }),
  descricaoMercado: z.string().min(1, { message: "Campo obrigatório" }),
  dataCriacaoPrograma: z.string().min(1, { message: "Campo obrigatório" }),
  vinculoUnitins: z.boolean(),
  fasePublicacao: z.string().min(1, { message: "Campo obrigatório" }),
  status: z.string().min(1, { message: "Campo obrigatório" }),
  nomeArquivo: z.any().optional(),
});

type FormData = z.infer<typeof programa>;

export default function NovaSolicitacao() {
  const router = useRouter();
  const token = getStorageItem();
  const [usuarioId, setUsuarioId] = useState<string | undefined>(undefined);
  const [linguagens, setLinguagens] = useState<string[]>([]);
  const [linguagemInput, setLinguagemInput] = useState<string>("");
  const [dataCriacaoPrograma, setDataCriacaoPrograma] = useState<Date | null>(
    null
  );

  useEffect(() => {
    const usuarioIdPromise = getUsuarioId(token);
    usuarioIdPromise
      .then((id) => {
        console.log("Usuario ID:", id);
        setUsuarioId(id);
      })
      .catch((error) => {
        console.error("Erro ao obter o usuarioId:", error);
      });
  }, [token]);

  const handleLinguagensKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const trimmedInput = linguagemInput.trim();
      if (
        (event.key === "Enter" || event.key === " " || event.key === ",") &&
        trimmedInput !== ""
      ) {
        event.preventDefault();
        setLinguagens((prev) => [...prev, trimmedInput]);
        setLinguagemInput("");
      }
    },
    [linguagemInput]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      titulo: formData.get("titulo") as string,
      descricao: formData.get("descricao") as string,
      solucaoProblemaDesc: formData.get("solucaoProblemaDesc") as string,
      linguagens: linguagens,
      descricaoMercado: formData.get("descricaoMercado") as string,
      dataCriacaoPrograma: formData.get("dataCriacaoPrograma") as string,
      vinculoUnitins: formData.get("vinculoUnitins") === "Sim",
      fasePublicacao: formData.get("fasePublicacao") as string,
      status: "ENVIADO",
      nomeArquivo: formData.get("nomeArquivo") as File,
      usuarioId: usuarioId,
    };
    console.log("Data antes de enviar:", data);

    try {
      await postPrograma(data, token);
      toast.success("Programa enviado com sucesso!");
      router.push("/");
    } catch (error) {
      toast.error("Erro ao enviar o programa. Tente novamente.");
    }
  };

  return (
    <div className="flex-grow bg-sky-200 p-8">
      <Title>Nova Solicitação</Title>
      <form className="mx-auto" onSubmit={handleSubmit}>
        <Grid
          className="bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
          container
          spacing={2}
        >
          <h2 className={`text-2xl font-medium`}>
            Dados do programa de computador:{" "}
          </h2>
          <Grid item xs={12}>
            <TextField
              label="Título do Programa"
              name={"titulo"}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextareaAutosize
                minRows={4}
                placeholder="Descrição do Programa..."
                name="descricao"
                id="descricao"
                className={`w-full p-2 border-2 border-cinzaTraco placeholder:text-slate-400 rounded resize-none`}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextareaAutosize
                minRows={4}
                placeholder="Descrição do Programa..."
                name="solucaoProblemaDesc"
                id="solucaoProblemaDesc"
                className={`w-full p-2 border-2 border-cinzaTraco placeholder:text-slate-400 rounded resize-none`}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextareaAutosize
                minRows={4}
                placeholder="Descrição do Mercado..."
                name="descricaoMercado"
                id="descricaoMercado"
                className={`w-full p-2 border-2 border-cinzaTraco placeholder:text-slate-400 rounded resize-none`}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Linguagens"
              name={"linguagens"}
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
                </span>
              ))}
            </div>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="vinculoUnitins">
                Vínculo com a Unitins
              </InputLabel>
              <Select name="vinculoUnitins" id="vinculoUnitins">
                <MenuItem value="Sim">Sim</MenuItem>
                <MenuItem value="Não">Não</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="fasePublicacao">
                Fase de Publicação
              </InputLabel>
              <Select name="fasePublicacao" id="fasePublicacao">
                <MenuItem value="ARTIGO">ARTIGO</MenuItem>
                <MenuItem value="TESE">TESE</MenuItem>
                <MenuItem value="RESUMO">RESUMO</MenuItem>
                <MenuItem value="CONGRESSO">CONGRESSO</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Data de Criação do Programa"
              name="dataCriacaoPrograma"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={
                dataCriacaoPrograma
                  ? dataCriacaoPrograma.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => {
                const dateString = e.target.value;
                setDataCriacaoPrograma(
                  dateString ? new Date(dateString) : null
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept=".pdf,.doc,.docx, .json, .zip, .java, .py"
              name={"nomeArquivo"}
              onChange={(event) => {
                if (event.target.files && event.target.files.length > 0) {
                  console.log(
                    "Nome do arquivo selecionado:",
                    event.target.files[0].name
                  );
                }
              }}
            />
          </Grid>
        </Grid>

        <div className="mt-4">
          <Button
            variant="contained"
            className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
            type="submit"
          >
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
}
