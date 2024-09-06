import ApiUtils from "@/app/Utils/Api/apiMethods";

export const updatePerfil = async (idPerfil: string, perfil: Partial<Perfil>, token: string) => {
    try {
        const updatedPerfil = await ApiUtils.put(
            `/usuario/${idPerfil}`,
            perfil,
            token
        );
        return updatedPerfil;
    } catch (error) {
        console.error("Erro ao atualizar o perfil:", error);
        throw error;
    }
};
