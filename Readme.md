# *****SoftwareHub***: Sistema de Gestão de Propriedade Intelectual de Programas de Computador - Unitins**

Este projeto é uma iniciativa científica e de extensão da **Universidade Estadual do Tocantins (Unitins)**,  para a criação de um **sistema web revolucionário** que visa inovar, agilizar, facilitar e digitalizar o processo de registro de programas de computador para propriedade intelectual.

Atualmente, o processo de registro é realizado manualmente, em formato físico, o que resulta em **gargalos humanos** e pode demorar **meses** até a finalização do registro junto ao **INPI (Instituto Nacional da Propriedade Industrial)**. Esta plataforma surge como uma solução que irá facilitar tanto o **usuário externo** (que deseja registrar seu software), quanto a **equipe do NIT (Núcleo de Inovação Tecnológica)** da Unitins, que gerencia esse processo. 

Com essa aplicação, é possível:
- **Acompanhar o processo de registro de forma digital e transparente**.
- **Automatizar o fluxo de trabalho da equipe do NIT**, gerenciando os documentos e facilitando a tramitação das informações.
- **Reduzir o tempo de espera** e a quantidade de papelada envolvida no processo de registro.

## **Tecnologias Utilizadas**

A plataforma utiliza uma arquitetura moderna composta por:

- **Front-end**: Desenvolvido em **Next.js**, um poderoso framework React que oferece funcionalidades como renderização híbrida e sistema de rotas integrado.
- **Back-end**: Desenvolvido em **NestJS**, um framework Node.js eficiente e extensível para construir aplicações de servidor robustas.
- **Banco de Dados**: **MongoDB**, um banco de dados NoSQL que oferece escalabilidade e flexibilidade no armazenamento dos dados dos projetos e usuários.

---

## **Links do Projeto**

- [Fluxograma do Sistema](https://www.figma.com/file/HqW6H7awPQV2vcWUTlUja0/Fluxograma-Cadastro-Programas-de-Computadores---PIBIC?node-id=0%3A1&t=y9G0qPcIryB9JzH4-1)
- [Design Final (Wireframe)](https://www.figma.com/file/5Lmauoi9y0gQppPdFHEU7Y/Unitins-Software-Hub?type=design&node-id=9%3A2&mode=design&t=g7I8q8xzApcHDm30-1)

---

## **Instalação**

### Front-end

1. Clone este repositório:
   ```bash
   git clone https://github.com/JoaoIto/CadastroProgramas-Unitins.git
   ```
   
2. Acesse o diretório do front-end:
   ```bash
   cd CadastroProgramas-Unitins/web
   ```
   
3. Instale as dependências:
   ```bash
   npm install
   npm install @mui/material @emotion/react @emotion/styled
   ```

### Back-end

1. Certifique-se de que o MongoDB esteja instalado e em execução.

2. Acesse o diretório do back-end:
   ```bash
   cd CadastroProgramas-Unitins/server
   ```

3. Instale as dependências do NestJS:
   ```bash
   npm install
   npm install @nestjs/common @nestjs/passport mongoose
   ```

---

## **Configuração do Banco de Dados**

1. Abra o MongoDB Compass e conecte-se ao servidor local.
2. Crie um novo banco de dados chamado `softwarehub`.
3. Dentro do banco de dados, crie as coleções: `programas`, `usuarios`, e `programa-usuario`.

---

## **Execução do Projeto**

### Front-end

1. Navegue até o diretório do front-end:
   ```bash
   cd CadastroProgramas-Unitins/web
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Acesse a aplicação em: `http://localhost:3000`.

### Back-end

1. Navegue até o diretório do back-end:
   ```bash
   cd CadastroProgramas-Unitins/server
   ```

2. Inicie o servidor NestJS:
   ```bash
   npm run start:dev
   ```

3. O servidor estará disponível em: `http://localhost:3333`.

---

## **Objetivos do Projeto**

O principal objetivo deste projeto é fornecer uma plataforma acessível e eficiente para o registro de programas de computador junto à Unitins e ao INPI. Através desta ferramenta, pretendemos:
- **Digitalizar** e **acelerar** o processo de registro.
- Eliminar a necessidade de trâmites em papel.
- **Simplificar a gestão de documentos** para o NIT e os usuários.
- **Acompanhar** o andamento do processo em tempo real, promovendo maior transparência.

--- 

## **Contribuição**

Se você deseja contribuir com o projeto, siga os seguintes passos:

1. Faça um fork do repositório.
2. Crie uma nova branch para sua funcionalidade (`git checkout -b feature/nova-funcionalidade`).
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie para o repositório remoto (`git push origin feature/nova-funcionalidade`).
5. Abra um pull request.

---

