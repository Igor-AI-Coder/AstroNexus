import React, { useRef } from "react";

// Se estiver usando Font Awesome por CDN, mantenha o link em index.html.
// Se usar pacote npm (ex: @fortawesome/react-fontawesome), adapte os ícones.

export default function AstroNexusHeader() {
  const sideMenuRef = useRef(null);
  const hamburgerMenuRef = useRef(null);
  const menuOverlayRef = useRef(null);

  // Função para abrir o menu
  const abrirMenu = () => {
    sideMenuRef.current.classList.add("active");
    menuOverlayRef.current.classList.add("active");
    hamburgerMenuRef.current.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  // Função para fechar o menu
  const fecharMenu = () => {
    sideMenuRef.current.classList.remove("active");
    menuOverlayRef.current.classList.remove("active");
    hamburgerMenuRef.current.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  // Fecha o menu ao pressionar ESC
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "Escape" &&
        sideMenuRef.current.classList.contains("active")
      ) {
        fecharMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Fecha o menu ao redimensionar para desktop
    const handleResize = () => {
      if (
        window.innerWidth > 1024 &&
        sideMenuRef.current.classList.contains("active")
      ) {
        fecharMenu();
      }
    };
    window.addEventListener("resize", handleResize);

    // Fecha se clicar fora
    const handleClick = (event) => {
      if (
        sideMenuRef.current.classList.contains("active") &&
        !sideMenuRef.current.contains(event.target) &&
        !hamburgerMenuRef.current.contains(event.target)
      ) {
        fecharMenu();
      }
    };
    document.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  // Fecha ao clicar em um link do menu
  const handleMenuLinkClick = () => {
    fecharMenu();
  };

  return (
    <header className="astrod-header">
      <div className="header-container">
        <a
          href="/AstroNexus/"
          className="logo"
          style={{ textDecoration: "none" }}
        >
          <i className="fas fa-satellite"></i>
          <span className="logo-text">AstroNexus</span>
        </a>
        <div className="header-actions">
          <button
            className="hamburger-menu"
            ref={hamburgerMenuRef}
            id="hamburgerMenu"
            onClick={abrirMenu}
            aria-label="Abrir menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
      <nav className="side-menu" ref={sideMenuRef} id="sideMenu">
        <div className="menu-header">
          <h3>Menu</h3>
          <button
            className="close-menu"
            id="closeMenu"
            aria-label="Fechar menu"
            onClick={fecharMenu}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <ul className="menu-links">
          <li>
            <a
              href="/AstroNexus/"
              className="menu-link"
              onClick={handleMenuLinkClick}
            >
              <i className="fas fa-home"></i>
              <span>Home</span>
            </a>
          </li>
          <li>
            <a
              href="/AstroNexus/src/pages/404.html"
              className="menu-link"
              onClick={handleMenuLinkClick}
            >
              <i className="fas fa-user"></i>
              <span>Login</span>
            </a>
          </li>
          <li>
            <a
              href="/AstroNexus/src/pages/produtos.html"
              className="menu-link"
              onClick={handleMenuLinkClick}
            >
              <i className="fas fa-shopping-bag"></i>
              <span>Loja</span>
            </a>
          </li>
          <li>
            <a
              href="/AstroNexus/src/pages/carrinho.html"
              className="menu-link"
              onClick={handleMenuLinkClick}
            >
              <i className="fas fa-shopping-cart"></i>
              <span>Carrinho</span>
            </a>
          </li>
          <li>
            <a
              href="/AstroNexus/src/pages/404.html"
              className="menu-link"
              onClick={handleMenuLinkClick}
            >
              <i className="fas fa-question-circle"></i>
              <span>Quizes</span>
            </a>
          </li>
          <li>
            <a
              href="/AstroNexus/src/pages/fatos-curiosos.html"
              className="menu-link"
              onClick={handleMenuLinkClick}
            >
              <i className="fas fa-lightbulb"></i>
              <span>Fatos Curiosos</span>
            </a>
          </li>
          <li>
            <a
              href="/AstroNexus/src/pages/galeria.html"
              className="menu-link"
              onClick={handleMenuLinkClick}
            >
              <i className="fas fa-images"></i>
              <span>Galeria</span>
            </a>
          </li>
          <li>
            <a
              href="/AstroNexus/src/pages/planetas.html"
              className="menu-link"
              onClick={handleMenuLinkClick}
            >
              <i className="fas fa-globe"></i>
              <span>Planetas</span>
            </a>
          </li>
          <li>
            <a
              href="/AstroNexus/src/pages/404.html"
              className="menu-link"
              onClick={handleMenuLinkClick}
            >
              <i className="fas fa-blog"></i>
              <span>Blog</span>
            </a>
          </li>
        </ul>
      </nav>
      {/* Overlay para fechar menu */}
      <div
        className="menu-overlay"
        ref={menuOverlayRef}
        id="menuOverlay"
        onClick={fecharMenu}
      ></div>
    </header>
  );
}
