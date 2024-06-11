import ApiUtils from "@/app/Utils/Api/apiMethods";
import { enviarArquivo } from "../post/postArquivos";

export async function putPrograma(data: FormData, id: string, token: string) {
    try {
      let fileName = "";
  
      const arquivo = data.get("nomeArquivo") as File;
      if (arquivo) {
        const response = await enviarArquivo(arquivo, token);
        console.log("Resposta do enviarArquivo:", response);
  
        if (
          typeof response === "object" &&
          response !== null &&
          "fileName" in response
        ) {
          fileName = (response as { fileName: string }).fileName;
        }
      }
  
      // Construa um objeto JSON com os dados necessários
      const requestData = {
        titulo: data.get("titulo") as string,
        descricao: data.get("descricao") as string,
        solucaoProblemaDesc: data.get("solucaoProblemaDesc") as string,
        linguagens: data.getAll("linguagens") as string[],
        descricaoMercado: data.get("descricaoMercado") as string,
        dataCriacaoPrograma: data.get("dataCriacaoPrograma") as string,
        vinculoUnitins: data.get("vinculoUnitins") === "Sim",
        fasePublicacao: data.get("fasePublicacao") as string,
        status: data.get("status") as string,
        usuarioId: data.get("usuarioId") as string,
        nomeArquivo: fileName,
      };
  
      console.log("Dados do formulário antes de enviar:", requestData);
  
      // Envie a requisição utilizando o objeto JSON construído
      const programaAtualizado = await ApiUtils.put(
        `/programa/porUsuario/${id}`,
        requestData,
        token
      );
  
      console.log(`Resposta do programa/editar/${id}:`, programaAtualizado);
    } catch (error) {
      console.error("Erro ao editar o programa:", error);
    }
  }
  