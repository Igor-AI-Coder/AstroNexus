
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
  const [imagens, setImagens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca imagens da API da NASA (APOD)
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Use sua chave da NASA, ou variável de ambiente VITE_NASA_API_KEY
        const apiKey = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";
        // Busca múltiplas imagens (ex: últimos 15 dias)
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 14);
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate.toISOString().slice(0, 10)}&end_date=${endDate.toISOString().slice(0, 10)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Erro ao buscar imagens da NASA");
        let data = await res.json();
        // Filtra apenas imagens (descarta vídeos)
        data = data.filter((item) => item.media_type === "image");
        // Adiciona categoria fake para filtro (exemplo)
        data = data.map((item, idx) => ({
          id: idx + 1,
          src: item.url,
          titulo: item.title,
          subtitulo: item.copyright || "NASA APOD",
          descricao: item.explanation,
          categoria: "deep-space", // ou "galaxias", "nebulosas", etc, se quiser randomizar
          classe: "",
        }));
        setImagens(data.reverse()); // mais recente primeiro
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  // Categorias de filtro (apenas "deep-space" para as imagens da API, mas pode expandir)
  const categorias = [
    { id: "todos", nome: "Todas", icon: "fas fa-th" },
    { id: "deep-space", nome: "Deep Space", icon: "fas fa-satellite" },
  ];

  // Filtrar imagens
  // Garante que só as imagens da API sejam exibidas
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
                  <span className="stat-number">{imagens.length}</span>
                  <span className="stat-label">Imagens</span>
                </div>
              </div>
              <div className="stat-item">
                <i className="fas fa-star"></i>
                <div className="stat-content">
                  <span className="stat-number">1</span>
                  <span className="stat-label">Categoria</span>
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
          {isLoading ? (
            <div style={{ color: '#fff', textAlign: 'center', padding: '40px' }}>Carregando imagens...</div>
          ) : error ? (
            <div style={{ color: 'red', textAlign: 'center', padding: '40px' }}>{error}</div>
          ) : (
            <div className="gallery-grid">
              {/* Só exibe imagens da API, nunca imagens antigas */}
              {imagensFiltradas.length === 0 ? (
                <div style={{ color: '#fff', textAlign: 'center', padding: '40px' }}>Nenhuma imagem encontrada.</div>
              ) : (
                imagensFiltradas.map((imagem) => (
                  <div key={imagem.id} className={`gallery-item`}>
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
                ))
              )}
            </div>
          )}
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
