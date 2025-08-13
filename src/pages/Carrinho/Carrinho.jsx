import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useCart } from "../../context/CartContext";
import "./carrinho.css";

const Carrinho = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalItems, 
    getTotalPrice 
  } = useCart();
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);

  // Aumentar quantidade
  const increaseQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  // Diminuir quantidade
  const decreaseQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity - 1);
    }
  };

  // Finalizar compra
  const finalizePurchase = () => {
    if (cartItems.length === 0) {
      setShowEmptyCartModal(true);
      return;
    }
    setShowSuccessModal(true);
    clearCart();
  };

  // Renderizar item do carrinho
  const renderCartItem = (item) => {
    const finalPrice = item.discount > 0 
      ? item.originalPrice * (1 - item.discount / 100) 
      : item.price;

    return (
      <div key={item.id} className="cart-item flex flex-col sm:flex-row gap-6 p-6 bg-white/5 rounded-xl mb-4 hover:bg-white/10 transition-all duration-300 border border-white/10">
        <div className="w-full sm:w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="text-white/60 text-xs uppercase tracking-wider mb-2 font-space">
            {item.category}
          </div>
          <h3 className="font-orbitron font-bold text-lg mb-4">{item.name}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white/10 rounded-lg border border-white/20">
                <button 
                  className="p-2 hover:bg-white/10 transition-colors rounded-l-lg"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  <i className="fas fa-minus text-sm"></i>
                </button>
                <span className="quantity px-4 py-2 min-w-[3rem] text-center font-orbitron font-medium">
                  {item.quantity}
                </span>
                <button 
                  className="p-2 hover:bg-white/10 transition-colors rounded-r-lg"
                  onClick={() => increaseQuantity(item.id)}
                >
                  <i className="fas fa-plus text-sm"></i>
                </button>
              </div>
              <button 
                className="text-red-400 hover:text-red-300 transition-colors p-2"
                onClick={() => removeFromCart(item.id)}
              >
                <i className="fas fa-trash text-sm"></i>
              </button>
            </div>
            <div className="text-right">
              {item.discount > 0 ? (
                <>
                  <div className="text-white/50 text-sm line-through font-orbitron">
                    R$ {item.originalPrice.toFixed(2).replace(".", ",")}
                  </div>
                  <div className="price font-orbitron font-bold text-xl">
                    R$ {finalPrice.toFixed(2).replace(".", ",")}
                  </div>
                  <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded font-space">
                    -{item.discount}%
                  </div>
                </>
              ) : (
                <div className="price font-orbitron font-bold text-xl">
                  R$ {finalPrice.toFixed(2).replace(".", ",")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="carrinho-page">
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

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Título da página */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-white mb-6 border border-white/20">
              <i className="fas fa-shopping-cart mr-2"></i>
              <span className="text-sm font-medium font-space uppercase tracking-wider">Meu Carrinho</span>
            </div>
            <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                Seus Equipamentos
              </span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto font-space">
              Revise seus itens selecionados e finalize sua jornada astronômica
            </p>
          </div>

          <div className="cart-container grid lg:grid-cols-3 gap-8">
            {/* Lista de Produtos no Carrinho */}
            <div className="lg:col-span-2">
              <div className="glass-effect rounded-2xl p-6 mb-6">
                <h2 className="font-orbitron text-xl font-bold mb-6 flex items-center">
                  <i className="fas fa-list mr-3 text-white"></i>
                  Itens no Carrinho
                </h2>
                <div className="items-cart-dinamic">
                  {cartItems.length > 0 ? (
                    cartItems.map(renderCartItem)
                  ) : (
                    <div className="text-center py-12">
                      <i className="fas fa-shopping-cart text-6xl text-white/20 mb-4"></i>
                      <h3 className="font-orbitron text-xl font-bold mb-2">Carrinho Vazio</h3>
                      <p className="text-white/60 font-space mb-6">
                        Adicione alguns produtos incríveis à sua coleção astronômica
                      </p>
                      <Link
                        to="/produtos"
                        className="cosmic-button bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center space-x-2 border border-white/20"
                      >
                        <i className="fas fa-rocket"></i>
                        <span className="font-space font-medium uppercase tracking-wider text-sm">
                          Explorar Produtos
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
                {/* Continuar Comprando */}
                {cartItems.length > 0 && (
                  <div className="pt-6 border-t border-white/10">
                    <Link
                      to="/produtos"
                      className="cosmic-button bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 w-fit border border-white/20"
                    >
                      <i className="fas fa-arrow-left"></i>
                      <span className="font-space font-medium uppercase tracking-wider text-sm">
                        Continuar Comprando
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <div className="glass-effect rounded-2xl p-6 sticky top-28">
                <h2 className="font-orbitron text-xl font-bold mb-6 flex items-center">
                  <i className="fas fa-calculator mr-3 text-white"></i>
                  Resumo do Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="font-orbitron">Total</span>
                    <span className="price-total font-orbitron text-xl">
                      R$ {getTotalPrice().toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="font-orbitron">Frete</span>
                    <span className="text-green-400 font-orbitron text-xl">Grátis</span>
                  </div>
                </div>

                <hr className="border-white/20 mb-6" />
                
                {/* Botão Finalizar Compra */}
                <button
                  className="finalize-purchase w-full cosmic-button bg-gradient-to-r from-white to-gray-200 hover:from-gray-100 hover:to-gray-300 text-black py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 animate-pulse-glow mb-6 font-orbitron uppercase tracking-wider"
                  onClick={finalizePurchase}
                >
                  <i className="fas fa-rocket mr-2"></i>
                  Finalizar Compra
                </button>

                {/* Formas de Pagamento */}
                <div className="text-center mb-6">
                  <p className="text-white/50 text-sm mb-3 font-space">Formas de pagamento aceitas:</p>
                  <div className="flex justify-center space-x-4">
                    <i className="fab fa-cc-visa text-2xl text-white/60 hover:text-white transition-colors"></i>
                    <i className="fab fa-cc-mastercard text-2xl text-white/60 hover:text-white transition-colors"></i>
                    <i className="fab fa-cc-paypal text-2xl text-white/60 hover:text-white transition-colors"></i>
                    <i className="fas fa-credit-card text-2xl text-white/60 hover:text-white transition-colors"></i>
                  </div>
                </div>

                {/* Garantias */}
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <i className="fas fa-shield-alt text-green-400 w-4"></i>
                    <span className="text-white/70 font-space">Compra 100% segura</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <i className="fas fa-truck text-blue-400 w-4"></i>
                    <span className="text-white/70 font-space">Frete grátis acima de R$ 199</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <i className="fas fa-undo text-yellow-400 w-4"></i>
                    <span className="text-white/70 font-space">30 dias para troca</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de sucesso */}
      {showSuccessModal && (
        <div className="modal-fade active">
          <div className="glass-effect-modal rounded-2xl p-8 max-w-xs w-full text-center shadow-2xl flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-4">
              <i className="fas fa-check text-3xl text-white"></i>
            </div>
            <div className="text-white font-orbitron text-lg mb-6">Compra realizada com sucesso!</div>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-bold transition"
              onClick={() => setShowSuccessModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Modal de alerta para carrinho vazio */}
      {showEmptyCartModal && (
        <div className="modal-fade active">
          <div className="glass-effect-modal rounded-2xl p-8 max-w-xs w-full text-center shadow-2xl flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 mb-4">
              <i className="fas fa-exclamation text-3xl text-white"></i>
            </div>
            <div className="text-white font-orbitron text-lg mb-6">Seu carrinho está vazio!</div>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full font-bold transition"
              onClick={() => setShowEmptyCartModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;
