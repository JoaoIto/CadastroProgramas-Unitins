import ApiUtils from "@/app/Utils/Api/apiMethods";

export async function enviarArquivo(arquivo: File, token: string) {
    const formData = new FormData();
    formData.append('file', arquivo);

    console.log(formData.get('file'));
    
    try {
        const response = await ApiUtils.patch('/programa/uploads', formData, token);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
        throw error;
    }
}
