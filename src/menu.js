// ========================================
// MENU HAMBÚRGUER
// ========================================

// Elementos do menu
const hamburgerMenu = document.getElementById("hamburgerMenu");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");
const menuOverlay = document.getElementById("menuOverlay");
const menuLinks = document.querySelectorAll(".menu-link");

// Abre o menu lateral
const openMenu = () => {
  sideMenu.classList.add("active");
  menuOverlay.classList.add("active");
  hamburgerMenu.classList.add("active");
  document.body.style.overflow = "hidden";
};

// Fecha o menu lateral
const closeMenuFunction = () => {
  sideMenu.classList.remove("active");
  menuOverlay.classList.remove("active");
  hamburgerMenu.classList.remove("active");
  document.body.style.overflow = "auto";
};

// Eventos de clique
hamburgerMenu.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeMenuFunction);
menuOverlay.addEventListener("click", closeMenuFunction);

// Fecha o menu ao pressionar ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sideMenu.classList.contains("active"))
    closeMenuFunction();
});

// Fecha o menu ao clicar em um link
menuLinks.forEach((link) =>
  link.addEventListener("click", () => setTimeout(closeMenuFunction, 100))
);

// Fecha o menu se a tela for redimensionada para desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024 && sideMenu.classList.contains("active"))
    closeMenuFunction();
});

// Fecha o menu ao clicar fora dele
document.addEventListener("click", (e) => {
  if (
    sideMenu.classList.contains("active") &&
    !sideMenu.contains(e.target) &&
    !hamburgerMenu.contains(e.target)
  ) {
    closeMenuFunction();
  }
});
