import ApiUtils from "@/app/Utils/Api/apiMethods";

export async function enviarJustificativa(token: string, justificativa: string, programaId: string) {
  try {
    const response = await ApiUtils.put(`/programa/${programaId}/justificativa`, { justificativa }, token);
    
    if (response) {
      console.log('Justificativa enviada com sucesso');
      return response;
    } else {
      console.error('Erro ao enviar justificativa');
      throw new Error('Erro ao enviar justificativa');
    }
  } catch (error) {
    console.error('Erro ao enviar justificativa:', error);
    throw error;
  }
}
