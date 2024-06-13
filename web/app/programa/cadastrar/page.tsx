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
import { getStorageItem } from "@/app/functions/storage/getStorageItem/getStorageItem";
import {
  FormHelperText,
  IconButton,
  TextareaAutosize,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { postPrograma } from "@/app/service/programa/post/postPrograma";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getUsuarioId } from "@/app/functions/getUsuarioId/getUsuarioId";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [currentPage, setCurrentPage] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [usuarioId, setUsuarioId] = useState<string | undefined>(undefined);
  const [linguagens, setLinguagens] = useState<string[]>([]);
  const [linguagemInput, setLinguagemInput] = useState<string>("");
  const [dataCriacaoPrograma, setDataCriacaoPrograma] = useState<Date | null>(
    null
  );
  const [isModification, setIsModification] = useState(false);
  const [isComposed, setIsComposed] = useState(false);
  const [isFonte, setIsFonte] = useState(false);
  const [revelacaoTerceiros, setRevelacaoTerceiros] = useState(false);
  const [fasePublicacao, setFasePublicacao] = useState(false);
  const [revelacaoOral, setRevelacaoOral] = useState(false);

  const handleNext = () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    } else {
      setShowConfirmationModal(true);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

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

  const handleRemoveLinguagem = (index: number) => {
    setLinguagens((prev) => prev.filter((_, i) => i !== index));
  };

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
      setShowConfirmationModal(false);
      router.push("/");
    } catch (error) {
      toast.error("Erro ao enviar o programa. Tente novamente.");
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <Grid
            className="w-[90%] bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
            container
            spacing={2}
          >
            <Typography className="text-2xl font-medium">
              INFORMAÇÕES DO PROGRAMA
            </Typography>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText className="text-lg">
                  1. Informe o título do seu programa de computador.
                </FormHelperText>
                <TextField
                  required
                  label="Título do Programa"
                  name="titulo"
                  fullWidth
                  type="text"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText className="text-lg">
                  2. Descreva o seu programa de computador, incluindo seus
                  principais recursos e funcionalidades.
                </FormHelperText>
                <TextareaAutosize
                  required
                  minRows={15}
                  placeholder="Descrição do Programa..."
                  name="descricao"
                  id="descricao"
                  className={`w-full p-2 border-2 border-cinzaTraco placeholder:text-slate-400 rounded resize-none`}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText className="text-lg">
                  3. Descreva qual problema técnico o seu programa pretende
                  resolver e como ele pretende fazê-lo.
                </FormHelperText>
                <TextareaAutosize
                  required
                  minRows={4}
                  placeholder="Este programa é a solução de qual problema?..."
                  name="solucaoProblemaDesc"
                  id="solucaoProblemaDesc"
                  className={`w-full p-2 border-2 border-cinzaTraco placeholder:text-slate-400 rounded resize-none`}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText className="text-lg">
                  4. Descreva o mercado ou nicho para o qual o seu programa de
                  computador é destinado.
                </FormHelperText>
                <TextareaAutosize
                  required
                  minRows={4}
                  placeholder="Descrição do Mercado..."
                  name="descricaoMercado"
                  id="descricaoMercado"
                  className={`w-full p-2 border-2 border-cinzaTraco placeholder:text-slate-400 rounded resize-none`}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
              <FormHelperText className="text-lg">
                5. Informe as linguagens de programação utilizadas no
                desenvolvimento do programa.
              </FormHelperText>
              <TextField
                label="Linguagens"
                name={"linguagens"}
                fullWidth
                type="text"
                value={linguagemInput}
                onChange={(e) => setLinguagemInput(e.target.value)}
                onKeyDown={handleLinguagensKeyDown}
              />
            </FormControl>
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
                <FormHelperText className="text-lg">
                  6. Informe a data de criação do programa de computador.
                </FormHelperText>
                <TextField
                  required
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
                  helperText=""
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <div>
                <p>
                  Selecione um arquivo relacionado ao seu programa de
                  computador.
                </p>
                <input
                  required
                  type="file"
                  accept=".pdf,.doc,.docx, .json, .zip, .java, .py"
                  name={"nomeArquivo"}
                  onChange={(event) => {
                    if (event.target.files && event.target.files.length > 0) {
                      return (
                        <p>
                          Nome do arquivo selecionado:,
                          {event.target.files[0].name}
                        </p>
                      );
                    }
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
                variant="contained"
                onClick={handleNext}
              >
                Próximo
              </Button>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid
            className="w-[90%] bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
            container
            spacing={2}
          >
            <Typography className="text-2xl font-medium">
              CARACTERIZAÇÃO DO PROGRAMA DE COMPUTADOR
            </Typography>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText className="text-lg">
                  Este programa é modificação tecnológica ou derivação? Caso
                  afirmativo, informe o nome do programa original e respectivo
                  número de registro.
                </FormHelperText>
                <RadioGroup
                  row
                  value={isModification ? "Sim" : "Não"}
                  onChange={(e) => setIsModification(e.target.value === "Sim")}
                >
                  <FormControlLabel
                    value="Sim"
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value="Não"
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
                {isModification && (
                  <TextField
                    label="Nome do Programa Original e Número de Registro"
                    name="programaOriginal"
                    fullWidth
                    type="text"
                  />
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText className="text-lg">
                  Este programa é composto por outras obras de natureza
                  intelectual?
                </FormHelperText>
                <RadioGroup
                  row
                  value={isComposed ? "Sim" : "Não"}
                  onChange={(e) => setIsComposed(e.target.value === "Sim")}
                >
                  <FormControlLabel
                    value="Sim"
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value="Não"
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
                {isComposed && (
                  <TextField
                    label="Descrição das Outras Obras"
                    name="outrasObras"
                    fullWidth
                    type="text"
                  />
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText className="text-lg">
                  Possui fonte de financiamento? Se sim, qual.
                </FormHelperText>
                <RadioGroup
                  row
                  value={isFonte ? "Sim" : "Não"}
                  onChange={(e) => setIsFonte(e.target.value === "Sim")}
                >
                  <FormControlLabel
                    value="Sim"
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value="Não"
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
                {isFonte && (
                  <TextField
                    label="Descreva a fonte de financiamento"
                    name="fonteFinanciamento"
                    fullWidth
                    type="text"
                  />
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
                variant="contained"
                onClick={handleBack}
              >
                Anterior
              </Button>
              <Button
                className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
                variant="contained"
                onClick={handleNext}
              >
                Próximo
              </Button>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid
            className="w-[90%] bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
            container
            spacing={2}
          >
            <Typography className="text-2xl font-medium">VÍNCULO E PUBLICAÇÃO</Typography>
            <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="vinculoUnitins">
                6. Vínculo com a Unitins
              </InputLabel>
              <Select name="vinculoUnitins" id="vinculoUnitins">
                <MenuItem value="Sim">Sim</MenuItem>
                <MenuItem value="Não">Não</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormHelperText className="text-lg"> 
                7. Está em fase de publicação em algum periódico científico,
                congresso, tese, artigo ou resumo?
              </FormHelperText>
              <Select required name="fasePublicacao" id="fasePublicacao">
                <MenuItem value="ARTIGO">Artigo</MenuItem>
                <MenuItem value="TESE">Tese</MenuItem>
                <MenuItem value="RESUMO">Resumo</MenuItem>
                <MenuItem value="CONGRESSO">Congresso</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
              <Button
                className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
                variant="contained"
                onClick={handleBack}
              >
                Anterior
              </Button>
              <Button
                className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
                variant="contained"
                onClick={handleNext}
              >
                Próximo
              </Button>
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid
            className="w-[90%] bg-white p-4 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl m-0"
            container
            spacing={2}
          >
            <Typography className="text-2xl font-medium">
              SIGILO E CONFIDENCIALIDADE
            </Typography>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText className="text-lg">
                  Já houve revelação para terceiros não vinculados ao NIT
                  UNITINS?
                </FormHelperText>
                <RadioGroup
                  row
                  value={revelacaoTerceiros ? "Sim" : "Não"}
                  onChange={(e) =>
                    setRevelacaoTerceiros(e.target.value === "Sim")
                  }
                >
                  <FormControlLabel
                    value="Sim"
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value="Não"
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
                {revelacaoTerceiros && (
                  <TextField
                    label="Detalhes da Revelação"
                    name="detalhesRevelacao"
                    fullWidth
                    type="text"
                  />
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText className="text-lg">
                  Está em fase de publicação em algum periódico científico,
                  congresso, tese, artigo ou resumo?
                </FormHelperText>
                <RadioGroup
                  row
                  value={fasePublicacao ? "Sim" : "Não"}
                  onChange={(e) => setFasePublicacao(e.target.value === "Sim")}
                >
                  <FormControlLabel
                    value="Sim"
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value="Não"
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
                {fasePublicacao && (
                  <TextField
                    label="Detalhes da Publicação"
                    name="detalhesPublicacao"
                    fullWidth
                    type="text"
                  />
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormHelperText className="text-lg">
                  Já foi revelada sob forma oral por meio de palestra, oficina,
                  roda de conversa e outros?
                </FormHelperText>
                <RadioGroup
                  row
                  value={revelacaoOral ? "Sim" : "Não"}
                  onChange={(e) => setRevelacaoOral(e.target.value === "Sim")}
                >
                  <FormControlLabel
                    value="Sim"
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value="Não"
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
                {revelacaoOral && (
                  <TextField
                    label="Detalhes da Revelação Oral"
                    name="detalhesRevelacaoOral"
                    fullWidth
                    type="text"
                  />
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
                variant="contained"
                onClick={handleBack}
              >
                Anterior
              </Button>
              <Button
                className="bg-azulEscuroGradient border-solid border-2 border-slate-100 text-white font-medium p-2 px-4 rounded-md mx-2"
                variant="contained"
                onClick={handleNext}
                type="submit" // Aqui você deve especificar type="submit" para enviar o formulário
              >
                Concluir
              </Button>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Grid className="w-full flex flex-col justify-center self-center items-center">
        {renderPageContent()}
      </Grid>
      <Dialog
        open={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
      >
        <DialogTitle>Confirmar Submissão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja enviar este formulário?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowConfirmationModal(false)}
            color="primary"
          >
            Cancelar
          </Button>
          <Button type="submit" color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
