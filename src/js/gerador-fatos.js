// Importa a função que fornece os fatos astronômicos
import { obterFatos } from "./fatos-astronomicos.js";

// Variáveis globais para controlar a aplicação
let categoriaAtual = "todos"; // Categoria inicial
let fatosUsados = new Set(); // Armazena os fatos já exibidos para evitar repetição

// Variáveis para acessar elementos do HTML
let factText;
let generateBtn;
let categoryBtns;

// Quando a página for carregada, executa a função inicializar
document.addEventListener("DOMContentLoaded", inicializar);

// Função que configura os elementos e os eventos da página
function inicializar() {
  // Captura os elementos do HTML
  factText = document.getElementById("factText");
  generateBtn = document.getElementById("generateBtn");
  categoryBtns = document.querySelectorAll(".category-btn");

  // Quando clicar no botão de gerar fato, chama a função gerarFato
  generateBtn.addEventListener("click", gerarFato);

  // Quando clicar em um botão de categoria, muda a categoria
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => mudarCategoria(btn.dataset.category));
  });

  console.log("🌟 Gerador de fatos inicializado!");
}

// Função para alterar a categoria de fatos
function mudarCategoria(categoria) {
  categoriaAtual = categoria; // Atualiza a categoria atual
  fatosUsados.clear(); // Limpa os fatos usados para começar de novo

  // Atualiza visualmente os botões, destacando o selecionado
  categoryBtns.forEach((btn) => {
    const isAtiva = btn.dataset.category === categoria;
    btn.classList.toggle("active", isAtiva); // se encontrar a categoria, adiciona a classe 'active', se false, remove
  });

  // Mensagem informando que a categoria mudou
  factText.textContent = "Categoria alterada! Clique para gerar um fato.";
  factText.classList.add("placeholder");
}

// Função para gerar um fato aleatório da categoria atual
function gerarFato() {
  // Busca os fatos disponíveis da categoria selecionada
  const fatosDisponiveis = obterFatos(categoriaAtual);

  // Se não houver fatos, exibe uma mensagem e encerra
  if (fatosDisponiveis.length === 0) {
    factText.textContent = "Nenhum fato disponível para esta categoria.";
    factText.classList.add("placeholder");
    return;
  }

  // Se todos os fatos já foram usados, reinicia a lista
  if (fatosUsados.size >= fatosDisponiveis.length) {
    fatosUsados.clear();
  }

  // Escolhe aleatoriamente um fato ainda não usado
  let fato;
  do {
    const indiceAleatorio = Math.floor(Math.random() * fatosDisponiveis.length);
    fato = fatosDisponiveis[indiceAleatorio];
  } while (fatosUsados.has(fato)); // Repete enquanto o fato já tiver sido usado

  // Marca o fato como usado
  fatosUsados.add(fato);

  // Exibe o fato na tela
  exibirFato(fato);
}

// Função para exibir um fato com uma pequena animação de opacidade
function exibirFato(fato) {
  factText.style.opacity = "0"; // Esconde o texto atual

  // Após 300 milissegundos, troca o texto e exibe novamente
  setTimeout(() => {
    factText.textContent = fato;
    factText.classList.remove("placeholder"); // Remove estilo de placeholder
    factText.style.opacity = "1";
  }, 300);
}
