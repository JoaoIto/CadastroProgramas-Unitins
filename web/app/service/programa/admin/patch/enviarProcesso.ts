import ApiUtils from "@/app/Utils/Api/apiMethods";

export async function enviarProcesso(token: string, data: FormData, programaId: string) {
  try {
    const response = await ApiUtils.patch(`/programa/processo/${programaId}`, data, token);
    
    if (response.ok) {
      console.log('Formulário enviado com sucesso');
      return response;
    } else {
      console.error('Erro ao enviar formulário');
      throw new Error('Erro ao enviar formulário');
    }
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    throw error;
  }
}
