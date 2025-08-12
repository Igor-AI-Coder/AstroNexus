import React, { useState, useEffect } from "react";
import { obterFatos } from "./fatos-astronomicos";
import Header from "../../components/Header/Header";
import "./FatosCuriosos.css";

const FatosCuriosos = () => {
  const [categoriaAtual, setCategoriaAtual] = useState("todos");
  const [fatosUsados, setFatosUsados] = useState(new Set());
  const [fatoAtual, setFatoAtual] = useState({
    texto:
      'Clique em "Gerar Fato" para descobrir algo incrível sobre o universo!',
    isPlaceholder: true,
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const categorias = [
    { id: "todos", nome: "Todos" },
    { id: "planetas", nome: "Planetas" },
    { id: "estrelas", nome: "Estrelas" },
    { id: "curiosidades", nome: "Curiosidades" },
  ];

  // Função para mudar categoria
  const mudarCategoria = (categoria) => {
    setCategoriaAtual(categoria);
    setFatosUsados(new Set());
    setFatoAtual({
      texto: "Categoria alterada! Clique para gerar um fato.",
      isPlaceholder: true,
    });
  };

  // Função para gerar fato
  const gerarFato = () => {
    const fatosDisponiveis = obterFatos(categoriaAtual);

    if (fatosDisponiveis.length === 0) {
      setFatoAtual({
        texto: "Nenhum fato disponível para esta categoria.",
        isPlaceholder: true,
      });
      return;
    }

    // Se todos os fatos já foram exibidos, reinicia
    let novosUsados = fatosUsados;
    if (fatosUsados.size >= fatosDisponiveis.length) {
      novosUsados = new Set();
      setFatosUsados(novosUsados);
    }

    // Seleciona um fato aleatório que ainda não foi exibido
    let fatoSelecionado;
    do {
      const indice = Math.floor(Math.random() * fatosDisponiveis.length);
      fatoSelecionado = fatosDisponiveis[indice];
    } while (novosUsados.has(fatoSelecionado));

    // Marca o fato como usado
    novosUsados.add(fatoSelecionado);
    setFatosUsados(new Set(novosUsados));

    // Exibe o fato com animação
    exibirFato(fatoSelecionado);
  };

  // Função para exibir fato com animação
  const exibirFato = (fato) => {
    setIsAnimating(true);

    setTimeout(() => {
      setFatoAtual({
        texto: fato,
        isPlaceholder: false,
      });
      setIsAnimating(false);
    }, 300);
  };

  return (
    <>
      <Header />
      <div className="facts-container">
        <div className="facts-card">
          <div className="facts-header">
            <h1 className="facts-title">Fatos Astronômicos</h1>
            <p className="facts-subtitle">
              Descubra curiosidades fascinantes sobre o universo
            </p>
          </div>

          {/* Categorias */}
          <div className="categories">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                className={`category-btn ${
                  categoriaAtual === categoria.id ? "active" : ""
                }`}
                onClick={() => mudarCategoria(categoria.id)}
                data-category={categoria.id}
              >
                {categoria.nome}
              </button>
            ))}
          </div>

          {/* Display do Fato */}
          <div className="fact-display">
            <p
              className={`fact-text ${
                fatoAtual.isPlaceholder ? "placeholder" : ""
              }`}
              style={{ opacity: isAnimating ? 0 : 1 }}
            >
              {fatoAtual.texto}
            </p>
          </div>

          {/* Botão */}
          <div className="generate-button-container">
            <button className="generate-btn" onClick={gerarFato}>
              <i className="fas fa-magic"></i> Gerar Fato
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FatosCuriosos;
