import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.error404Container}>
      <div className={styles.erro404}>404</div>
      <div className={styles.mensagem}>Página não encontrada</div>
      <div className={styles.motivos}>
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
