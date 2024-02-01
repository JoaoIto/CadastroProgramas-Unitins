import ApiUtils from "@/app/Utils/Api/apiMethods";
import {getStorageItem} from "@/app/functions/getStorageItem/getStorageItem";

export async function fetchPerfil (token: string) {
    try {
        const perfilData = await ApiUtils.get<Perfil>(
            `/auth/log-user`,
            token
        );
        return perfilData;
    } catch (error) {
        console.error("Erro ao obter o perfil:", error);
    }
};