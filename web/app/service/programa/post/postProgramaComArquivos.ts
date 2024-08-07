export async function postProgramaComArquivos(data: any, token: string) {
  try {
      // Envia a requisição utilizando o FormData diretamente com fetch
      const response = await fetch('http://localhost:8080/programa/cadastrar', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
          body: data,
      });

      if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Requisição enviada com sucesso", result);
  } catch (error) {
      console.error("Erro ao cadastrar o programa:", error);
  }
}
