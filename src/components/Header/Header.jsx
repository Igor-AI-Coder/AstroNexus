import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ showCartIcon = false, cartItemsCount = 0 }) => {
  const [menuActive, setMenuActive] = useState(false);

  // Função para abrir o menu
  const abrirMenu = () => {
    setMenuActive(true);
    document.body.style.overflow = "hidden"; // Impede rolagem da página
  };

  // Função para fechar o menu
  const fecharMenu = () => {
    setMenuActive(false);
    document.body.style.overflow = "auto"; // Libera a rolagem da página
  };

  // Efeito para gerenciar eventos do teclado e redimensionamento
  useEffect(() => {
    // Fecha o menu ao pressionar a tecla ESC
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && menuActive) {
        fecharMenu();
      }
    };

    // Fecha o menu se a janela for redimensionada para tamanho desktop
    const handleResize = () => {
      if (window.innerWidth > 1024 && menuActive) {
        fecharMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuActive]);

  return (
    <header className={styles.astrodHeader}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logo} style={{ textDecoration: "none" }}>
          <i className="fas fa-satellite"></i>
          <span className={styles.logoText}>AstroNexus</span>
        </Link>
        <div className={styles.headerActions}>
          {/* Ícone do carrinho (apenas na página de produtos) */}
          {showCartIcon && (
            <Link to="/carrinho" className={styles.cartIcon}>
              <i className="fas fa-shopping-cart"></i>
              {cartItemsCount > 0 && (
                <span className={styles.cartBadge}>{cartItemsCount}</span>
              )}
            </Link>
          )}

          {/* Menu Hambúrguer */}
          <button
            className={`${styles.hamburgerMenu} ${
              menuActive ? styles.active : ""
            }`}
            onClick={abrirMenu}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </div>

      {/* Menu Lateral */}
      <nav className={`${styles.sideMenu} ${menuActive ? styles.active : ""}`}>
        <div className={styles.menuHeader}>
          <h3>Menu</h3>
          <button className={styles.closeMenu} onClick={fecharMenu}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <ul className={styles.menuLinks}>
          <li>
            <Link to="/" className={styles.menuLink} onClick={fecharMenu}>
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <a href="#" className={styles.menuLink} onClick={fecharMenu}>
              <i className="fas fa-user"></i>
              <span>Login</span>
            </a>
          </li>
          <li>
            <Link
              to="/produtos"
              className={styles.menuLink}
              onClick={fecharMenu}
            >
              <i className="fas fa-shopping-bag"></i>
              <span>Loja</span>
            </Link>
          </li>
          <li>
            <Link
              to="/carrinho"
              className={styles.menuLink}
              onClick={fecharMenu}
            >
              <i className="fas fa-shopping-cart"></i>
              <span>Carrinho</span>
            </Link>
          </li>
          <li>
            <a href="#" className={styles.menuLink} onClick={fecharMenu}>
              <i className="fas fa-question-circle"></i>
              <span>Quizes</span>
            </a>
          </li>
          <li>
            <Link
              to="/fatos-curiosos"
              className={styles.menuLink}
              onClick={fecharMenu}
            >
              <i className="fas fa-lightbulb"></i>
              <span>Fatos Curiosos</span>
            </Link>
          </li>
          <li>
            <Link
              to="/galeria"
              className={styles.menuLink}
              onClick={fecharMenu}
            >
              <i className="fas fa-images"></i>
              <span>Galeria</span>
            </Link>
          </li>
          <li>
            <Link
              to="/planetas"
              className={styles.menuLink}
              onClick={fecharMenu}
            >
              <i className="fas fa-globe"></i>
              <span>Planetas</span>
            </Link>
          </li>
          <li>
            <a href="#" className={styles.menuLink} onClick={fecharMenu}>
              <i className="fas fa-blog"></i>
              <span>Blog</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Overlay para fechar menu */}
      {menuActive && (
        <div
          className={`${styles.menuOverlay} ${styles.active}`}
          onClick={fecharMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;
