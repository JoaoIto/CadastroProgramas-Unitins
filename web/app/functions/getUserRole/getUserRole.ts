import ApiUtils from "@/app/Utils/Api/apiMethods";

export const getUserRole = async (token: string): Promise<string> => {
  try {
    if (!token) {
      throw new Error("Token de autenticação não encontrado.");
    }

    const response: IPayloadUser | undefined = await ApiUtils.get<IPayloadUser>(
      "/auth/log-user/payload",
      token
    );

    if (!response) {
      throw new Error("Response from API is undefined.");
    }

    const userData: IPayloadUser = response;
    console.log(userData);

    // Verifica se userData tem a propriedade perfil
    if (!userData || typeof userData.perfil !== "string") {
      throw new Error("Dados do usuário inválidos.");
    }

    // Retorna o perfil do usuário (assumindo que o perfil pode ser 'ADMIN' ou 'USER')
    return userData.perfil === "admin" ? "admin" : "user";
  } catch (error) {
    console.error("Erro ao obter perfil do usuário:", error);
    throw error;
  }
};
