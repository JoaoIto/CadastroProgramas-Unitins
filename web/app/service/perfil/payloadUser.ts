import ApiUtils from "@/app/Utils/Api/apiMethods";

export async function fetchPayload (token: string) {
    try {
        const perfilData = await ApiUtils.get<Partial<Perfil>>(
            `/auth/log-user/payload`,
            token
        );
        return perfilData;
    } catch (error) {
        console.error("Erro ao obter o perfil:", error);
    }
};