import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Galeria.module.css";

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
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate
          .toISOString()
          .slice(0, 10)}&end_date=${endDate.toISOString().slice(0, 10)}`;
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
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <i className="fas fa-images"></i>
              <span>Galeria Cósmica</span>
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleMain}>Galeria</span>
              <span className={styles.titleSubtitle}>
                Explore as Maravilhas do Universo
              </span>
            </h1>
            <p className={styles.heroDesc}>
              Descubra uma coleção impressionante de imagens astronômicas
              capturadas pelos melhores telescópios e observatórios do mundo.
              Cada foto conta uma história única do cosmos.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <i className="fas fa-camera"></i>
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>{imagens.length}</span>
                  <span className={styles.statLabel}>Imagens</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <i className="fas fa-star"></i>
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>1</span>
                  <span className={styles.statLabel}>Categoria</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <div className={styles.filterContainer}>
          <h2 className={styles.filterTitle}>Filtrar por Categoria</h2>
          <div className={styles.filterTabs}>
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                className={`${styles.filterTab} ${
                  filtroAtivo === categoria.id ? styles.active : ""
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
      <section className={styles.gallerySection}>
        <div className={styles.galleryContainer}>
          {isLoading ? (
            <div
              style={{ color: "#fff", textAlign: "center", padding: "40px" }}
            >
              Carregando imagens...
            </div>
          ) : error ? (
            <div style={{ color: "red", textAlign: "center", padding: "40px" }}>
              {error}
            </div>
          ) : (
            <div className={styles.galleryGrid}>
              {/* Só exibe imagens da API, nunca imagens antigas */}
              {imagensFiltradas.length === 0 ? (
                <div
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    padding: "40px",
                  }}
                >
                  Nenhuma imagem encontrada.
                </div>
              ) : (
                imagensFiltradas.map((imagem) => (
                  <div key={imagem.id} className={styles.galleryItem}>
                    <img src={imagem.src} alt={imagem.titulo} />
                    <div className={styles.imageOverlay}>
                      <button
                        className={styles.viewBtn}
                        onClick={() =>
                          abrirModal(
                            imagem.src,
                            imagem.titulo,
                            imagem.descricao
                          )
                        }
                      >
                        <i className="fas fa-eye"></i>
                        <span>Ver Imagem</span>
                      </button>
                    </div>
                    <div className={styles.imageInfo}>
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
        <div className={`${styles.modal} ${styles.active}`}>
          <div className={styles.modalOverlay} onClick={fecharModal}></div>
          <div className={styles.modalContent}>
            <button className={styles.modalClose} onClick={fecharModal}>
              <i className="fas fa-times"></i>
            </button>
            <img
              className={styles.modalImage}
              src={imagemModal.src}
              alt={imagemModal.titulo}
            />
            <div className={styles.modalInfo}>
              <h3 className={styles.modalTitle}>{imagemModal.titulo}</h3>
              <p className={styles.modalDescription}>{imagemModal.descricao}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Galeria;
