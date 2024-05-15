import ApiUtils from "@/app/Utils/Api/apiMethods";

export async function getProgramaById(token: string, id: string){
    try {
        const programa = await ApiUtils.get<IPrograma>(`/programa/porUsuario/${id}`, token);
        console.log("Esse é o programa encontrado: ", programa);
        
        return programa;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        throw error;
    }
}