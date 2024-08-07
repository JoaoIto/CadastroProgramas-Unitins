export async function downloadFile(tipo: string, id: string, token: string) {
    const response = await fetch(`http://localhost:8080/programa/download/${tipo}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      throw new Error('Erro ao baixar o arquivo');
    }
  
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tipo}.pdf`; // Nome do arquivo para download
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  