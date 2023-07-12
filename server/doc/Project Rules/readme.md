Aqui está o README atualizado com a explicação do código fornecido:

# Aplicação Full Stack com Next.js e Nest.js

Este é um exemplo de uma aplicação full stack construída com Next.js no front-end e Nest.js no back-end. A aplicação demonstra a comunicação entre o front-end e o back-end através de requisições HTTP utilizando a biblioteca Axios.

## Fluxo de Funcionamento

1. No front-end, é feita uma requisição para a API utilizando a biblioteca Axios. A rota `/programa/listar` é utilizada para buscar os programas no banco de dados.

```javascript
const fetchProgramas = async () => {
  try {
    const response = await fetch('http://localhost:3333/programa/listar');
    if (response.ok) {
      const data = await response.json();
      setProgramas(data);
    } else {
      console.log('Erro ao buscar os programas:', response.status);
    }
  } catch (error) {
    console.error('Erro ao buscar os programas:', error);
  }
};

fetchProgramas();
```

2. No back-end, a rota `/programa/listar` é definida no controller `ProgramaController`. Essa rota é responsável por chamar o método `listar` do service `ProgramaService`.

```javascript
@Controller('/programa')
export class ProgramaController {
  constructor(private programaService: ProgramaService) {}

  @Get('/listar')
  getDados() {
    return this.programaService.listar();
  }
}
```

3. No service `ProgramaService`, o método `listar` chama o método `findAll` do repository `ProgramaRepository`. O repository é responsável por realizar as operações de acesso ao banco de dados, nesse caso, busca todos os programas cadastrados.

```javascript
@Injectable()
export class ProgramaService {
  constructor(private programaRepository: ProgramaRepository) {}

  async listar(): Promise<Programa[]> {
    return this.programaRepository.findAll();
  }
}
```

4. No repository `ProgramaRepository`, o método `findAll` utiliza o model `Programa` para fazer a consulta no banco de dados e retornar os programas encontrados.

```javascript
@Injectable()
export class ProgramaRepository {
  constructor(@InjectModel(Programa.name) private programa: Model<Programa>) {}

  async findAll(): Promise<Programa[]> {
    return this.programa.find().exec();
  }
}
```

5. No front-end, os programas retornados pela API são mapeados para o componente `CardProgram` e exibidos na tela.

```javascript
return (
  <div className="flex flex-wrap">
    {programas.map((programa) => (
      <CardProgram key={programa._id} programa={programa} />
    ))}
  </div>
);
```

## Executando a Aplicação

1. Clone este repositório em sua máquina local:

```shell
git clone https://github.com/seu-usuario/meu-projeto.git
```

2. Instale as dependências do front-end:

```shell
cd frontend
npm install
```

3. Instale as dependências do back-end:

```shell
cd backend
npm install
```

4. Inicie o servidor do back-end:

```shell
cd backend
npm run start
```

5. Inicie o servidor do front-end:

```shell
cd frontend
npm run dev
```

6. Acesse a aplicação em seu navegador em [http://localhost:3000](http://localhost:3000).

---