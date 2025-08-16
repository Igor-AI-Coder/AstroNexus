import { useState, useEffect } from "react";
import styles from "./Home.module.css";
// import "../../assets/css/background.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

// Função auxiliar para classes da galeria
const getGalleryItemClass = (index) => {
  let classes = [styles.galleryItem];
  if (index === 0) classes.push(styles.largeItem);
  if (index === 3) classes.push(styles.tallItem);
  if (index === 5) classes.push(styles.wideItem);
  return classes.join(" ");
};

const Home = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiKey = import.meta.env.VITE_NASA_API_KEY;
        if (!apiKey) {
          throw new Error(
            "Chave da API da NASA não encontrada. Verifique seu arquivo .env."
          );
        }
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=7`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(
            "Falha ao buscar dados da NASA. Verifique a chave da API ou tente novamente mais tarde."
          );
        }
        const data = await response.json();
        const imagesOnly = data.filter((item) => item.media_type === "image");
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
      <section className={styles.heroSection} id="home">
        <div className={styles.heroBackgroundElements}>
          <div className={`${styles.floatingIcon} ${styles.star1}`}>
            <i className="fas fa-star"></i>
          </div>
          <div className={`${styles.floatingIcon} ${styles.planet1}`}>
            <i className="fas fa-globe"></i>
          </div>
          <div className={`${styles.floatingIcon} ${styles.rocket1}`}>
            <i className="fas fa-rocket"></i>
          </div>
          <div className={`${styles.floatingIcon} ${styles.satellite1}`}>
            <i className="fas fa-satellite"></i>
          </div>
          <div className={`${styles.floatingIcon} ${styles.moon1}`}></div>
        </div>
        <div className={styles.heroContainer}>
          <div className={`${styles.heroContent} hero-in`}>
            <div className={styles.heroBadge}>
              <i className="fas fa-sparkles"></i>
              <span>Explore o Infinito</span>
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleMain}>
                Astro<span className={styles.quebraLinhaMobile}></span>Nexus
              </span>
              <span className={styles.titleSubtitle}>
                Sua Jornada Cósmica Começa Aqui
              </span>
            </h1>
            <p className={styles.heroDesc}>
              Conecte-se com o universo através da nossa plataforma inovadora.
              Explore constelações, produtos astronômicos e fenômenos celestiais
              de forma interativa e desvende os mistérios do cosmos.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <i className="fas fa-telescope"></i>
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>10k+</span>
                  <span className={styles.statLabel}>Observações</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <i className="fas fa-users"></i>
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>5k+</span>
                  <span className={styles.statLabel}>Exploradores</span>
                </div>
              </div>
            </div>
            <div className={styles.heroButtons}>
              <Link to="/produtos" className={styles.btnPrimary}>
                <i className="fas fa-rocket"></i>
                <span>Explorar Produtos</span>
              </Link>
              <a href="#services" className={styles.btnSecondary}>
                <i className="fas fa-info-circle"></i>
                <span>Saiba Mais</span>
              </a>
            </div>
          </div>
          <div className={`${styles.heroImage} hero-in`}>
            <div className={styles.imageContainer}>
              {/* <div className={styles.imageGlow}></div> */}
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
      <section className={styles.aboutSection} id="about">
        <div className={styles.aboutContainer}>
          <div className={styles.aboutLeft}>
            <p className={styles.aboutLabel}>Sobre AstroNexus</p>
            <h2 className={styles.aboutTitle}>Explore o Universo Conosco</h2>
            <p className={styles.aboutDesc}>
              AstroNexus é uma plataforma inovadora que conecta entusiastas da
              astronomia, oferecendo recursos avançados para explorar o cosmos.
              Com uma interface intuitiva e ferramentas poderosas, os usuários
              podem descobrir constelações, adquirir equipamentos e participar
              de eventos astronômicos de forma interativa.
            </p>
            <div className={styles.aboutFeatures}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>★</span>
                <span>Interface Intuitiva</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>◉</span>
                <span>Produtos Especializados</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>◆</span>
                <span>Comunidade Ativa</span>
              </div>
            </div>
            <div className={styles.aboutMore}>
              <a href="#services" className={styles.btnOutline}>
                Descobrir Mais
              </a>
            </div>
          </div>
          <div className={styles.aboutRight}>
            <div className={styles.aboutImage}>
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
      <section className={styles.servicesSection} id="services">
        <div className={styles.servicesContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nossos Serviços</h2>
            <p className={styles.sectionSubtitle}>
              Descubra todas as ferramentas que oferecemos para sua jornada
              astronômica
            </p>
          </div>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🔭</div>
              <h3>Observação Guiada</h3>
              <p>
                Aprenda a usar telescópios e identificar objetos celestes com
                nossos guias especializados.
              </p>
              <a href="#" className={styles.serviceLink}>
                Saiba Mais
              </a>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🌌</div>
              <h3>Mapas Estelares</h3>
              <p>
                Navegue pelo céu noturno com nossos mapas interativos de
                constelações em tempo real.
              </p>
              <a href="#" className={styles.serviceLink}>
                Explorar
              </a>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>📡</div>
              <h3>Alertas Astronômicos</h3>
              <p>
                Receba notificações sobre eventos celestiais importantes e
                fenômenos raros.
              </p>
              <a href="#" className={styles.serviceLink}>
                Ativar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.ctaSection} id="products">
        <div className={styles.ctaContainer}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaText}>
              <div className={styles.ctaBadge}>
                <i className="fas fa-rocket"></i>
                <span>Descubra Nossos Produtos</span>
              </div>
              <h2 className={styles.ctaTitle}>
                Explore Nossa Loja Astronômica
              </h2>
              <p className={styles.ctaDescription}>
                Descubra uma seleção exclusiva de telescópios, binóculos e
                equipamentos astronômicos de alta qualidade. Desde iniciantes
                até observadores experientes, temos tudo que você precisa para
                explorar o cosmos.
              </p>
              <div className={styles.ctaFeatures}>
                <div className={styles.ctaFeature}>
                  <i className="fas fa-telescope"></i>
                  <span>Equipamentos Profissionais</span>
                </div>
                <div className={styles.ctaFeature}>
                  <i className="fas fa-shipping-fast"></i>
                  <span>Entrega Rápida e Segura</span>
                </div>
                <div className={styles.ctaFeature}>
                  <i className="fas fa-headset"></i>
                  <span>Suporte Especializado</span>
                </div>
              </div>
              <div className={styles.ctaButtons}>
                <Link to="/produtos" className={styles.btnCta}>
                  <i className="fas fa-store"></i>
                  <span>Visitar Loja</span>
                </Link>
                <a href="#services" className={styles.btnSecondary}>
                  <i className="fas fa-info-circle"></i>
                  <span>Saiba Mais</span>
                </a>
              </div>
            </div>
            <div className={styles.ctaImage}>
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
      <section className={styles.newsSection} id="news">
        <div className={styles.newsContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Últimas Notícias</h2>
            <p className={styles.sectionSubtitle}>
              Fique por dentro das novidades do mundo da astronomia
            </p>
          </div>
          <div className={styles.newsGrid}>
            <article className={`${styles.newsCard} ${styles.featured}`}>
              <div className={styles.newsImage}>
                <img
                  src="img/noti-01.webp"
                  alt="Novo exoplaneta descoberto"
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.newsCategory}>Descoberta</div>
              </div>
              <div className={styles.newsContent}>
                <h3>Novo Exoplaneta Descoberto na Zona Habitável</h3>
                <p>
                  Cientistas descobrem planeta similar à Terra a 100 anos-luz de
                  distância, com possibilidades de abrigar vida.
                </p>
                <div className={styles.newsMeta}>
                  <time dateTime="2025-06-15" className={styles.newsDate}>
                    15 de Junho, 2025
                  </time>
                  <span className={styles.newsAuthor}>NASA</span>
                </div>
              </div>
            </article>
            <article className={styles.newsCard}>
              <div className={styles.newsImage}>
                <img
                  src="img/noti-02.png"
                  alt="Eclipse lunar total"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={styles.newsContent}>
                <h3>Eclipse Lunar Total em Setembro</h3>
                <p>
                  Prepare-se para o próximo eclipse lunar total que será visível
                  em toda a América do Sul.
                </p>
                <div className={styles.newsMeta}>
                  <time dateTime="2025-06-10" className={styles.newsDate}>
                    10 de Junho, 2025
                  </time>
                </div>
              </div>
            </article>
            <article className={styles.newsCard}>
              <div className={styles.newsImage}>
                <img
                  src="img/noti-03.jpg"
                  alt="Nebulosa capturada pelo Hubble"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={styles.newsContent}>
                <h3>Hubble Captura Nova Nebulosa</h3>
                <p>
                  Telescópio espacial revela detalhes impressionantes de
                  nebulosa de formação estelar.
                </p>
                <div className={styles.newsMeta}>
                  <time dateTime="2025-06-08" className={styles.newsDate}>
                    8 de Junho, 2025
                  </time>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Solar System Section */}
      <section className={styles.solarSystemSection} id="solar-system">
        <div className={styles.floatingPlanets}>
          <div className={`${styles.floatingPlanet} ${styles.planetMercury}`}>
            🪐
          </div>
          <div className={`${styles.floatingPlanet} ${styles.planetVenus}`}>
            🌍
          </div>
          <div className={`${styles.floatingPlanet} ${styles.planetMars}`}>
            🔴
          </div>
          <div className={`${styles.floatingPlanet} ${styles.planetJupiter}`}>
            🟤
          </div>
        </div>

        <div className={styles.solarSystemContainer}>
          <div className={styles.solarSystemContent}>
            <div className={styles.solarSystemText}>
              <div className={styles.solarSystemBadge}>
                <i className="fas fa-globe"></i>
                <span>Planetas</span>
              </div>
              <h2 className={styles.solarSystemTitle}>
                Descubra os Planetas do Sistema Solar
              </h2>
              <p className={styles.solarSystemDescription}>
                Explore os oito mundos fascinantes que orbitam nosso Sol. Desde
                o pequeno e veloz Mercúrio até o distante e gelado Netuno, cada
                planeta possui características únicas que o tornam especial.
                Descubra suas atmosferas, composições, tamanhos e as condições
                extremas que definem cada mundo.
              </p>

              <div className={styles.solarSystemHighlights}>
                <div className={styles.solarSystemHighlight}>
                  <i className="fas fa-globe"></i>
                  <span>8 Planetas Únicos</span>
                </div>
                <div className={styles.solarSystemHighlight}>
                  <i className="fas fa-thermometer-half"></i>
                  <span>Temperaturas Extremas</span>
                </div>
                <div className={styles.solarSystemHighlight}>
                  <i className="fas fa-mountain"></i>
                  <span>Superfícies Diversas</span>
                </div>
                <div className={styles.solarSystemHighlight}>
                  <i className="fas fa-wind"></i>
                  <span>Atmosferas Variadas</span>
                </div>
              </div>

              <div className={styles.solarSystemStats}>
                <div className={styles.solarStat}>
                  <span className={styles.solarStatNumber}>8</span>
                  <span className={styles.solarStatLabel}>Planetas</span>
                </div>
                <div className={styles.solarStat}>
                  <span className={styles.solarStatNumber}>4</span>
                  <span className={styles.solarStatLabel}>
                    Planetas Rochosos
                  </span>
                </div>
              </div>

              <div className={styles.solarSystemButtons}>
                <Link to="/planetas" className={styles.btnSolar}>
                  <i className="fas fa-rocket"></i>
                  <span>Explorar Planetas</span>
                </Link>
                <a href="#news" className={styles.btnSecondary}>
                  <i className="fas fa-newspaper"></i>
                  <span>Ver Notícias</span>
                </a>
              </div>
            </div>

            <div className={styles.solarSystemImage}>
              <div className={styles.solarSystemVisual}>
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
      <section className={styles.constellationsSection} id="constellations">
        <div className={styles.constellationsContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Constelações</h2>
            <p className={styles.sectionSubtitle}>
              Descubra as histórias e mitologias por trás das constelações
            </p>
          </div>
          <div className={styles.constellationsContent}>
            <article className={styles.constellationFeatured}>
              <div className={styles.constellationImage}>
                <img
                  src="img/cost-01.jpg"
                  alt="Constelação de Órion"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={styles.constellationInfo}>
                <h3>Órion - O Caçador</h3>
                <p>
                  Uma das constelações mais reconhecíveis do céu noturno, Órion
                  é visível em todo o mundo durante o inverno no hemisfério
                  norte. Contém estrelas brilhantes como Betelgeuse e Rigel,
                  além da famosa Nebulosa de Órion.
                </p>
                <div className={styles.constellationDetails}>
                  <div className={styles.detailItem}>
                    <strong>Melhor época:</strong> Dezembro a Fevereiro
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Estrelas principais:</strong> Betelgeuse, Rigel,
                    Bellatrix
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Objetos notáveis:</strong> Nebulosa de Órion (M42)
                  </div>
                </div>
              </div>
            </article>
            <div className={styles.constellationsGrid}>
              <article className={styles.constellationCard}>
                <div className={styles.constellationCardImage}>
                  <img
                    src="img/const-02.avif"
                    alt="Constelação Ursa Maior"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.constellationCardContent}>
                  <h4>Ursa Maior</h4>
                  <p>
                    Contém a famosa asterismo "Grande Carro", visível durante
                    todo o ano no hemisfério norte.
                  </p>
                </div>
              </article>
              <article className={styles.constellationCard}>
                <div className={styles.constellationCardImage}>
                  <img
                    src="img/const-03.jpg"
                    alt="Constelação Cassiopeia"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.constellationCardContent}>
                  <h4>Cassiopeia</h4>
                  <p>
                    Forma um "W" distintivo no céu e é facilmente reconhecível
                    próxima à Estrela Polar.
                  </p>
                </div>
              </article>
              <article className={styles.constellationCard}>
                <div className={styles.constellationCardImage}>
                  <img
                    src="img/const-04.jpg"
                    alt="Constelação Leão"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.constellationCardContent}>
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
      {/* ============= SEÇÃO DA GALERIA DINÂMICA ============== */}
      {/* ======================================================= */}
      <section className={styles.gallerySection} id="gallery">
        <div className={styles.galleryContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Galeria Cósmica</h2>
            <p className={styles.sectionSubtitle}>
              Uma coleção das mais belas imagens do universo, fornecida pela
              NASA.
            </p>
          </div>
          <div className={styles.galleryGrid}>
            {isLoading && (
              <p
                style={{
                  color: "white",
                  textAlign: "center",
                  gridColumn: "1 / -1",
                }}
              >
                Carregando imagens do universo...
              </p>
            )}

            {error && (
              <p
                style={{
                  color: "#ff8a8a",
                  textAlign: "center",
                  gridColumn: "1 / -1",
                }}
              >
                Erro: {error}
              </p>
            )}

            {!isLoading &&
              !error &&
              galleryImages.map((image, index) => (
                <figure
                  className={getGalleryItemClass(index)}
                  key={image.date || image.url}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className={styles.galleryOverlay}>
                    <h4>{image.title}</h4>
                    <p>
                      {image.explanation.substring(0, 120)}
                      {image.explanation.length > 120 ? "..." : ""}
                    </p>
                  </figcaption>
                </figure>
              ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className={styles.eventsSection} id="events">
        <div className={styles.eventsContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Próximos Eventos</h2>
            <p className={styles.sectionSubtitle}>
              Não perca os eventos astronômicos mais importantes
            </p>
          </div>
          <div className={styles.eventsGrid}>
            <article className={styles.eventCard}>
              <div className={styles.eventDate}>
                <span className="day">15</span>
                <span className="month">JUL</span>
              </div>
              <div className={styles.eventImage}>
                <img
                  src="https://www.jornaldafranca.com.br/wp-content/uploads/2023/10/incrivel-eclipse-solar-e-raios-de-luz-no-ceu-estrelado-sol-e-lua-no-espaco-1.jpg"
                  alt="Eclipse solar parcial"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={styles.eventContent}>
                <h3>Eclipse Solar Parcial</h3>
                <p>
                  Observação do eclipse solar parcial visível em várias regiões
                  do Brasil. Evento gratuito com equipamentos de proteção
                  fornecidos.
                </p>
                <div className={styles.eventMeta}>
                  <span className={styles.eventTime}>
                    <i className="fas fa-clock"></i> 14:30 - 17:00
                  </span>
                  <span className={styles.eventLocation}>
                    <i className="fas fa-map-marker-alt"></i> São Paulo
                  </span>
                </div>
                <a href="#" className={styles.eventLink}>
                  Mais Detalhes
                </a>
              </div>
            </article>
            <article className={styles.eventCard}>
              <div className={styles.eventDate}>
                <span className="day">22</span>
                <span className="month">JUL</span>
              </div>
              <div className={styles.eventImage}>
                <img
                  src="https://img.odcdn.com.br/wp-content/uploads/2022/07/chuva-de-meteoros-Jeff-Dai.jpg"
                  alt="Chuva de meteoros Delta Aquáridas"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={styles.eventContent}>
                <h3>Chuva de Meteoros Delta Aquáridas</h3>
                <p>
                  Noite de observação da chuva de meteoros com até 20 meteoros
                  por hora. Ideal para fotografia astronômica.
                </p>
                <div className={styles.eventMeta}>
                  <span className={styles.eventTime}>
                    <i className="fas fa-clock"></i> 21:00 - 05:00
                  </span>
                  <span className={styles.eventLocation}>
                    <i className="fas fa-map-marker-alt"></i> Campos do Jordão
                  </span>
                </div>
                <a href="#" className={styles.eventLink}>
                  Mais Detalhes
                </a>
              </div>
            </article>
            <article className={styles.eventCard}>
              <div className={styles.eventDate}>
                <span className="day">05</span>
                <span className="month">AGO</span>
              </div>
              <div className={styles.eventImage}>
                <img
                  src="https://www.astroshop.pt/CMS/images/text/category/showroom_landsberg169_all.jpeg"
                  alt="Workshop sobre uso de telescópio"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={styles.eventContent}>
                <h3>Workshop: Usando seu Telescópio</h3>
                <p>
                  Aprenda a configurar e usar seu telescópio para obter as
                  melhores observações. Para iniciantes e intermediários.
                </p>
                <div className={styles.eventMeta}>
                  <span className={styles.eventTime}>
                    <i className="fas fa-clock"></i> 19:00 - 22:00
                  </span>
                  <span className={styles.eventLocation}>
                    <i className="fas fa-map-marker-alt"></i> Online
                  </span>
                </div>
                <a href="#" className={styles.eventLink}>
                  Inscrever-se
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
