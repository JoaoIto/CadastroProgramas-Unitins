import ApiUtils from "@/app/Utils/Api/apiMethods";

export async function enviarArquivo(arquivo: File, token: string) {
    const file = arquivo
    
    try {
        const response = await ApiUtils.patch('/programa/uploads', file, token);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
        throw error;
    }
}
