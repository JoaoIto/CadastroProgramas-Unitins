import ApiUtils from "@/app/Utils/Api/apiMethods";

export async function postUserLogin(user: ILoginUser): Promise<string> {
    try {
        const response = await ApiUtils.authenticate(user);

        // Se a autenticação for bem-sucedida, você pode lidar com o token ou a resposta do backend aqui.
        console.log('Token ou resposta do backend:', response);

        // Certifique-se de que o response não é undefined antes de acessar a propriedade access_token
        if (response !== undefined) {
            const token = response;
            return token;
        } else {
            // Lide com o caso em que a resposta é undefined
            throw new Error('A autenticação não retornou um token válido.');
        }
    } catch (error) {
        // Se houver um erro na autenticação, você pode lidar com isso aqui.
        console.error('Erro durante a autenticação:', error);
        throw error; // Repasse o erro para quem chamou a função
    }
}