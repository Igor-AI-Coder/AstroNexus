import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

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
    <header className="astrod-header">
      <div className="header-container">
        <Link to="/" className="logo" style={{ textDecoration: "none" }}>
          <i className="fas fa-satellite"></i>
          <span className="logo-text">AstroNexus</span>
        </Link>
        <div className="header-actions">
          {/* Ícone do carrinho (apenas na página de produtos) */}
          {showCartIcon && (
            <Link to="/carrinho" className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </Link>
          )}

          {/* Menu Hambúrguer */}
          <button
            className={`hamburger-menu ${menuActive ? "active" : ""}`}
            onClick={abrirMenu}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Menu Lateral */}
      <nav className={`side-menu ${menuActive ? "active" : ""}`}>
        <div className="menu-header">
          <h3>Menu</h3>
          <button className="close-menu" onClick={fecharMenu}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <ul className="menu-links">
          <li>
            <Link to="/" className="menu-link" onClick={fecharMenu}>
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <a href="#" className="menu-link" onClick={fecharMenu}>
              <i className="fas fa-user"></i>
              <span>Login</span>
            </a>
          </li>
          <li>
            <Link to="/produtos" className="menu-link" onClick={fecharMenu}>
              <i className="fas fa-shopping-bag"></i>
              <span>Loja</span>
            </Link>
          </li>
          <li>
            <Link to="/carrinho" className="menu-link" onClick={fecharMenu}>
              <i className="fas fa-shopping-cart"></i>
              <span>Carrinho</span>
            </Link>
          </li>
          <li>
            <a href="#" className="menu-link" onClick={fecharMenu}>
              <i className="fas fa-question-circle"></i>
              <span>Quizes</span>
            </a>
          </li>
          <li>
            <Link
              to="/fatos-curiosos"
              className="menu-link"
              onClick={fecharMenu}
            >
              <i className="fas fa-lightbulb"></i>
              <span>Fatos Curiosos</span>
            </Link>
          </li>
          <li>
            <Link to="/galeria" className="menu-link" onClick={fecharMenu}>
              <i className="fas fa-images"></i>
              <span>Galeria</span>
            </Link>
          </li>
          <li>
            <Link to="/planetas" className="menu-link" onClick={fecharMenu}>
              <i className="fas fa-globe"></i>
              <span>Planetas</span>
            </Link>
          </li>
          <li>
            <a href="#" className="menu-link" onClick={fecharMenu}>
              <i className="fas fa-blog"></i>
              <span>Blog</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Overlay para fechar menu */}
      {menuActive && <div className="menu-overlay" onClick={fecharMenu}></div>}
    </header>
  );
};

export default Header;
