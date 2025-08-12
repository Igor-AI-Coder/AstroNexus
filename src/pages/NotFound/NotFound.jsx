import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="error-404-container">
      <div className="erro404">404</div>
      <div className="mensagem">Página não encontrada</div>
      <div className="motivos">
        Possíveis motivos:
        <br />
        • O endereço está incorreto
        <br />
        • A página foi removida
        <br />
        • A página ainda não foi construída
        <br />
        <br />
        Volte para a <Link to="/">página inicial</Link> e continue explorando o
        universo AstroNexus!
      </div>
    </div>
  );
};

export default NotFound;
