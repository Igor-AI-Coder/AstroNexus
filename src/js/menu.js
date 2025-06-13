// ========================================
// MENU HAMBÚRGUER
// ========================================

// Elementos relacionados ao menu
const hamburgerMenu = document.getElementById("hamburgerMenu"); // Ícone de hambúrguer
const sideMenu = document.getElementById("sideMenu"); // Menu lateral
const closeMenuButton = document.getElementById("closeMenu"); // Botão de fechar o menu
const menuOverlay = document.getElementById("menuOverlay"); // Fundo escurecido ao abrir o menu
const menuLinks = document.querySelectorAll(".menu-link"); // Links dentro do menu lateral

// Função para abrir o menu
const abrirMenu = () => {
  sideMenu.classList.add("active"); // Exibe o menu lateral
  menuOverlay.classList.add("active"); // Exibe o fundo escurecido
  hamburgerMenu.classList.add("active"); // Anima o ícone de hambúrguer
  document.body.style.overflow = "hidden"; // Impede rolagem da página
};

// Função para fechar o menu
const fecharMenu = () => {
  sideMenu.classList.remove("active"); // Esconde o menu lateral
  menuOverlay.classList.remove("active"); // Remove o fundo escurecido
  hamburgerMenu.classList.remove("active"); // Restaura o ícone de hambúrguer
  document.body.style.overflow = "auto"; // Libera a rolagem da página
};

// Eventos de clique para abrir e fechar o menu
hamburgerMenu.addEventListener("click", abrirMenu);
closeMenuButton.addEventListener("click", fecharMenu);
menuOverlay.addEventListener("click", fecharMenu);

// Fecha o menu ao pressionar a tecla ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sideMenu.classList.contains("active")) {
    fecharMenu();
  }
});

// Fecha o menu se a janela for redimensionada para tamanho desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024 && sideMenu.classList.contains("active")) {
    fecharMenu();
  }
});

// Fecha o menu ao clicar fora dele (exceto se clicar no menu ou no botão hambúrguer)
document.addEventListener("click", (event) => {
  const clicouForaDoMenu =
    sideMenu.classList.contains("active") &&
    !sideMenu.contains(event.target) &&
    !hamburgerMenu.contains(event.target);

  if (clicouForaDoMenu) {
    fecharMenu();
  }
});
