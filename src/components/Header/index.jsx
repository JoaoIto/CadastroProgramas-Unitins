import { header, title, subtitle} from "./app.css";

export function Header() {
  return (
    <header className={header}>
      <img
        className="banner"
        width="100%"
        src="../../governoTO-logo.jpg"
        alt=""
      />
      <h1 className={title}>Cadastro de Programas de Computadores</h1>
      <span className={subtitle}>Cadastre seu programa de computador juntamente com a universidade!</span>
    
    
    </header>
  );
}