import ApiUtils from "@/app/Utils/Api/apiMethods";

// Função para criar um novo autor
export const postNovoAutor = async (token: string, autor: IAutor): Promise<IAutor> => {
    try {
      const response = await ApiUtils.post('/usuario/cadastrar/autor', autor, token);
      return response as unknown as IAutor;
    } catch (error) {
      console.error("Erro ao criar novo autor:", error);
      throw new Error("Falha ao criar novo autor.");
    }
  };
  