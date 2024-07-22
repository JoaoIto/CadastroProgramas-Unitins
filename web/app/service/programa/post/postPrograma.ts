import ApiUtils from "@/app/Utils/Api/apiMethods";
import { enviarArquivo } from "./postArquivos";

export async function postPrograma(data: any, token: string) {
  try {
    let fileName = "";
    console.log(data);
    const arquivo = data.nomeArquivo as File;
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
      titulo: data.titulo,
      descricao: data.descricao,
      solucaoProblemaDesc: data.solucaoProblemaDesc,
      linguagens: data.linguagens,
      descricaoMercado: data.descricaoMercado,
      dataCriacaoPrograma: data.dataCriacaoPrograma,
      vinculoUnitins: data.vinculoUnitins,
      vinculoInstitucional: data.vinculoInstitucional,
      outrasObrasDesc: data.outrasObrasDesc,
      fonteFinanciamentoDesc: data.fonteFinanciamentoDesc,
      revelacaoDesc: data.revelacaoDesc,
      revelacaoPublicaDesc: data.revelacaoPublicaDesc,
      fasePublicacao: data.fasePublicacao,
      status: data.status,
      autores: data.autores,
      nomeArquivo: fileName,
    };
    

    console.log("Dados do formulário antes de enviar:", requestData);

    // Envie a requisição utilizando o objeto JSON construído
    const programa = await ApiUtils.post(
      `/programa/cadastrar/`,
      requestData,
      token
    );

    console.log(`Resposta do programa/cadastrar/ :`, programa);
  } catch (error) {
    console.error("Erro ao cadastrar o programa:", error);
  }
}
