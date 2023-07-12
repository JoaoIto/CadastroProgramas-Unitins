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
# ProgramaController


````tsx
import { Controller, Post, Body, Get } from '@nestjs/common';

@Controller('/programa')
export class ProgramaController {
  private formData: any = null;

  @Post('/cadastrar')
  create(@Body() formData: any) {
    this.formData = formData;
    console.log(formData);
    return { message: 'Dados recebidos com sucesso!' };
  }

  @Get('/listar')
  getDados() {
    return this.formData;
  }
}

````
## Endpoints

### `POST /programa/cadastrar`

Este endpoint é usado para cadastrar um novo programa. Recebe um objeto contendo os dados do formulário a serem cadastrados.

Exemplo de requisição:
```
POST /programa/cadastrar

{
  "nomeCompleto": "João Silva",
  "rg": 1234567,
  "cpf": 12345678910,
  "dataNascimento": "1990-01-01",
  "estadoCivil": "solteiro"
}
```

Exemplo de resposta:
```
{
  "message": "Dados recebidos com sucesso!"
}
```

### `GET /programa/listar`

Este endpoint é usado para obter a lista de programas cadastrados. Retorna os dados do formulário enviado anteriormente.

Exemplo de requisição:
```
GET /programa/listar
```

Exemplo de resposta:
```
{
  "nomeCompleto": "João Silva",
  "rg": 1234567,
  "cpf": 12345678910,
  "dataNascimento": "1990-01-01",
  "estadoCivil": "solteiro"
}
```

---
