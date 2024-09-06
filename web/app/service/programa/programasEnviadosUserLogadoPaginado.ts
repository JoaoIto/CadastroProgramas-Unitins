import ApiUtils from "@/app/Utils/Api/apiMethods";

export async function getProgramasEnviadosUsuarioPaginado(token: string, page: number, limit: number): Promise<IPaginatedProgramasResponse> {
    try {
        const response = await ApiUtils.getPaginate<IPaginatedProgramasResponse>(`/programa/enviados/usuario`, token, { page, limit });
        if(response)
            return response;
    } catch (error) {
        console.error('Erro ao buscar os dados paginados:', error);
        throw error;
    }
    return Promise.reject(new Error('Unexpected error'));
}