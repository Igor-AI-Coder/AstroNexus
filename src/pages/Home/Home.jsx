import { useState, useEffect } from "react";
import "./Home.css";
import "../../assets/css/background.css";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

// --- FUNÇÃO AUXILIAR PARA REDUZIR COMPLEXIDADE ---
// Esta função isola a lógica de atribuição de classes.
const getGalleryItemClass = (index) => {
  let itemClass = "gallery-item";
  if (index === 0) {
    itemClass += " large-item";
  } else if (index === 3) {
    itemClass += " tall-item";
  } else if (index === 5) {
    itemClass += " wide-item";
  }
  return itemClass;
};
// ------------------------------------------------

const Home = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
  const apiKey = import.meta.env.VITE_NASA_API_KEY;
        if (!apiKey) {
          throw new Error("Chave da API da NASA não encontrada. Verifique seu arquivo .env.");
        }
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=7`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Falha ao buscar dados da NASA. Verifique a chave da API ou tente novamente mais tarde.");
        }
        const data = await response.json();

        const imagesOnly = data.filter(item => item.media_type === 'image');
        setGalleryImages(imagesOnly);

      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <>
      <Header />
      <div id="space">
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
      </div>

      {/* Seção Hero */}
      <section className="hero-section" id="home">
        <div className="hero-background-elements">
          <div className="floating-icon star-1">
            <i className="fas fa-star"></i>
          </div>
          <div className="floating-icon planet-1">
            <i className="fas fa-globe"></i>
          </div>
          <div className="floating-icon rocket-1">
            <i className="fas fa-rocket"></i>
          </div>
          <div className="floating-icon satellite-1">
            <i className="fas fa-satellite"></i>
          </div>
          <div className="floating-icon moon-1">
            <i className="fas fa-moon"></i>
          </div>
        </div>

        <div className="hero-container">
          <div className="hero-content hero-in">
            <div className="hero-badge">
              <i className="fas fa-sparkles"></i>
              <span>Explore o Infinito</span>
            </div>
            <h1 className="hero-title">
              <span className="title-main">
                Astro<span className="quebra-linha-mobile"></span>Nexus
              </span>
              <span className="title-subtitle">
                Sua Jornada Cósmica Começa Aqui
              </span>
            </h1>
            <p className="hero-desc">
              Conecte-se com o universo através da nossa plataforma inovadora.
              Explore constelações, produtos astronômicos e fenômenos celestiais
              de forma interativa e desvende os mistérios do cosmos.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <i className="fas fa-telescope"></i>
                <div className="stat-content">
                  <span className="stat-number">10k+</span>
                  <span className="stat-label">Observações</span>
                </div>
              </div>
              <div className="stat-item">
                <i className="fas fa-users"></i>
                <div className="stat-content">
                  <span className="stat-number">5k+</span>
                  <span className="stat-label">Exploradores</span>
                </div>
              </div>
            </div>
            <div className="hero-buttons">
              <Link to="/produtos" className="btn-primary">
                <i className="fas fa-rocket"></i>
                <span>Explorar Produtos</span>
              </Link>
              <a href="#services" className="btn-secondary">
                <i className="fas fa-info-circle"></i>
                <span>Saiba Mais</span>
              </a>
            </div>
          </div>
          <div className="hero-image hero-in">
            <div className="image-container">
              <img
                src="img/astronauta.png"
                alt="Exploração do universo - AstroNexus"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-left">
            <p className="about-label">Sobre AstroNexus</p>
            <h2 className="about-title">Explore o Universo Conosco</h2>
            <p className="about-desc">
              AstroNexus é uma plataforma inovadora que conecta entusiastas da
              astronomia, oferecendo recursos avançados para explorar o cosmos.
              Com uma interface intuitiva e ferramentas poderosas, os usuários
              podem descobrir constelações, adquirir equipamentos e participar
              de eventos astronômicos de forma interativa.
            </p>
            <div className="about-features">
              <div className="feature-item">
                <span className="feature-icon">★</span>
                <span>Interface Intuitiva</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">◉</span>
                <span>Produtos Especializados</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">◆</span>
                <span>Comunidade Ativa</span>
              </div>
            </div>
            <div className="about-more">
              <a href="#services" className="btn-outline">
                Descobrir Mais
              </a>
            </div>
          </div>
          <div className="about-right">
            <div className="about-image">
              <img
                src="img/sobre.png"
                alt="Exploração espacial - Tecnologia AstroNexus"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="services-container">
          <div className="section-header">
            <h2 className="section-title">Nossos Serviços</h2>
            <p className="section-subtitle">
              Descubra todas as ferramentas que oferecemos para sua jornada
              astronômica
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🔭</div>
              <h3>Observação Guiada</h3>
              <p>
                Aprenda a usar telescópios e identificar objetos celestes com
                nossos guias especializados.
              </p>
              <a href="#services" className="service-link">
                Saiba Mais
              </a>
            </div>
            <div className="service-card">
              <div className="service-icon">🌌</div>
              <h3>Mapas Estelares</h3>
              <p>
                Navegue pelo céu noturno com nossos mapas interativos de
                constelações em tempo real.
              </p>
              <a href="#services" className="service-link">
                Explorar
              </a>
            </div>
            <div className="service-card">
              <div className="service-icon">📡</div>
              <h3>Alertas Astronômicos</h3>
              <p>
                Receba notificações sobre eventos celestiais importantes e
                fenômenos raros.
              </p>
              <a href="#services" className="service-link">
                Ativar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section" id="products">
        <div className="cta-container">
          <div className="cta-content">
            <div className="cta-text">
              <div className="cta-badge">
                <i className="fas fa-rocket"></i>
                <span>Descubra Nossos Produtos</span>
              </div>
              <h2 className="cta-title">Explore Nossa Loja Astronômica</h2>
              <p className="cta-description">
                Descubra uma seleção exclusiva de telescópios, binóculos e
                equipamentos astronômicos de alta qualidade. Desde iniciantes
                até observadores experientes, temos tudo que você precisa para
                explorar o cosmos.
              </p>
              <div className="cta-features">
                <div className="cta-feature">
                  <i className="fas fa-telescope"></i>
                  <span>Equipamentos Profissionais</span>
                </div>
                <div className="cta-feature">
                  <i className="fas fa-shipping-fast"></i>
                  <span>Entrega Rápida e Segura</span>
                </div>
                <div className="cta-feature">
                  <i className="fas fa-headset"></i>
                  <span>Suporte Especializado</span>
                </div>
              </div>
              <div className="cta-buttons">
                <Link to="/produtos" className="btn-cta">
                  <i className="fas fa-store"></i>
                  <span>Visitar Loja</span>
                </Link>
                <a href="#services" className="btn-secondary">
                  <i className="fas fa-info-circle"></i>
                  <span>Saiba Mais</span>
                </a>
              </div>
            </div>
            <div className="cta-image">
              <img
                src="/img/3.png"
                alt="Equipamentos Astronômicos - AstroNexus"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section" id="news">
        <div className="news-container">
          <div className="section-header">
            <h2 className="section-title">Últimas Notícias</h2>
            <p className="section-subtitle">
              Fique por dentro das novidades do mundo da astronomia
            </p>
          </div>
          <div className="news-grid">
            <article className="news-card featured">
              <div className="news-image">
                <img
                  src="img/noti-01.webp"
                  alt="Novo exoplaneta descoberto"
                  loading="lazy"
                  decoding="async"
                />
                <div className="news-category">Descoberta</div>
              </div>
              <div className="news-content">
                <h3>Novo Exoplaneta Descoberto na Zona Habitável</h3>
                <p>
                  Cientistas descobrem planeta similar à Terra a 100 anos-luz de
                  distância, com possibilidades de abrigar vida.
                </p>
                <div className="news-meta">
                  <time dateTime="2025-06-15" className="news-date">
                    15 de Junho, 2025
                  </time>
                  <span className="news-author">NASA</span>
                </div>
              </div>
            </article>
            <article className="news-card">
              <div className="news-image">
                <img
                  src="img/noti-02.png"
                  alt="Eclipse lunar total"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="news-content">
                <h3>Eclipse Lunar Total em Setembro</h3>
                <p>
                  Prepare-se para o próximo eclipse lunar total que será visível
                  em toda a América do Sul.
                </p>
                <div className="news-meta">
                  <time dateTime="2025-06-10" className="news-date">
                    10 de Junho, 2025
                  </time>
                </div>
              </div>
            </article>
            <article className="news-card">
              <div className="news-image">
                <img
                  src="img/noti-03.jpg"
                  alt="Nebulosa capturada pelo Hubble"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="news-content">
                <h3>Hubble Captura Nova Nebulosa</h3>
                <p>
                  Telescópio espacial revela detalhes impressionantes de
                  nebulosa de formação estelar.
                </p>
                <div className="news-meta">
                  <time dateTime="2025-06-08" className="news-date">
                    8 de Junho, 2025
                  </time>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Solar System Section */}
      <section className="solar-system-section" id="solar-system">
        <div className="floating-planets">
          <div className="floating-planet planet-mercury">🪐</div>
          <div className="floating-planet planet-venus">🌍</div>
          <div className="floating-planet planet-mars">🔴</div>
          <div className="floating-planet planet-jupiter">🟤</div>
        </div>

        <div className="solar-system-container">
          <div className="solar-system-content">
            <div className="solar-system-text">
              <div className="solar-system-badge">
                <i className="fas fa-globe"></i>
                <span>Planetas</span>
              </div>
              <h2 className="solar-system-title">
                Descubra os Planetas do Sistema Solar
              </h2>
              <p className="solar-system-description">
                Explore os oito mundos fascinantes que orbitam nosso Sol. Desde
                o pequeno e veloz Mercúrio até o distante e gelado Netuno, cada
                planeta possui características únicas que o tornam especial.
                Descubra suas atmosferas, composições, tamanhos e as condições
                extremas que definem cada mundo.
              </p>

              <div className="solar-system-highlights">
                <div className="solar-system-highlight">
                  <i className="fas fa-globe"></i>
                  <span>8 Planetas Únicos</span>
                </div>
                <div className="solar-system-highlight">
                  <i className="fas fa-thermometer-half"></i>
                  <span>Temperaturas Extremas</span>
                </div>
                <div className="solar-system-highlight">
                  <i className="fas fa-mountain"></i>
                  <span>Superfícies Diversas</span>
                </div>
                <div className="solar-system-highlight">
                  <i className="fas fa-wind"></i>
                  <span>Atmosferas Variadas</span>
                </div>
              </div>

              <div className="solar-system-stats">
                <div className="solar-stat">
                  <span className="solar-stat-number">8</span>
                  <span className="solar-stat-label">Planetas</span>
                </div>
                <div className="solar-stat">
                  <span className="solar-stat-number">4</span>
                  <span className="solar-stat-label">Planetas Rochosos</span>
                </div>
              </div>

              <div className="solar-system-buttons">
                <Link to="/planetas" className="btn-solar">
                  <i className="fas fa-rocket"></i>
                  <span>Explorar Planetas</span>
                </Link>
                <a href="#news" className="btn-secondary">
                  <i className="fas fa-newspaper"></i>
                  <span>Ver Notícias</span>
                </a>
              </div>
            </div>

            <div className="solar-system-image">
              <div className="solar-system-visual">
                <img
                  src="img/planetas.jpg"
                  alt="Sistema Solar - Os Oito Planetas"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Constellations Section */}
      <section className="constellations-section" id="constellations">
        <div className="constellations-container">
          <div className="section-header">
            <h2 className="section-title">Constelações</h2>
            <p className="section-subtitle">
              Descubra as histórias e mitologias por trás das constelações
            </p>
          </div>
          <div className="constellations-content">
            <article className="constellation-featured">
              <div className="constellation-image">
                <img
                  src="img/cost-01.jpg"
                  alt="Constelação de Órion"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="constellation-info">
                <h3>Órion - O Caçador</h3>
                <p>
                  Uma das constelações mais reconhecíveis do céu noturno, Órion
                  é visível em todo o mundo durante o inverno no hemisfério
                  norte. Contém estrelas brilhantes como Betelgeuse e Rigel,
                  além da famosa Nebulosa de Órion.
                </p>
                <div className="constellation-details">
                  <div className="detail-item">
                    <strong>Melhor época:</strong> Dezembro a Fevereiro
                  </div>
                  <div className="detail-item">
                    <strong>Estrelas principais:</strong> Betelgeuse, Rigel,
                    Bellatrix
                  </div>
                  <div className="detail-item">
                    <strong>Objetos notáveis:</strong> Nebulosa de Órion (M42)
                  </div>
                </div>
              </div>
            </article>
            <div className="constellations-grid">
              <article className="constellation-card">
                <div className="constellation-card-image">
                  <img
                    src="img/const-02.avif"
                    alt="Constelação Ursa Maior"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="constellation-card-content">
                  <h4>Ursa Maior</h4>
                  <p>
                    Contém a famosa asterismo "Grande Carro", visível durante
                    todo o ano no hemisfério norte.
                  </p>
                </div>
              </article>
              <article className="constellation-card">
                <div className="constellation-card-image">
                  <img
                    src="img/const-03.jpg"
                    alt="Constelação Cassiopeia"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="constellation-card-content">
                  <h4>Cassiopeia</h4>
                  <p>
                    Forma um "W" distintivo no céu e é facilmente reconhecível
                    próxima à Estrela Polar.
                  </p>
                </div>
              </article>
              <article className="constellation-card">
                <div className="constellation-card-image">
                  <img
                    src="img/const-04.jpg"
                    alt="Constelação Leão"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="constellation-card-content">
                  <h4>Leão</h4>
                  <p>
                    Uma constelação zodiacal que realmente se parece com um
                    leão, melhor vista na primavera.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* ============= SEÇÃO DA GALERIA DINÂMICA (REFATORADA) ============== */}
      {/* ======================================================= */}
      <section className="gallery-section" id="gallery">
        <div className="gallery-container">
          <div className="section-header">
            <h2 className="section-title">Galeria Cósmica</h2>
            <p className="section-subtitle">
              Uma coleção das mais belas imagens do universo, fornecida pela NASA.
            </p>
          </div>
          <div className="gallery-grid">
            {isLoading && <p style={{ color: "white", textAlign: "center", gridColumn: "1 / -1" }}>Carregando imagens do universo...</p>}
            
            {error && <p style={{ color: "#ff8a8a", textAlign: "center", gridColumn: "1 / -1" }}>Erro: {error}</p>}
            
            {!isLoading && !error && galleryImages.map((image, index) => (
                <figure className={getGalleryItemClass(index)} key={image.date || image.url}>
                  <img
                    src={image.url}
                    alt={image.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="gallery-overlay">
                    <h4>{image.title}</h4>
                    <p>
                      {image.explanation.substring(0, 120)}
                      {image.explanation.length > 120 ? '... Leia mais' : ''}
                    </p>
                  </figcaption>
                </figure>
              )
            )}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section" id="events">
        <div className="events-container">
          <div className="section-header">
            <h2 className="section-title">Próximos Eventos</h2>
            <p className="section-subtitle">
              Não perca os eventos astronômicos mais importantes
            </p>
          </div>
          <div className="events-grid">
            <article className="event-card">
              <div className="event-date">
                <span className="day">15</span>
                <span className="month">JUL</span>
              </div>
              <div className="event-image">
                <img
                  src="https://www.jornaldafranca.com.br/wp-content/uploads/2023/10/incrivel-eclipse-solar-e-raios-de-luz-no-ceu-estrelado-sol-e-lua-no-espaco-1.jpg"
                  alt="Eclipse solar parcial"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="event-content">
                <h3>Eclipse Solar Parcial</h3>
                <p>
                  Observação do eclipse solar parcial visível em várias regiões
                  do Brasil. Evento gratuito com equipamentos de proteção
                  fornecidos.
                </p>
                <div className="event-meta">
                  <span className="event-time">
                    <i className="fas fa-clock"></i> 14:30 - 17:00
                  </span>
                  <span className="event-location">
                    <i className="fas fa-map-marker-alt"></i> São Paulo
                  </span>
                </div>
                <a href="#events" className="event-link">
                  Mais Detalhes
                </a>
              </div>
            </article>
            <article className="event-card">
              <div className="event-date">
                <span className="day">22</span>
                <span className="month">JUL</span>
              </div>
              <div className="event-image">
                <img
                  src="https://img.odcdn.com.br/wp-content/uploads/2022/07/chuva-de-meteoros-Jeff-Dai.jpg"
                  alt="Chuva de meteoros Delta Aquáridas"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="event-content">
                <h3>Chuva de Meteoros Delta Aquáridas</h3>
                <p>
                  Noite de observação da chuva de meteoros com até 20 meteoros
                  por hora. Ideal para fotografia astronômica.
                </p>
                <div className="event-meta">
                  <span className="event-time">
                    <i className="fas fa-clock"></i> 21:00 - 05:00
                  </span>
                  <span className="event-location">
                    <i className="fas fa-map-marker-alt"></i> Campos do Jordão
                  </span>
                </div>
                <a href="#events" className="event-link">
                  Mais Detalhes
                </a>
              </div>
            </article>
            <article className="event-card">
              <div className="event-date">
                <span className="day">05</span>
                <span className="month">AGO</span>
              </div>
              <div className="event-image">
                <img
                  src="https://www.astroshop.pt/CMS/images/text/category/showroom_landsberg169_all.jpeg"
                  alt="Workshop sobre uso de telescópio"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="event-content">
                <h3>Workshop: Usando seu Telescópio</h3>
                <p>
                  Aprenda a configurar e usar seu telescópio para obter as
                  melhores observações. Para iniciantes e intermediários.
                </p>
                <div className="event-meta">
                  <span className="event-time">
                    <i className="fas fa-clock"></i> 19:00 - 22:00
                  </span>
                  <span className="event-location">
                    <i className="fas fa-map-marker-alt"></i> Online
                  </span>
                </div>
                <a href="#events" className="event-link">
                  Inscrever-se
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>AstroNexus</h3>
              <p>Conectando você com as maravilhas do universo.</p>
              <div className="footer-social">
                <a href="#social" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#social" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#social" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Links Rápidos</h4>
                <ul>
                  <li>
                    <a href="#about">Sobre</a>
                  </li>
                  <li>
                    <Link to="/produtos">Produtos</Link>
                  </li>
                  <li>
                    <a href="#events">Eventos</a>
                  </li>
                  <li>
                    <a href="#contact">Contato</a>
                  </li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Suporte</h4>
                <ul>
                  <li>
                    <a href="#faq">FAQ</a>
                  </li>
                  <li>
                    <a href="#help">Ajuda</a>
                  </li>
                  <li>
                    <a href="#privacy">Privacidade</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 AstroNexus. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;