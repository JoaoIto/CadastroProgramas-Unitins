interface EsqueciSenha {
    cpf: string;
    novaSenha: string;
}

export async function redefinirSenha(data: EsqueciSenha) {
    const response = await fetch('http://localhost:8080/auth/esqueci-senha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cpf: data.cpf,
        senha: data.novaSenha,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Erro ao redefinir senha');
    }
  
    const result = await response.json();
    return result;
  }
  