import ApiUtils from "@/app/Utils/Api/apiMethods";

export async function getProgramasEmAjustesPaginado(token: string, page: number, limit: number){
    try {
        const response = await ApiUtils.getPaginate<IPaginatedProgramasResponse>(`/programa/em-ajustes`, token, { page, limit });
        if(response)
            return response;
    } catch (error) {
        console.error('Erro ao buscar os dados paginados:', error);
        throw error;
    }
}