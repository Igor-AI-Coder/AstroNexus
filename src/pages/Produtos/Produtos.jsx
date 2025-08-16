import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../context/CartContext";
import styles from "./Produtos.module.css";

const Produtos = () => {
  const { addToCart, getTotalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [showCartPopup, setShowCartPopup] = useState(false);

  // Dados dos produtos
  const products = [
    {
      id: 1,
      name: "Telescópio Refrator Pro 90mm",
      category: "telescopios",
      price: 1599.9,
      originalPrice: 1599.9,
      discount: 19,
      image: "/img/1.png",
      badge: "best-seller",
      rating: 5,
      reviews: 124,
      description:
        "Telescópio refrator de alta qualidade com lente de 90mm, ideal para observação planetária e lunar. Inclui tripé robusto e oculares.",
    },
    {
      id: 2,
      name: "Telescópio Refletor Newton 150mm",
      category: "telescopios",
      price: 2899.9,
      originalPrice: 2899.9,
      discount: 0,
      image: "/img/2.png",
      badge: "new",
      rating: 4,
      reviews: 87,
      description:
        "Telescópio refletor newtoniano com espelho primário de 150mm. Excelente para deep sky e astrofotografia básica.",
    },
    {
      id: 3,
      name: "Telescópio Schmidt-Cassegrain 200mm",
      category: "telescopios",
      price: 8999.9,
      originalPrice: 8999.9,
      discount: 0,
      image: "/img/3.png",
      badge: "premium",
      rating: 5,
      reviews: 156,
      description:
        "Telescópio profissional Schmidt-Cassegrain com abertura de 200mm. Sistema GoTo computadorizado incluso.",
    },
    {
      id: 4,
      name: "Binóculo Astronômico 15x70",
      category: "binoculos",
      price: 459.9,
      originalPrice: 459.9,
      discount: 0,
      image: "/img/4.png",
      badge: "",
      rating: 5,
      reviews: 93,
      description:
        "Binóculo de alta qualidade 15x70mm, ideal para observação de objetos celestes. Lentes multicobertas.",
    },
    {
      id: 5,
      name: "Binóculo Compacto 10x42",
      category: "binoculos",
      price: 299.9,
      originalPrice: 299.9,
      discount: 0,
      image: "/img/5.png",
      badge: "portable",
      rating: 4,
      reviews: 67,
      description:
        "Binóculo compacto e leve 10x42mm, perfeito para observações casuais e viagens. À prova d'água.",
    },
    {
      id: 6,
      name: "Tripé Profissional Carbono",
      category: "acessorios",
      price: 899.9,
      originalPrice: 899.9,
      discount: 0,
      image: "/img/6.png",
      badge: "",
      rating: 5,
      reviews: 78,
      description:
        "Tripé em fibra de carbono ultra leve e resistente. Suporta até 15kg com máxima estabilidade.",
    },
    {
      id: 7,
      name: "Kit Oculares Profissionais (5 peças)",
      category: "acessorios",
      price: 799.9,
      originalPrice: 799.9,
      discount: 19,
      image: "/img/7.png",
      badge: "kit",
      rating: 4,
      reviews: 112,
      description:
        "Conjunto com 5 oculares de diferentes aumentos (6mm, 10mm, 15mm, 20mm, 25mm). Inclui maleta.",
    },
    {
      id: 8,
      name: "Filtro Solar Profissional",
      category: "acessorios",
      price: 189.9,
      originalPrice: 189.9,
      discount: 0,
      image: "/img/8.png",
      badge: "safety",
      rating: 5,
      reviews: 45,
      description:
        "Filtro solar de alta qualidade para observação segura do Sol. Densidade neutra certificada.",
    },
    {
      id: 9,
      name: "Atlas Celeste Interativo",
      category: "livros",
      price: 79.9,
      originalPrice: 79.9,
      discount: 0,
      image: "/img/9.png",
      badge: "",
      rating: 5,
      reviews: 201,
      description:
        "Guia completo das constelações com realidade aumentada. Inclui app móvel para identificação.",
    },
    {
      id: 10,
      name: "Guia Completo do Astrônomo Amador",
      category: "livros",
      price: 129.9,
      originalPrice: 129.9,
      discount: 0,
      image: "/img/10.png",
      badge: "educational",
      rating: 4,
      reviews: 89,
      description:
        "Manual completo para iniciantes e intermediários. 400 páginas com dicas práticas e técnicas.",
    },
    {
      id: 11,
      name: "Luminária Planetário LED",
      category: "decoracao",
      price: 199.9,
      originalPrice: 199.9,
      discount: 0,
      image: "/img/11.png",
      badge: "trending",
      rating: 5,
      reviews: 156,
      description:
        "Projeta constelações no teto com tecnologia LED. 12 discos intercambiáveis inclusos.",
    },
    {
      id: 12,
      name: "Quadro Mapa Estelar Personalizado",
      category: "decoracao",
      price: 149.9,
      originalPrice: 149.9,
      discount: 0,
      image: "/img/12.png",
      badge: "",
      rating: 4,
      reviews: 73,
      description:
        "Quadro personalizado mostrando o céu de uma data especial. Moldura em madeira nobre.",
    },
    {
      id: 13,
      name: "Kit Observação Iniciante Completo",
      category: "acessorios",
      price: 349.9,
      originalPrice: 349.9,
      discount: 29,
      image: "/img/13.png",
      badge: "starter",
      rating: 5,
      reviews: 234,
      description:
        "Kit completo para iniciantes: telescópio 70mm, tripé, oculares, mapa estelar e guia prático.",
    },
  ];

  // Categorias para os filtros
  const categories = [
    { id: "todos", name: "Todos", icon: "fas fa-th" },
    { id: "telescopios", name: "Telescópios", icon: "fas fa-telescope" },
    { id: "binoculos", name: "Binóculos", icon: "fas fa-binoculars" },
    { id: "acessorios", name: "Acessórios", icon: "fas fa-cog" },
    { id: "livros", name: "Livros", icon: "fas fa-book" },
    { id: "decoracao", name: "Decoração", icon: "fas fa-star" },
  ];

  // Mostrar modal de sucesso
  const showSuccessModal = (message) => {
    setModalMessage(message);
    setModalType("success");
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  // Função para adicionar ao carrinho e mostrar popup
  const handleAddToCart = (product) => {
    addToCart(product);
    setShowCartPopup(true);
    setTimeout(() => setShowCartPopup(false), 3000);
  };

  // Filtrar produtos por categoria
  const filteredProducts =
    selectedCategory === "todos"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Renderizar estrelas
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className={i <= rating ? "fas fa-star" : "far fa-star"} />
      );
    }
    return stars;
  };

  // Renderizar badge do produto
  const renderBadge = (badge) => {
    const badgeMap = {
      "best-seller": "Best Seller",
      new: "Novo",
      premium: "Premium",
      portable: "Portátil",
      kit: "Kit Completo",
      safety: "Segurança",
      educational: "Educativo",
      trending: "Tendência",
      starter: "Kit Iniciante",
    };

    const badgeClassMap = {
      "best-seller": styles.bestSeller,
      new: styles.new,
      premium: styles.premium,
      portable: styles.portable,
      kit: styles.kit,
      safety: styles.safety,
      educational: styles.educational,
      trending: styles.trending,
      starter: styles.starter,
    };

    if (!badge) return null;

    return (
      <div className={`${styles.productBadge} ${badgeClassMap[badge] || ""}`}>
        {badgeMap[badge] || badge}
      </div>
    );
  };

  return (
    <div className="produtos-page">
      {/* Fundo espacial */}
      <div id="space">
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
      </div>

      <Header showCartIcon={true} cartItemsCount={getTotalItems()} />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <i className="fas fa-shopping-bag"></i>
              <span>Loja Oficial</span>
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleMain}>Produtos</span>
              <span className={styles.titleSubtitle}>
                Equipamentos Profissionais para Astronomia
              </span>
            </h1>
            <p className={styles.heroDesc}>
              Descubra nossa coleção completa de telescópios, binóculos,
              acessórios e equipamentos astronômicos selecionados especialmente
              para entusiastas e profissionais da astronomia.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <div className={styles.filterContainer}>
          <div className={styles.filterTabs}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.filterTab} ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <i className={category.icon}></i>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className={styles.productsSection}>
        <div className={styles.productsContainer}>
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => {
              const finalPrice =
                product.discount > 0
                  ? product.originalPrice * (1 - product.discount / 100)
                  : product.price;

              return (
                <div
                  key={product.id}
                  className={styles.productCard}
                  data-category={product.category}
                >
                  <div className={styles.productImage}>
                    <img src={product.image} alt={product.name} />
                    {renderBadge(product.badge)}
                    <div className={styles.productActions}>
                      <button className={`${styles.actionBtn} wishlist`}>
                        <i className="fas fa-heart"></i>
                      </button>
                      <button className={`${styles.actionBtn} quick-view`}>
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  </div>
                  <div className={styles.productInfo}>
                    <div className={styles.productCategory}>
                      {categories.find((cat) => cat.id === product.category)
                        ?.name || product.category}
                    </div>
                    <h3>{product.name}</h3>
                    <div className={styles.productRating}>
                      {renderStars(product.rating)}
                      <span>({product.reviews} avaliações)</span>
                    </div>
                    <p className={styles.productDescription}>
                      {product.description}
                    </p>
                    <div className={styles.productPrice}>
                      {product.discount > 0 && (
                        <span className={styles.priceOriginal}>
                          R${" "}
                          {product.originalPrice.toFixed(2).replace(".", ",")}
                        </span>
                      )}
                      <span className={styles.priceCurrent}>
                        R$ {finalPrice.toFixed(2).replace(".", ",")}
                      </span>
                      {product.discount > 0 && (
                        <span className={styles.priceDiscount}>
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                    <button
                      className={styles.btnAddCart}
                      onClick={() => handleAddToCart(product)}
                    >
                      <i className="fas fa-cart-plus"></i>
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal de Feedback */}
      {showModal && (
        <div className={`modal-fade ${showModal ? "active" : ""}`}>
          <div className="glass-effect-modal rounded-2xl p-8 max-w-md mx-4">
            <div className="text-center">
              <div className="mb-4">
                <i
                  className={`fas ${
                    modalType === "success"
                      ? "fa-check-circle text-green-400"
                      : "fa-exclamation-circle text-red-400"
                  } text-4xl`}
                ></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white font-orbitron">
                {modalType === "success" ? "Sucesso!" : "Erro!"}
              </h3>
              <p className="text-gray-300 mb-6 font-space">{modalMessage}</p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors font-space"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup de confirmação do carrinho */}
      {showCartPopup && (
        <div className={styles.cartPopup}>
          <div className={styles.cartPopupContent}>
            <div className={styles.cartPopupIcon}>
              <i className="fas fa-check-circle"></i>
            </div>
            <p>Produto adicionado ao carrinho!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produtos;
