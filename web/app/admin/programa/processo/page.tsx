"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  Button,
  Typography,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import ExplanationModal from "@/app/components/Modal";
import FileUploadField from "@/app/components/FileUploadField";
import { getStorageItem } from "@/app/functions/storage/getStorageItem/getStorageItem";
import { enviarProcesso } from "@/app/service/programa/admin/patch/enviarProcesso";
import { tokenService } from "@/app/Utils/Cookies/tokenStorage";
import AlertMessage from "@/app/components/AlertMessage";
import { getProgramaById } from "@/app/service/programa/getById/getById";

interface FormData {
  boleto: File | null;
  veracidade: File | null;
  certificadoRegistro: File | null;
  protocoloINPI: File | null;
  hash: string;
  hashType: string;
}

const ProcessoPage: React.FC = () => {
  const token = getStorageItem();
  const programaId = tokenService.getProgramaId();
  const [alertOpen, setAlertOpen] = useState(false);
  const [programa, setPrograma] = useState<IPrograma | null>(null);
const [alertMessage, setAlertMessage] = useState<string | null>(null);
const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");


  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      boleto: null,
      veracidade: null,
      certificadoRegistro: null,
      protocoloINPI: null,
      hash: "",
      hashType: "",
    },
  });

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(true);

  const [fileNames, setFileNames] = useState({
    boleto: "",
    veracidade: "",
    certificadoRegistro: "",
    protocoloINPI: "",
  });

  const pages = [
    "Boleto",
    "Documento de Veracidade",
    "Certificado de Registro",
    "Protocolo INPI",
    "Código Hash",
  ];

  const hashTypes = ["SHA-256", "MD5", "SHA-1"];

  const modalPages = [
    "Bem-vindo à página de Processo de Solicitação. Aqui você irá completar os passos necessários para conseguir aprovar uma solicitação de registro.",
    "Certifique-se de preencher todos os campos obrigatórios e anexar os documentos necessários em cada etapa.",
    "Ao completar todas as etapas, você poderá enviar seus documentos de devolução para o aluno submetedor.",
    "Todas as etapas, mesmo que não todas, assim que submetidas, são avisadas ao usuário e registradas por data!",
    "Preste atenção ao preencher todas as etapas! Clique em 'Confirmar' para prosseguir.",
  ];

  useEffect(() => {
    const fetchPrograma = async () => {
      try {
        const programaData = await getProgramaById(token, programaId ?? "");
        if (programaData) {
          setPrograma(programaData);
          setFileNames({
            boleto: programaData.boletoPath ? "Boleto já enviado" : "",
            veracidade: programaData.veracidadePath ? "Veracidade já enviado" : "",
            certificadoRegistro: programaData.certificadoRegistroPath
              ? "Certificado já enviado"
              : "",
            protocoloINPI: programaData.protocoloINPIPath
              ? "Protocolo INPI já enviado"
              : "",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar o programa", error);
      }
    };

    fetchPrograma();
  }, [token, programaId]);

  const onSubmit = async (data: FormData) => {
    const programa = await getProgramaById(token, programaId ?? "");
    let etapaConcluida = false;

    const formData = new FormData();

    if (data.boleto && !programa?.boletoPath) {
      etapaConcluida = true;
      formData.append("boleto", data.boleto);
    }
    if (data.veracidade && !programa?.veracidadePath) {
      etapaConcluida = true;
      formData.append("veracidade", data.veracidade);
    }
    if (data.certificadoRegistro && !programa?.certificadoRegistroPath){
      etapaConcluida = true;
      formData.append("certificadoRegistro", data.certificadoRegistro);
    }
    if (data.protocoloINPI && !programa?.protocoloINPIPath){
      etapaConcluida = true;
      formData.append("protocoloINPI", data.protocoloINPI);
    }
    formData.append("hash", data.hash);
    formData.append("hashType", data.hashType);
  
    try {
      const response = await enviarProcesso(token, formData, programaId ?? "");
      setAlertSeverity("success");
      setAlertMessage("Documento enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar formulário", error);
      setAlertSeverity("error");
      setAlertMessage("Erro ao enviar o documento.");
    } finally {
      setAlertOpen(true);
    }
  };  

  const handlePageSelect = (event: SelectChangeEvent<number>) => {
    const selectedPage = event.target.value as number;
    setCurrentPage(selectedPage);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleFileChange = (key: keyof FormData) => (file: File | null) => {
    setValue(key, file);
    setFileNames((prev) => ({ ...prev, [key]: file ? file.name : "" }));
  };

  const handleFileClear = (key: keyof FormData) => () => {
    setValue(key, null);
    setFileNames((prev) => ({ ...prev, [key]: "" }));
  };

  const renderPageContent = () => {
    switch (pages[currentPage]) {
      case "Boleto":
        return (
          <div>
            <Typography variant="body2">
              Aqui deve ser inserido o boleto de pagamento da solicitação no
              INPI:
            </Typography>
            <Typography className="text-vermelho">
              Insira o documento no campo abaixo:
            </Typography>
            <FileUploadField
              label="Boleto"
              fileName={fileNames.boleto}
              onFileChange={handleFileChange("boleto")}
              onClear={handleFileClear("boleto")}
            />
          </div>
        );
      case "Documento de Veracidade":
        return (
          <div>
            <Typography variant="body2">
              Aqui deve ser inserido o Documento de Veracidade da solicitação:
            </Typography>
            <Typography className="text-vermelho">
              Insira o documento no campo abaixo:
            </Typography>
            <FileUploadField
              label="Documento de Veracidade"
              fileName={fileNames.veracidade}
              onFileChange={handleFileChange("veracidade")}
              onClear={handleFileClear("veracidade")}
            />
          </div>
        );
      case "Certificado de Registro":
        return (
          <div>
            <Typography variant="body2">
              Aqui deve ser inserido o documento do Certificado de Registro INPI:
            </Typography>
            <Typography className="text-vermelho">
              Insira o documento no campo abaixo:
            </Typography>
            <FileUploadField
              label="Certificado de Registro"
              fileName={fileNames.certificadoRegistro}
              onFileChange={handleFileChange("certificadoRegistro")}
              onClear={handleFileClear("certificadoRegistro")}
            />
          </div>
        );
      case "Protocolo INPI":
        return (
          <div>
            <Typography variant="body2">
              Aqui deve ser inserido o documento do Protocolo INPI:
            </Typography>
            <Typography className="text-vermelho">
              Insira o documento no campo abaixo:
            </Typography>
            <FileUploadField
              label="Protocolo INPI"
              fileName={fileNames.protocoloINPI}
              onFileChange={handleFileChange("protocoloINPI")}
              onClear={handleFileClear("protocoloINPI")}
            />
          </div>
        );
      case "Código Hash":
        return (
          <div>
            <Typography variant="body2">Insira o código hash gerado:</Typography>
            <Typography className="text-vermelho">
              Insira o código no campo abaixo:
            </Typography>
            <Controller
              name="hash"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Código Hash" fullWidth />
              )}
            />
            <Typography variant="body2" className="mt-4">
              Selecione o tipo de hash:
            </Typography>
            <Controller
              name="hashType"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Tipo de Hash" fullWidth>
                  {hashTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FileUploadField
              label="Hash"
              fileName={pr.boleto}
              onFileChange={handleFileChange("boleto")}
              onClear={handleFileClear("boleto")}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-grow bg-sky-200 p-8">
      <Typography variant="h4" className="mb-4">
        Processo de Solicitação
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 border-4 border-l-[10px] border-t-[10px] border-l-blue-300 border-t-blue-300 rounded-xl"
      >
        <Typography variant="h6" className="mb-4">
          {pages[currentPage]}
        </Typography>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Select value={currentPage} onChange={handlePageSelect} fullWidth>
              {pages.map((page, index) => (
                <MenuItem key={page} value={index}>
                  {page}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            {renderPageContent()}
          </Grid>
          <Grid item container justifyContent="space-between">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Voltar
            </Button>
            <Button
  variant="contained"
  className="bg-azulEscuro"
  type="button"
  onClick={handleSubmit(onSubmit)}  // Adicionar envio ao avançar
>
  {currentPage === pages.length - 1 ? "Salvar" : "Salvar"}
</Button>

          </Grid>
        </Grid>
      </form>
      <AlertMessage
  open={alertOpen}
  message={alertMessage}
  severity={alertSeverity}
  onClose={() => setAlertOpen(false)}
/>

      <ExplanationModal
        open={openModal}
        onClose={handleCloseModal}
        pages={modalPages}
      />
    </div>
  );
};

export default ProcessoPage;
