import ApiUtils from "@/app/Utils/Api/apiMethods";
export const getByMatricula = async (token: string, matricula: string): Promise<Partial<IAutor> | null> => {
    try {
        const response = await ApiUtils.get(`/usuario/matricula/${matricula}`, token);
        
        // Verifica se a resposta contém os campos esperados
        if (response && typeof response === 'object' && 'nome' in response && 'matricula' in response) {
            return response as Partial<IAutor>;
        } else {
            console.error("Erro ao buscar autor por matrícula: response is not of type IAutor");
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar autor por matrícula:", error);
        return null;
    }
};