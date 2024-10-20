import ApiUtils from "@/app/Utils/Api/apiMethods";
import { enviarArquivo } from "../post/postArquivos";

export async function putPrograma(data: Partial<IPrograma>, id: string, token: string) {
  try {
    let fileName = "";
  
    const arquivo = data.nomeArquivo as File;
    if (arquivo) {
      const response = await enviarArquivo(arquivo, token);
      console.log("Resposta do enviarArquivo:", response);
  
      if (typeof response === "object" && response !== null && "fileName" in response) {
        fileName = (response as { fileName: string }).fileName;
      }
    }
  
    // Construa um objeto JSON com os dados necessários
    const requestData = {
      titulo: data.titulo,
      descricao: data.descricao,
      solucaoProblemaDesc: data.solucaoProblemaDesc,
      linguagens: data.linguagens,
      descricaoMercado: data.descricaoMercado,
      dataCriacaoPrograma: data.dataCriacaoPrograma,
      vinculoUnitins: data.vinculoUnitins,
      fasePublicacao: data.fasePublicacao,
      status: data.status,
      usuarioId: data.usuarioId,
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
