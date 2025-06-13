// Gera dinamicamente o header do AstroNexus
function renderAstroNexusHeader() {
  const headerHTML = `
  <header class="astrod-header">
    <div class="header-container">
      <a href="/AstroNexus/" class="logo" style="text-decoration: none;">
        <i class="fas fa-satellite"></i>
        <span class="logo-text">AstroNexus</span>
      </a>
      <div class="header-actions">
        <!-- Menu Hambúrguer -->
        <button class="hamburger-menu" id="hamburgerMenu">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>
    <!-- Menu Lateral -->
    <nav class="side-menu" id="sideMenu">
      <div class="menu-header">
        <h3>Menu</h3>
        <button class="close-menu" id="closeMenu">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <ul class="menu-links">
        <li>
          <a href="/AstroNexus/" class="menu-link">
            <i class="fas fa-home"></i>
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/AstroNexus/src/pages/404.html" class="menu-link">
            <i class="fas fa-user"></i>
            <span>Login</span>
          </a>
        </li>
        <li>
          <a href="/AstroNexus/src/pages/produtos.html" class="menu-link">
            <i class="fas fa-shopping-bag"></i>
            <span>Loja</span>
          </a>
        </li>
        <li>
          <a href="/AstroNexus/src/pages/carrinho.html" class="menu-link">
            <i class="fas fa-shopping-cart"></i>
            <span>Carrinho</span>
          </a>
        </li>
        <li>
          <a href="/AstroNexus/src/pages/404.html" class="menu-link">
            <i class="fas fa-question-circle"></i>
            <span>Quizes</span>
          </a>
        </li>
        <li>
          <a href="/AstroNexus/src/pages/fatos-curiosos.html" class="menu-link">
            <i class="fas fa-lightbulb"></i>
            <span>Fatos Curiosos</span>
          </a>
        </li>
        <li>
          <a href="/AstroNexus/src/pages/galeria.html" class="menu-link">
            <i class="fas fa-images"></i>
            <span>Galeria</span>
          </a>
        </li>
        <li>
          <a href="/AstroNexus/src/pages/planetas.html" class="menu-link">
            <i class="fas fa-globe"></i>
            <span>Planetas</span>
          </a>
        </li>
        <li>
          <a href="/AstroNexus/src/pages/404.html" class="menu-link">
            <i class="fas fa-blog"></i>
            <span>Blog</span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- Overlay para fechar menu -->
    <div class="menu-overlay" id="menuOverlay"></div>
  </header>
  `;

  // Insere o header no topo do body
  document.body.insertAdjacentHTML("afterbegin", headerHTML);
}

// Basta chamar esta função no seu JS principal:
renderAstroNexusHeader();
