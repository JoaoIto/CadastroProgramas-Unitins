import ApiUtils from "@/app/Utils/Api/apiMethods";

export async function getLinguagensAll(token: string){
    try {
        const linguagens = await ApiUtils.get<ILinguagem[]>(`/linguagem`, token);
        return linguagens;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        throw error;
    }
}