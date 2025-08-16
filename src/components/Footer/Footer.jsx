import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <h3>AstroNexus</h3>
            <p>Conectando você com as maravilhas do universo.</p>
            <div className={styles.footerSocial}>
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4>Links Rápidos</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/produtos">Loja</Link>
                </li>
                <li>
                  <Link to="/galeria">Galeria</Link>
                </li>
                <li>
                  <Link to="/fatos-curiosos">Fatos Curiosos</Link>
                </li>
                <li>
                  <Link to="/planetas">Planetas</Link>
                </li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Suporte</h4>
              <ul>
                <li>
                  <Link to="/contato">Contato</Link>
                </li>
                <li>
                  <Link to="/carrinho">Carrinho</Link>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
                <li>
                  <a href="#ajuda">Ajuda</a>
                </li>
                <li>
                  <a href="#privacidade">Privacidade</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 AstroNexus. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
