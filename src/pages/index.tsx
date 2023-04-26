export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col items-center p-6">
      <div id="texts" className="h-1/5 w-3/5 text-center">
        <h1 className="text-4xl">Cadastro de Programas de Computadores</h1>
        <p>
          Este é o serviço de cadastro e consulta para a propriedade de
          programas de computadores! Para você que precisa cadastrar sua
          propriedade de software aqui em nome da universidade.
        </p>
      </div>

      <div id="btns" className="h-40 flex flex-col justify-around">
        <button className="h-16 w-40 text-white bg-blue-800 rounded-md border-2 border-solid border-zinc-700">
          CADASTRAR PROPRIEDADE
        </button>
        <button className="h-16 w-40 text-white bg-blue-800 rounded-md border-2 border-solid border-zinc-700">
          CONSULTAR PROPRIEDADE
        </button>
      </div>
    </main>
  );
}
