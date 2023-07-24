# ***Sistema de Cadastros***

- ### **Projeto dedicado a inciação científica do PIBIC, Universidade Estadual do Tocantins juntamente com o Ministério da Ciência e Tecnologia. Um sistema web de cadastro de projetos para programas de computadores...**

<img src=".github\img/printInicial.png"/>

## Links figma:

## [Figjam - Fluxograma](https://www.figma.com/file/HqW6H7awPQV2vcWUTlUja0/Fluxograma-Cadastro-Programas-de-Computadores---PIBIC?node-id=0%3A1&t=y9G0qPcIryB9JzH4-1)

## [ FigDessign - Design wireframe final](https://www.figma.com/file/5Lmauoi9y0gQppPdFHEU7Y/Unitins-Software-Hub?type=design&node-id=9%3A2&mode=design&t=g7I8q8xzApcHDm30-1)

## Pré-requisitos

Antes de prosseguir com a instalação, verifique se você possui os seguintes pré-requisitos instalados em seu sistema:

### Front-end

- Node.js e npm: [Download Node.js](https://nodejs.org/)

### Backend

- MongoDB: [Download MongoDB](https://www.mongodb.com/try/download/community)
- MongoDB Compass: [Download MongoDB Compass](https://www.mongodb.com/try/download/compass)
- MongoDB CLI: Consulte a documentação do MongoDB para obter instruções de instalação da linha de comando específica para o seu sistema operacional.

## Instalação

Siga os passos abaixo para configurar o projeto em seu ambiente local:

### Front-end

1. Clone este repositório para o seu computador:
   ```
   git clone https://github.com/JoaoIto/CadastroProgramas-Unitins.git
   ```

2. Navegue até o diretório do front-end:
   ```
   cd CadastroProgramas-Unitins/web
   ```

3. Instale as dependências do projeto:
   ```
   npm install
   ```

### Backend

1. Certifique-se de que o MongoDB esteja instalado e em execução em sua máquina.

2. Clone este repositório para o seu computador (caso ainda não tenha feito isso):
   ```
   git clone https://github.com/JoaoIto/CadastroProgramas-Unitins.git
   ```

3. Navegue até o diretório do backend:
   ```
   cd CadastroProgramas-Unitins/server
   ```

4. Instale as dependências do projeto:
   ```
   npm install
   ```

## Configuração do Banco de Dados

Antes de executar o projeto, é necessário configurar o banco de dados:

1. Abra o MongoDB Compass e conecte-se ao servidor local.

2. Crie um novo banco de dados chamado "cadastro_programas".

3. Dentro do banco de dados "cadastro_programas", crie duas coleções: "programas" e "usuarios" e "programa-usuario".

## Executando o projeto

Agora que você tem todas as dependências instaladas e o banco de dados configurado, siga as etapas abaixo para iniciar o front-end e o back-end:

### Front-end

1. Navegue até o diretório do front-end (caso ainda não tenha feito isso):
   ```
   cd CadastroProgramas-Unitins/frontend
   ```

2. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

3. O aplicativo estará disponível em: `http://localhost:3000`.

### Backend

1. Navegue até o diretório do backend (caso ainda não tenha feito isso):
   ```
   cd CadastroProgramas-Unitins/server
   ```

2. Inicie o servidor do NestJS:
   ```
   npm run start:dev
   ```

3. O servidor estará em execução em: `http://localhost:3333`.

### Arquivos de Teste

Aqui estão alguns arquivos que você pode baixar e usar para testar o projeto com o banco de dados:

---
