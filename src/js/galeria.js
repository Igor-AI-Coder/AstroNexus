// =====================================
// MODAL — AstroNexus Galeria
// =====================================

// Seleciona os elementos do modal
const modal = document.getElementById("imageModal"); // Container do modal
const modalImage = document.getElementById("modalImage"); // Imagem exibida no modal
const modalTitle = document.getElementById("modalTitle"); // Título da imagem
const modalDescription = document.getElementById("modalDescription"); // Descrição da imagem
const closeButton = document.getElementById("modalClose"); // Botão para fechar
const modalOverlay = document.getElementById("modalOverlay"); // Fundo escurecido

// Abre o modal com a imagem, título e descrição informados
function abrirModal(src, titulo, descricao) {
  modalImage.src = src;
  modalTitle.textContent = titulo;
  modalDescription.textContent = descricao;
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Impede rolagem da página enquanto o modal está aberto
}

// Fecha o modal e libera o scroll da página
function fecharModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Evento para abrir o modal ao clicar em um botão de imagem
document.addEventListener("click", (event) => {
  const botaoImagem = event.target.closest(".view-btn");
  if (botaoImagem) {
    event.preventDefault();
    abrirModal(
      botaoImagem.dataset.image,
      botaoImagem.dataset.title,
      botaoImagem.dataset.description
    );
  }
});

// Eventos para fechar o modal
closeButton.addEventListener("click", fecharModal);
modalOverlay.addEventListener("click", fecharModal);

// Fecha o modal ao pressionar a tecla ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("active")) {
    fecharModal();
  }
});

// =====================================
// FILTROS DA GALERIA
// =====================================

// Seleciona os botões de filtro e os itens da galeria
const botoesFiltro = document.querySelectorAll(".filter-tab");
const itensGaleria = document.querySelectorAll(".gallery-item");

// Mostra as imagens filtradas conforme a categoria selecionada
function filtrarImagens(categoria) {
  itensGaleria.forEach((item) => {
    item.style.display =
      categoria === "todos" || item.dataset.category === categoria
        ? "block"
        : "none";
  });
}

// Adiciona evento de clique nos filtros
botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    // Remove a classe 'active' de todos os botões
    botoesFiltro.forEach((b) => b.classList.remove("active"));
    // Adiciona 'active' ao botão clicado
    botao.classList.add("active");
    // Filtra as imagens da galeria pela categoria selecionada
    filtrarImagens(botao.dataset.filter);
  });
});

console.log("AstroNexus Galeria carregada 🚀");
