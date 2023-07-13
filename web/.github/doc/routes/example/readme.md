## Uso do Next.js Router nos exemplos anteriores

### 1. EditarSolicitacao

No componente `EditarSolicitacao`, o Next.js Router é utilizado para obter o valor do parâmetro `uuid` presente na URL. Ele é obtido através do hook `useSearchParams`. Veja o trecho de código relevante:

```jsx
import { useRouter, useSearchParams } from 'next/router';

const EditarSolicitacao = () => {
  const router = useRouter();
  const { get } = useSearchParams();
  const uuid = get('uuid');

  // Restante do código...

};
```

Através do `useSearchParams`, obtemos o valor do parâmetro `uuid` presente na URL. Esse valor é utilizado posteriormente no método `fetchProgramaData` para buscar os dados correspondentes ao programa com o UUID especificado.

### 2. DashboardPage

No componente `DashboardPage`, o Next.js Router não é utilizado diretamente. No entanto, o parâmetro `uuid` é passado para o componente `ButtonLinkPage` através da prop `uuid`. Veja o trecho de código relevante:

```jsx
import { useRouter, useSearchParams } from 'next/router';
import ButtonLinkPage from '../components/ButtonLinkPage/ButtonLinkPage';

const DashboardPage = () => {
  // Restante do código...

  return (
    <div className="flex h-screen">
      {/* Restante do código... */}
      
      {/* Componente ButtonLinkPage */}
      <ButtonLinkPage uuid={uuid} href="/programa/cadastrar">Nova solicitação +</ButtonLinkPage>

      {/* Restante do código... */}
    </div>
  );
};
```

Nesse exemplo, o valor de `uuid` é passado como prop para o componente `ButtonLinkPage`, que o utiliza para gerar a URL correta para a página de edição do programa.

### 3. CardProgram

No componente `CardProgram`, o Next.js Router é utilizado no método `handleEditClick` para redirecionar para a página de edição do programa com o UUID específico. Veja o trecho de código relevante:

```jsx
import { useRouter } from 'next/router';

export const CardProgram: React.FC<CardProgramProps> = ({ programa }) => {
  const router = useRouter();

  const handleEditClick = (uuid: string) => {
    router.push(`/programa/editar?uuid=${uuid}`);
  };

  // Restante do código...

};
```

Ao clicar no botão "Editar" do card, o método `handleEditClick` é acionado e utiliza o Next.js Router para redirecionar o usuário para a página de edição do programa com o UUID específico, passando-o como parâmetro na URL.

Esses são exemplos de como o Next.js Router foi utilizado nos componentes e páginas fornecidos. Ele permite o gerenciamento da navegação entre páginas e a passagem de parâmetros através da URL, tornando a construção de aplicativos Next.js mais dinâmica e interativa.