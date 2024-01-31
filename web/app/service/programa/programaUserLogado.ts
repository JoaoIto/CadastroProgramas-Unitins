import {getStorageItem} from "@/app/functions/getStorageItem/getStorageItem";
import ApiUtils from "@/app/Utils/Api/apiMethods";

export async function getProgramasUsuario(token: string){
    try {
        const programas = await ApiUtils.get<IPrograma[]>(`/programa/porUsuario`, token);
        return programas;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        throw error;
    }
}