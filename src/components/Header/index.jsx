import {title, center} from "./app.css"

export function Header() {
  return (
    <header>
      <img
        className="banner"
        height="250px"
        width="100%"
        src="../../governoTO-logo.jpg"
        alt=""
      />
      <h1 className={title}>Cadastro de Programas de Computadores</h1>
    </header>
  );
}