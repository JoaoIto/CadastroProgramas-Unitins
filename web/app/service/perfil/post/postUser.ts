import ApiUtils from "@/app/Utils/Api/apiMethods";

export const postNovoAutor = async (token: string, autor: IAutor): Promise<IAutor | IExistentAutor> => {
  try {
    const response: IExistentAutor | IAutor = await ApiUtils.post('/usuario/cadastrar/autor', autor, token);

    // Logar a resposta para depuração
    console.log("Resposta da API:", response);

    if (response && typeof response === 'object') {
      if ('existingUsuarioId' in response) {
        // Resposta do tipo IExistentAutor
        console.log("Autor já existente identificado:", response);
        return response as IExistentAutor;
      } 
      if ('_id' in response) {
        // Resposta do tipo IAutor
        console.log("Novo autor criado:", response);
        return response as IAutor;
      }
    }

    throw new Error("A resposta da API não corresponde a nenhum dos tipos esperados.");
  } catch (error: any) {
    console.error("Erro ao criar novo autor:", error);
    throw error;
  }
};
