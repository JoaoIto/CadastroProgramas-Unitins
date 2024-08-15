import ApiUtils from "@/app/Utils/Api/apiMethods";
export const getByCPF = async (token: string, CPF: string): Promise<Partial<IAutor> | null> => {
    try {
        const response = await ApiUtils.get(`/usuario/CPF/${CPF}`, token);
        
        // Verifica se a resposta contém os campos esperados
        if (response && typeof response === 'object' && 'nome' in response && 'CPF' in response) {
            return response as Partial<IAutor>;
        } else {
            console.error("Erro ao buscar autor por CPF: response is not of type IAutor");
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar autor por CPF:", error);
        return null;
    }
};