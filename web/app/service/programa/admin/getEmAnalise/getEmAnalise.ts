import ApiUtils from "@/app/Utils/Api/apiMethods";

export async function getProgramasEmAnalise(token: string){
    try {
        const programas = await ApiUtils.get<IPrograma[]>(`/programa/em-analise`, token);
        return programas;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        throw error;
    }
}