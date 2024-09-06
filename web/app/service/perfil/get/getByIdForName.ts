import ApiUtils from "@/app/Utils/Api/apiMethods";

export const getByIdForName = async (token: string, id: string): Promise<Perfil | null> => {
    try {
        const response = await ApiUtils.get(`/usuario/consultaAutor/${id}`, token);
        if (typeof response) {
            return response as Perfil;
        } else {
            console.error("Erro ao buscar autor por id:", response);
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar autor por id:", error);
        return null;
    }
};