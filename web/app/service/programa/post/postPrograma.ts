import ApiUtils from "@/app/Utils/Api/apiMethods";
import { enviarArquivo } from "./postArquivos";

export async function postPrograma(data: IProgramaPost, headers: Record<string, string>, token: string) {
    try {
        const response = await enviarArquivo(data.nomeArquivo, token);
        console.log('Resposta do enviarArquivo:', response);
        data.nomeArquivo = data.nomeArquivo[0]?.name || '';
        console.log('Dados do formulário antes de enviar:', data);

        const programaCriado = await ApiUtils.post('/programa/cadastrar', {
            ...data,
            status: status,
        }, token, headers);

        console.log('Resposta do programa/cadastrar:', programaCriado);
    } catch (error) {
        console.error('Erro ao cadastrar o programa:', error);
    }
}