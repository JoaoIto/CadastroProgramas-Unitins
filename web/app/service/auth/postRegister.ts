import { NovoUsuario } from "@/app/auth/cadastro/page";
import ApiUtils from "@/app/Utils/Api/apiMethods";
import { setStorageItem } from "@/app/functions/storage/setStorageItem/setStorageItem";
import { tokenService } from "@/app/Utils/Cookies/tokenStorage";

export async function postUserCadastro(data: NovoUsuario): Promise<string> {
    try {
        const response: IResponseToken | undefined = await ApiUtils.postLogin('http://localhost:8080/auth/cadastro', data);
        console.log('Resposta do backend:', response);

        // Certifique-se de que a resposta não é undefined antes de acessar a propriedade access_token
        if (response !== undefined) {
            const token = response.access_token;
            tokenService.save(token); // Armazena o token nos cookies
            return token;
        } else {
            // Lide com o caso em que a resposta é undefined
            throw new Error('O cadastro não retornou um token válido.');
        }
    } catch (error) {
        console.error('Erro durante o cadastro:', error);
        throw error; // Repasse o erro para quem chamou a função
    }
}
