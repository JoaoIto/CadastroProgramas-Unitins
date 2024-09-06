import { fetchPerfil } from "@/app/service/perfil/logUser";

export async function getUsuarioId(token: string) {
    try {
      const perfil = await fetchPerfil(token);
      const usuarioId = perfil?._id;
      return usuarioId;
    } catch (error) {
      console.log(error);
    }
  }