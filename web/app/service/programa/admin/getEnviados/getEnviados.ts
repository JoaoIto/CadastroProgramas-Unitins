import ApiUtils from "@/app/Utils/Api/apiMethods";

export async function getProgramasEnviados(token: string){
    try {
        const programas = await ApiUtils.get<IPrograma[]>(`/programa/enviados`, token);
        return programas;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        throw error;
    }
}