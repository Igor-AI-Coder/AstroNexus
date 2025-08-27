import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ showCartIcon = false, cartItemsCount = 0 }) => {
  const [menuActive, setMenuActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

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

  // Função para controlar dropdown
  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const closeDropdown = () => {
    setDropdownActive(false);
  };

  // Efeito para gerenciar eventos do teclado e redimensionamento
  useEffect(() => {
    // Fecha o menu ao pressionar a tecla ESC
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && menuActive) {
        fecharMenu();
      }
      if (event.key === "Escape" && dropdownActive) {
        closeDropdown();
      }
    };

    // Fecha o menu se a janela for redimensionada para tamanho desktop
    const handleResize = () => {
      if (window.innerWidth > 1024 && menuActive) {
        fecharMenu();
      }
    };

    // Fecha dropdown ao clicar fora
    const handleClickOutside = (event) => {
      if (dropdownActive && !event.target.closest(`.${styles.navItem}`)) {
        closeDropdown();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuActive, dropdownActive]);

  return (
    <header className={styles.astrodHeader}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logo} style={{ textDecoration: "none" }}>
          <i className="fas fa-satellite"></i>
          <span className={styles.logoText}>AstroNexus</span>
        </Link>

        {/* Navegação Desktop */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/produtos" className={styles.navLink}>
                Loja
              </Link>
            </li>
            <li
              className={`${styles.navItem} ${styles.dropdownContainer}`}
              onMouseEnter={() => setDropdownActive(true)}
              onMouseLeave={() => setDropdownActive(false)}
            >
              <button className={styles.navLink} onClick={toggleDropdown}>
                Páginas
                <i className="fas fa-chevron-down"></i>
              </button>
              <div
                className={`${styles.dropdown} ${
                  dropdownActive ? styles.active : ""
                }`}
              >
                <Link
                  to="/quizes"
                  className={styles.dropdownLink}
                  onClick={closeDropdown}
                >
                  <i className="fas fa-question-circle"></i>
                  Quizes
                </Link>
                <Link
                  to="/fatos-curiosos"
                  className={styles.dropdownLink}
                  onClick={closeDropdown}
                >
                  <i className="fas fa-lightbulb"></i>
                  Fatos Curiosos
                </Link>
                <Link
                  to="/galeria"
                  className={styles.dropdownLink}
                  onClick={closeDropdown}
                >
                  <i className="fas fa-images"></i>
                  Galeria
                </Link>
                <Link
                  to="/planetas"
                  className={styles.dropdownLink}
                  onClick={closeDropdown}
                >
                  <i className="fas fa-globe"></i>
                  Planetas
                </Link>
                <Link
                  to="/blog"
                  className={styles.dropdownLink}
                  onClick={closeDropdown}
                >
                  <i className="fas fa-blog"></i>
                  Blog
                </Link>
                <Link
                  to="/carrinho"
                  className={styles.dropdownLink}
                  onClick={closeDropdown}
                >
                  <i className="fas fa-shopping-cart"></i>
                  Carrinho
                </Link>
                <Link
                  to="/contato"
                  className={styles.dropdownLink}
                  onClick={closeDropdown}
                >
                  <i className="fas fa-envelope"></i>
                  Contato
                </Link>
              </div>
            </li>
            <li className={styles.navItem}>
              <Link to="/contato" className={styles.navLink}>
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.headerActions}>
          {/* Ícone de Login (sempre visível) */}
          <Link to="/login" className={styles.loginIcon}>
            <i className="fas fa-user"></i>
          </Link>

          {/* Ícone do carrinho (apenas na página de produtos) */}
          {showCartIcon && (
            <Link to="/carrinho" className={styles.cartIcon}>
              <i className="fas fa-shopping-cart"></i>
              {cartItemsCount > 0 && (
                <span className={styles.cartBadge}>{cartItemsCount}</span>
              )}
            </Link>
          )}

          {/* Menu Hambúrguer (apenas mobile/tablet) */}
          <button
            className={`${styles.hamburgerMenu} ${
              menuActive ? styles.active : ""
            }`}
            onClick={abrirMenu}
            aria-label="Abrir menu"
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
            <Link to="/quizes" className={styles.menuLink} onClick={fecharMenu}>
              <i className="fas fa-question-circle"></i>
              <span>Quizes</span>
            </Link>
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
            <Link to="/blog" className={styles.menuLink} onClick={fecharMenu}>
              <i className="fas fa-blog"></i>
              <span>Blog</span>
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
            <Link
              to="/contato"
              className={styles.menuLink}
              onClick={fecharMenu}
            >
              <i className="fas fa-envelope"></i>
              <span>Contato</span>
            </Link>
          </li>
          <li>
            <Link to="/login" className={styles.menuLink} onClick={fecharMenu}>
              <i className="fas fa-user"></i>
              <span>Login</span>
            </Link>
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
