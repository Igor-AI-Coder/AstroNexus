import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Galeria.css";
const Galeria = () => {
  const [filtroAtivo, setFiltroAtivo] = useState("todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [imagemModal, setImagemModal] = useState({
    src: "",
    titulo: "",
    descricao: "",
  });

  // Dados das imagens da galeria
  const imagens = [
    {
      id: 1,
      src: "/img/galeria-01.jpg",
      titulo: "Galáxia NGC1300",
      subtitulo: "Galáxia espiral barrada",
      descricao:
        "Uma magnífica galáxia espiral barrada localizada na constelação de Eridanus",
      categoria: "galaxias",
      classe: "",
    },
    {
      id: 2,
      src: "/img/galeria-02.jpg",
      titulo: "Andrômeda M31",
      subtitulo: "Nossa galáxia vizinha",
      descricao:
        "A galáxia mais próxima da Via Láctea, também conhecida como M31",
      categoria: "galaxias",
      classe: "",
    },
    {
      id: 3,
      src: "/img/galeria-03.jpeg",
      titulo: "Cabeça de Cavalo",
      subtitulo: "Nebulosa escura icônica",
      descricao:
        "Uma das nebulosas escuras mais famosas do céu, localizada na constelação de Órion",
      categoria: "nebulosas",
      classe: "tall",
    },
    {
      id: 4,
      src: "/img/galeria-04.jfif",
      titulo: "Nebulosa do Caranguejo",
      subtitulo: "Remanescente de supernova",
      descricao:
        "Resultado da explosão de uma supernova observada pelos chineses em 1054 d.C.",
      categoria: "nebulosas",
      classe: "",
    },
    {
      id: 5,
      src: "/img/galeria-05.webp",
      titulo: "Nebulosa Borboleta",
      subtitulo: "NGC 6302",
      descricao:
        "Uma nebulosa planetária com formato característico de borboleta",
      categoria: "nebulosas",
      classe: "wide",
    },
    {
      id: 6,
      src: "/img/galeria-06.jpg",
      titulo: "Saturno",
      subtitulo: "O Senhor dos Anéis",
      descricao: "O magnífico planeta dos anéis capturado pela sonda Cassini",
      categoria: "planetas",
      classe: "",
    },
    {
      id: 7,
      src: "/img/galeria-07.jpg",
      titulo: "Júpiter",
      subtitulo: "Gigante gasoso",
      descricao:
        "O maior planeta do sistema solar com sua Grande Mancha Vermelha",
      categoria: "planetas",
      classe: "",
    },
    {
      id: 8,
      src: "/img/galeria-09.jpg",
      titulo: "V838 Monocerotis",
      subtitulo: "Estrela variável",
      descricao:
        "Uma estrela variável luminosa azul que expandiu dramaticamente em 2002",
      categoria: "estrelas",
      classe: "",
    },
    {
      id: 9,
      src: "/img/galeria-10.jpg",
      titulo: "Eta Carinae",
      subtitulo: "Supergigante azul",
      descricao: "Uma das estrelas mais massivas e luminosas conhecidas",
      categoria: "estrelas",
      classe: "tall",
    },
    {
      id: 10,
      src: "/img/galeria-11.jpg",
      titulo: "Terra",
      subtitulo: "Nosso planeta azul",
      descricao: "Nossa casa no cosmos, vista do espaço",
      categoria: "sistema-solar",
      classe: "wide",
    },
    {
      id: 11,
      src: "/img/galeria-12.jpg",
      titulo: "Lua",
      subtitulo: "Nosso satélite natural",
      descricao: "Nosso satélite natural em toda sua glória",
      categoria: "sistema-solar",
      classe: "",
    },
    {
      id: 12,
      src: "/img/galeria-13.jpg",
      titulo: "Ultra Deep Field",
      subtitulo: "Olhando para o passado",
      descricao: "Uma das imagens mais profundas do universo já capturadas",
      categoria: "deep-space",
      classe: "",
    },
    {
      id: 13,
      src: "/img/galeria-14.webp",
      titulo: "Extreme Deep Field",
      subtitulo: "O universo primitivo",
      descricao:
        "A imagem mais profunda do universo, mostrando galáxias de bilhões de anos atrás",
      categoria: "deep-space",
      classe: "large",
    },
    {
      id: 14,
      src: "/img/galeria-15.jpg",
      titulo: "Pilares da Criação",
      subtitulo: "Nebulosa da Águia",
      descricao:
        "Estruturas icônicas na Nebulosa da Águia onde nascem novas estrelas",
      categoria: "nebulosas",
      classe: "",
    },
    {
      id: 15,
      src: "/img/galeria-16.webp",
      titulo: "Marte",
      subtitulo: "O planeta vermelho",
      descricao: "O planeta vermelho capturado pelo Telescópio Hubble",
      categoria: "planetas",
      classe: "",
    },
  ];

  // Categorias de filtro
  const categorias = [
    { id: "todos", nome: "Todas", icon: "fas fa-th" },
    { id: "galaxias", nome: "Galáxias", icon: "fas fa-circle" },
    { id: "nebulosas", nome: "Nebulosas", icon: "fas fa-cloud" },
    { id: "planetas", nome: "Planetas", icon: "fas fa-globe" },
    { id: "estrelas", nome: "Estrelas", icon: "fas fa-star" },
    { id: "sistema-solar", nome: "Sistema Solar", icon: "fas fa-sun" },
    { id: "deep-space", nome: "Deep Space", icon: "fas fa-satellite" },
  ];

  // Filtrar imagens
  const imagensFiltradas =
    filtroAtivo === "todos"
      ? imagens
      : imagens.filter((img) => img.categoria === filtroAtivo);

  // Abrir modal
  const abrirModal = (src, titulo, descricao) => {
    setImagemModal({ src, titulo, descricao });
    setModalAberto(true);
    document.body.style.overflow = "hidden";
  };

  // Fechar modal
  const fecharModal = () => {
    setModalAberto(false);
    document.body.style.overflow = "auto";
  };

  // Efeito para fechar modal com ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && modalAberto) {
        fecharModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalAberto]);

  return (
    <>
      {/* Efeito de espaço do fundo */}
      <div id="space">
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
      </div>

      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-images"></i>
              <span>Galeria Cósmica</span>
            </div>
            <h1 className="hero-title">
              <span className="title-main">Galeria</span>
              <span className="title-subtitle">
                Explore as Maravilhas do Universo
              </span>
            </h1>
            <p className="hero-desc">
              Descubra uma coleção impressionante de imagens astronômicas
              capturadas pelos melhores telescópios e observatórios do mundo.
              Cada foto conta uma história única do cosmos.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <i className="fas fa-camera"></i>
                <div className="stat-content">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Imagens</span>
                </div>
              </div>
              <div className="stat-item">
                <i className="fas fa-star"></i>
                <div className="stat-content">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Objetos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="filter-container">
          <h2 className="filter-title">Filtrar por Categoria</h2>
          <div className="filter-tabs">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                className={`filter-tab ${
                  filtroAtivo === categoria.id ? "active" : ""
                }`}
                onClick={() => setFiltroAtivo(categoria.id)}
              >
                <i className={categoria.icon}></i>
                <span>{categoria.nome}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-grid">
            {imagensFiltradas.map((imagem) => (
              <div key={imagem.id} className={`gallery-item ${imagem.classe}`}>
                <img src={imagem.src} alt={imagem.titulo} />
                <div className="image-overlay">
                  <button
                    className="view-btn"
                    onClick={() =>
                      abrirModal(imagem.src, imagem.titulo, imagem.descricao)
                    }
                  >
                    <i className="fas fa-eye"></i>
                    <span>Ver Imagem</span>
                  </button>
                </div>
                <div className="image-info">
                  <h3>{imagem.titulo}</h3>
                  <p>{imagem.subtitulo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalAberto && (
        <div className="modal active">
          <div className="modal-overlay" onClick={fecharModal}></div>
          <div className="modal-content">
            <button className="modal-close" onClick={fecharModal}>
              <i className="fas fa-times"></i>
            </button>
            <img
              className="modal-image"
              src={imagemModal.src}
              alt={imagemModal.titulo}
            />
            <div className="modal-info">
              <h3 className="modal-title">{imagemModal.titulo}</h3>
              <p className="modal-description">{imagemModal.descricao}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>AstroNexus</h3>
              <p>Conectando você com as maravilhas do universo.</p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Links Rápidos</h4>
                <ul>
                  <li>
                    <a href="#">Sobre</a>
                  </li>
                  <li>
                    <Link to="/produtos">Produtos</Link>
                  </li>
                  <li>
                    <a href="#">Eventos</a>
                  </li>
                  <li>
                    <a href="#">Contato</a>
                  </li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Suporte</h4>
                <ul>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Ajuda</a>
                  </li>
                  <li>
                    <a href="#">Privacidade</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 AstroNexus. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Galeria;
