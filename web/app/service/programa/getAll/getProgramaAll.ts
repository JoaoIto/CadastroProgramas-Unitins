import ApiUtils from "@/app/Utils/Api/apiMethods";

export async function getProgramasAll(token: string){
    try {
        const programas = await ApiUtils.get<IPrograma[]>(`/programa`, token);
        return programas;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        throw error;
    }
}