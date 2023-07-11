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

## ProgramaController

## Resposta de Sucesso

Ao chamar a rota `/cadastrar` usando o método POST, a API retornará uma mensagem de sucesso com o seguinte formato:

```
{ "message": "Dados recebidos com sucesso!" }
```

## Listagem de Programas

Para obter a lista de programas cadastrados, você pode chamar a rota `/listar` usando o método GET. A API retornará os dados do formulário enviados anteriormente. Exemplo de resposta:

```
{ "nomeCompleto": "João Silva", "rg": 1234567, "cpf": 12345678910, "dataNascimento": "1990-01-01", "estadoCivil": "solteiro" }
```

## Corpo da Resposta

O corpo da resposta contém os dados enviados no formulário. Os campos incluem:

- `nomeCompleto`: Nome completo do solicitante.
- `rg`: Número do RG.
- `cpf`: Número do CPF.
- `dataNascimento`: Data de nascimento no formato AAAA-MM-DD.
- `estadoCivil`: Estado civil do solicitante.

## Serviço de Programas

O serviço de programas possui os seguintes métodos:

### Enviar Dados

O método `enviarDados` é responsável por receber e processar os dados do formulário.

```typescript
async enviarDados(formData: any) {
  console.log(formData);
  // Realize as operações necessárias com os dados recebidos
}
```

Espero que essa tradução em Markdown seja útil para você!