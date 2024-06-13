"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Button from "@mui/material/Button";
import { z } from "zod";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
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
  const formRef = useRef<HTMLFormElement | null>(null);
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
  // Estado para armazenar os dados do formulário
  const [formInputs, setFormInputs] = useState<Partial<IPrograma>>({
    titulo: "",
    descricao: "",
    solucaoProblemaDesc: "",
    linguagens: linguagens,
    modificacaoTecnologicaDesc: null,
    descricaoMercado: "",
    dataCriacaoPrograma: dataCriacaoPrograma,
    dataCriacao: "", // Precisa ser definido
    vinculoUnitins: true,
    vinculoInstitucional: null,
    fasePublicacao: "",
    status: "ENVIADO", // Definido como ENVIADO por padrão
    nomeArquivo: null,
  });

  const handleNext = () => {
    if (currentPage >= 3) {
      setShowConfirmationModal(true);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    fieldName: string
  ) => {
    const { value } = event.target;

    if (fieldName === "vinculoUnitins") {
      const newValue = value === "Sim"; // Convertendo para booleano apenas para vinculoUnitins

      setFormInputs((prevInputs) => ({
        ...prevInputs,
        [fieldName]: newValue,
      }));
    } else {
      // Para outros campos, como fasePublicacao, salvar o valor como string
      setFormInputs((prevInputs) => ({
        ...prevInputs,
        [fieldName]: value as string,
      }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    console.log(file);

    if (file) {
      setFormInputs((prevInputs) => ({
        ...prevInputs,
        nomeArquivo: file,
      }));
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

  const handleSubmit = async () => {
    const data: FormData = {
      titulo: formInputs.titulo as string,
      descricao: formInputs.descricao as string,
      solucaoProblemaDesc: formInputs.solucaoProblemaDesc as string,
      linguagens: linguagens,
      descricaoMercado: formInputs.descricaoMercado as string,
      dataCriacaoPrograma: dataCriacaoPrograma
        ? dataCriacaoPrograma.toISOString()
        : "", // Converte para ISO String se definido
      vinculoUnitins:
        formInputs.vinculoUnitins !== undefined
          ? formInputs.vinculoUnitins
          : true,
      fasePublicacao: formInputs.fasePublicacao as string,
      status: "ENVIADO",
      nomeArquivo: formInputs.nomeArquivo as File,
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  name="nomeArquivo"
                  onChange={handleFileChange}
                />
                {formInputs.nomeArquivo && (
                  <p>
                    Nome do arquivo selecionado: {formInputs.nomeArquivo.name}
                  </p>
                )}
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
            <Typography className="text-2xl font-medium">
              VÍNCULO E PUBLICAÇÃO
            </Typography>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="vinculoUnitins">
                  6. Vínculo com a Unitins
                </InputLabel>
                <Select
                  name="vinculoUnitins"
                  id="vinculoUnitins"
                  value={formInputs.vinculoUnitins}
                  onChange={(event) =>
                    handleSelectChange(event, "vinculoUnitins")
                  }
                >
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
                <Select
                  required
                  name="fasePublicacao"
                  id="fasePublicacao"
                  onChange={(event) =>
                    handleSelectChange(event, "fasePublicacao")
                  }
                >
                  <MenuItem value="ARTIGO">ARTIGO</MenuItem>
                  <MenuItem value="TESE">TESE</MenuItem>
                  <MenuItem value="RESUMO">RESUMO</MenuItem>
                  <MenuItem value="CONGRESSO">CONGRESSO</MenuItem>
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
    <form ref={formRef} onSubmit={handleSubmit} className="h-full">
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
            <p>
              <strong>Nome:</strong> {formInputs.titulo}
            </p>
            <p>
              <strong>Data Criação Programa:</strong>{" "}
              {dataCriacaoPrograma?.toISOString()}
            </p>
            <p>
              <strong>Linguagens:</strong>{" "}
              {
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
              }
            </p>
            <p>
              <strong>Vínculo Unitins:</strong>{" "}
              {formInputs.vinculoUnitins ? "Sim" : "Não"}
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowConfirmationModal(false)}
            color="primary"
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit} type="submit" color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
