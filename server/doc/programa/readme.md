# Documentação do Servidor de Programas

## API

A API do Servidor de Programas é responsável por receber e exibir os dados enviados pelo frontend.

## Endpoints

### Cadastro de Programa

**Descrição:** Cadastra um novo programa.

- **URL:** `/programa/cadastrar`
- **Método:** `POST`
- **Headers:** `Content-Type: application/json`
- **Corpo da Requisição:**

```json
{
  "nome": "Programa de Teste",
  "descricao": "Um programa de teste para documentação",
  "dataInicio": "2023-07-01",
  "dataFim": "2023-07-31"
}
```

## Métodos
- ``enviarDados(formData: any)``: Este método **é responsável por processar os dados** do programa recebidos pelo servidor.

### Parâmetros:

``formData (Object)``: Dados do programa a ser processado.

## Exemplo de Uso:


```tsx
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProgramaService {
  async enviarDados(formData: any) {
    // Lógica de processamento dos dados do programa
    console.log(formData);
  }
}

```

---