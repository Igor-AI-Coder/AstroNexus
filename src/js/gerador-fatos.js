// ===============================================
// GERADOR DE FATOS ASTRONÔMICOS — AstroNexus
// ===============================================

// Importa a função que retorna os fatos por categoria
import { obterFatos } from "./fatos-astronomicos.js";

// Variáveis globais de controle
let categoriaAtual = "todos"; // Categoria padrão
let fatosUsados = new Set(); // Controla os fatos já exibidos

// Elementos da interface
let textoFato; // Elemento onde o fato aparece
let botaoGerar; // Botão para gerar novo fato
let botoesCategoria; // Botões de filtro de categoria

// Executa quando a página estiver carregada
document.addEventListener("DOMContentLoaded", inicializar);

// Configura os elementos e eventos da página
function inicializar() {
  // Captura os elementos HTML
  textoFato = document.getElementById("factText");
  botaoGerar = document.getElementById("generateBtn");
  botoesCategoria = document.querySelectorAll(".category-btn");

  // Clica no botão de gerar fato → chama gerarFato()
  botaoGerar.addEventListener("click", gerarFato);

  // Clica em um botão de categoria → chama mudarCategoria()
  botoesCategoria.forEach((botao) => {
    botao.addEventListener("click", () =>
      mudarCategoria(botao.dataset.category)
    );
  });

  console.log("🌟 Gerador de Fatos Astronômicos pronto!");
}

// Altera a categoria atual e reseta os fatos usados
function mudarCategoria(categoria) {
  categoriaAtual = categoria;
  fatosUsados.clear(); // Limpa os fatos já exibidos

  // Atualiza visualmente o botão ativo
  botoesCategoria.forEach((botao) => {
    const ativo = botao.dataset.category === categoria;
    botao.classList.toggle("active", ativo);
  });

  // Atualiza texto inicial após mudar categoria
  textoFato.textContent = "Categoria alterada! Clique para gerar um fato.";
  textoFato.classList.add("placeholder");
}

// Gera e exibe um fato aleatório da categoria atual
function gerarFato() {
  const fatosDisponiveis = obterFatos(categoriaAtual);

  // Se não houver fatos disponíveis
  if (fatosDisponiveis.length === 0) {
    textoFato.textContent = "Nenhum fato disponível para esta categoria.";
    textoFato.classList.add("placeholder");
    return;
  }

  // Se todos os fatos já foram exibidos, reinicia
  if (fatosUsados.size >= fatosDisponiveis.length) {
    fatosUsados.clear();
  }

  // Seleciona um fato aleatório que ainda não foi exibido
  let fatoSelecionado;
  do {
    const indice = Math.floor(Math.random() * fatosDisponiveis.length);
    fatoSelecionado = fatosDisponiveis[indice];
  } while (fatosUsados.has(fatoSelecionado));

  // Marca o fato como usado e exibe na tela
  fatosUsados.add(fatoSelecionado);
  exibirFato(fatoSelecionado);
}

// Exibe um fato com efeito de transição de opacidade
function exibirFato(fato) {
  textoFato.style.opacity = "0"; // Esconde o texto atual

  // Troca o texto após 300ms e reaparece
  setTimeout(() => {
    textoFato.textContent = fato;
    textoFato.classList.remove("placeholder");
    textoFato.style.opacity = "1";
  }, 300);
}
