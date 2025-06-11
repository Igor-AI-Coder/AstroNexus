// =====================================
// MODAL E FILTROS — AstroNexus Galeria
// =====================================

// Pegar elementos do modal
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeBtn = document.getElementById("modalClose");
const overlay = document.getElementById("modalOverlay");

// Função para abrir o modal com imagem, título e descrição
function openModal(src, title, desc) {
  modalImage.src = src;
  modalTitle.textContent = title;
  modalDescription.textContent = desc;
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Travar o scroll da página
}

// Função para fechar o modal
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto"; // Liberar scroll da página
}

// Abrir modal ao clicar no botão "Ver Imagem"
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".view-btn");
  if (btn) {
    e.preventDefault();
    openModal(btn.dataset.image, btn.dataset.title, btn.dataset.description);
  }
});

// Fechar modal pelo botão, overlay ou tecla ESC
closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

// =====================================
// FILTROS DA GALERIA
// =====================================

// Pegar filtros e itens da galeria
const filterTabs = document.querySelectorAll(".filter-tab");
const galleryItems = document.querySelectorAll(".gallery-item");

// Função para exibir imagens filtradas
function filterImages(category) {
  galleryItems.forEach((item) => {
    item.style.display =
      category === "todos" || item.dataset.category === category
        ? "block"
        : "none";
  });
}

// Ativar filtro ao clicar e destacar o botão ativo
filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    filterTabs.forEach((t) => t.classList.remove("active")); // Remove ativo de todos
    tab.classList.add("active"); // Ativa o clicado
    filterImages(tab.dataset.filter); // Filtra imagens
  });
});

console.log("AstroNexus Galeria carregada 🚀");
