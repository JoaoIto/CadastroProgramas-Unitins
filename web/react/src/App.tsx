export default function Home() {
  return (
    <>
    <img src="../src/assets/img/governoTO-logo.jpg" alt="" />
    <main className="h-screen w-screen font-inter flex flex-col items-center p-6">
      <div id="texts" className="h-1/6 w-3/5 text-center flex flex-col justify-around">
        <h1 style={{textShadow: '2px 2px 2px rgb(30 64 175)'}} className="text-4xl font-bold">Cadastro de Programas de Computadores</h1>
        <p>
          Este é o serviço de cadastro e consulta para a propriedade de
          programas de computadores! Para você que precisa cadastrar sua
          propriedade de software aqui em nome da universidade.
        </p>
      </div>

      <div id="btns" className="h-40 flex flex-col justify-around">
       
        <button className="h-16 w-40 text-white font-bold bg-blue-800 rounded-md border-2 border-solid border-zinc-700">
          CADASTRAR PROPRIEDADE
        </button>
        
        
        <button className="h-16 w-40 text-white font-bold bg-blue-800 rounded-md border-2 border-solid border-zinc-700">
          CONSULTAR PROPRIEDADE
        </button>
        
      </div>
    </main>
    </>
  );
}
