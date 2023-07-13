# Documentação do Next.js Router

O Next.js Router é uma ferramenta poderosa que permite lidar com a navegação entre páginas e a passagem de parâmetros na URL no framework Next.js. Nesta documentação, explicaremos como importar e utilizar o Next.js Router, juntamente com exemplos de código.

## Importação

Para utilizar o Next.js Router, você precisa importar o hook `useRouter` do pacote `next/router`. Veja o exemplo abaixo:

```jsx
import { useRouter } from 'next/router';
```

## Uso básico

O hook `useRouter` retorna uma instância do router que pode ser usada para acessar informações da rota atual. Veja um exemplo básico de como utilizar o Next.js Router:

```jsx
import { useRouter } from 'next/router';

const MinhaPagina = () => {
  const router = useRouter();

  // Acessando a rota atual
  const rotaAtual = router.pathname;

  // Redirecionando para outra página
  const handleClick = () => {
    router.push('/outra-pagina');
  };

  return (
    <div>
      <p>Rota atual: {rotaAtual}</p>
      <button onClick={handleClick}>Ir para outra página</button>
    </div>
  );
};

export default MinhaPagina;
```

No exemplo acima, utilizamos o hook `useRouter` para obter a instância do router. A partir disso, podemos acessar a propriedade `pathname` para obter a rota atual e a função `push` para redirecionar para outra página.

## Passagem de parâmetros na URL

O Next.js Router também oferece suporte para a passagem de parâmetros na URL. Esses parâmetros podem ser acessados através do objeto `query` do router. Veja o exemplo abaixo:

```jsx
import { useRouter } from 'next/router';

const MinhaPagina = () => {
  const router = useRouter();

  // Acessando parâmetros da URL
  const { id } = router.query;

  return (
    <div>
      <p>ID: {id}</p>
    </div>
  );
};

export default MinhaPagina;
```

No exemplo acima, estamos acessando o parâmetro `id` da URL através do objeto `query`. Se a URL for `/minha-pagina?id=123`, o valor de `id` será `123`.

## Exemplos de uso

Aqui estão alguns exemplos de uso comuns do Next.js Router:

### Redirecionamento condicional

```jsx
import { useRouter } from 'next/router';

const MinhaPagina = () => {
  const router = useRouter();

  useEffect(() => {
    if (condicao) {
      router.push('/outra-pagina');
    }
  }, [router]);

  return (
    <div>
      {/* Conteúdo da página */}
    </div>
  );
};

export default MinhaPagina;
```

Neste exemplo, utilizamos o hook `useRouter` juntamente com o `useEffect` para realizar um redirecionamento condicional. Se a condição for verdadeira, a página será redirecionada para `/outra-pagina`.

### Passagem de parâmetros na URL

```jsx
import { useRouter } from 'next/router';

const MinhaPagina = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/outra-pagina?id=${id}`);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Ir para outra página com ID</button>
    </div>
  );
};

export default MinhaPagina;
```

Neste exemplo, utilizamos o `router.push` para redirecionar para outra página e passar o parâmetro `id` na URL. Isso permite que a página seguinte acesse o valor de `id` através do objeto `query` do router.

## Mais informações

Para obter mais informações sobre o Next.js Router e ver outros exemplos, consulte a documentação oficial do Next.js:

- [Next.js Router](https://nextjs.org/docs/api-reference/next/router)
- [API Reference](https://nextjs.org/docs/api-reference/next/router)
- [Exemplos de uso](https://nextjs.org/docs/routing/dynamic-routes)

---