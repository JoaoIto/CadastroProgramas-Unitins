'use client'
import ApiUtils from "@/app/Utils/Api/apiMethods";
import { enviarArquivo } from "../post/postArquivos";
//import { enviarArquivo } from "./postArquivos";

export async function putPrograma(data: IProgramaPost, id: string, token: string) {
    try {
        const response = await enviarArquivo(data.nomeArquivo, token);
        console.log('Resposta do enviarArquivo:', response);
        data.nomeArquivo = data.nomeArquivo[0]?.name || '';
        
        console.log('Dados do formulário antes de enviar:', data);

        const programaCriado = await ApiUtils.put(`/programa/porUsuario/${id}`, {
            ...data,
        }, token);

        console.log('Resposta do programa/cadastrar:', programaCriado);
    } catch (error) {
        console.error('Erro ao cadastrar o programa:', error);
    }
}