document.addEventListener("DOMContentLoaded", function () {
  // Carrega o carrinho do localStorage ou inicia vazio
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  window.addToCart = function (thisProduct) {
    const product = {
      name: thisProduct.getAttribute("data-name"),
      price: parseFloat(thisProduct.getAttribute("data-price")),
      discount: parseFloat(thisProduct.getAttribute("data-discount")),
      image: thisProduct.getAttribute("data-img"),
      category: thisProduct.getAttribute("data-category"),
      quantity: 1,
    };

    const existingProduct = cart.find((item) => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push(product);
    }

    saveCart();
    updateCartCount();
    updateCartDisplay();
  };

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const cartCount = document.querySelectorAll(".cart-count");
    if (cartCount) {
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.forEach((count) => (count.textContent = total));
    }
  }

  function updateCartDisplay() {
    const cartContainer = document.querySelector(".items-cart-dinamic");
    cartContainer.innerHTML = "";

    cart.forEach((item) => {
      const priceWithDiscount =
        item.discount > 0
          ? (item.price * (1 - item.discount / 100)).toFixed(2)
          : item.price.toFixed(2);

      const originalPrice = item.price.toFixed(2);

      cartContainer.innerHTML += `
                <div class="cart-item flex flex-col sm:flex-row gap-6 p-6 bg-white/5 rounded-xl mb-4 hover:bg-white/10 transition-all duration-300 border border-white/10">
                    <div class="w-full sm:w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center overflow-hidden">
                        <img src="/AstroNexus/${item.image}" alt="${
        item.name
      }" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1">
                        <div class="text-white/60 text-xs uppercase tracking-wider mb-2 font-space">${
                          item.category
                        }</div>
                        <h3 class="font-orbitron font-bold text-lg mb-4">${
                          item.name
                        }</h3>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex items-center bg-white/10 rounded-lg border border-white/20">
                                    <button class="p-2 hover:bg-white/10 transition-colors rounded-l-lg" onclick="decreaseQuantity(this)">
                                        <i class="fas fa-minus text-sm"></i>
                                    </button>
                                    <span class="quantity px-4 py-2 min-w-[3rem] text-center font-orbitron font-medium">${
                                      item.quantity
                                    }</span>
                                    <button class="p-2 hover:bg-white/10 transition-colors rounded-r-lg" onclick="increaseQuantity(this)">
                                        <i class="fas fa-plus text-sm"></i>
                                    </button>
                                </div>
                                <button class="text-red-400 hover:text-red-300 transition-colors p-2" onclick="removeFromCart(this)">
                                    <i class="fas fa-trash text-sm"></i>
                                </button>
                            </div>
                            <div class="text-right">
                                ${
                                  item.discount > 0
                                    ? `<div class="text-white/50 text-sm line-through font-orbitron">R$ ${originalPrice}</div>
                                       <div class="price font-orbitron font-bold text-xl">R$ ${priceWithDiscount}</div>
                                       <div class="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded font-space">-${item.discount}%</div>`
                                    : `<div class="price font-orbitron font-bold text-xl">R$ ${originalPrice}</div>`
                                }
                            </div>
                        </div>
                    </div>
                </div>
            `;
    });

    priceTotal(); // <-- Chame aqui para atualizar o total sempre que o carrinho mudar
  }

  window.decreaseQuantity = function (thisProduct) {
    const productName = thisProduct
      .closest(".cart-item")
      .querySelector("h3").textContent;
    const product = cart.find((item) => item.name === productName);
    if (product && product.quantity > 1) {
      product.quantity -= 1;
    } else if (product) {
      cart = cart.filter((item) => item.name !== productName);
    }
    saveCart();
    updateCartCount();
    updateCartDisplay();
  };

  window.increaseQuantity = function (thisProduct) {
    const productName = thisProduct
      .closest(".cart-item")
      .querySelector("h3").textContent;
    const product = cart.find((item) => item.name === productName);
    if (product) {
      product.quantity += 1;
    }
    saveCart();
    updateCartCount();
    updateCartDisplay();
  };

  window.removeFromCart = function (thisProduct) {
    const productName = thisProduct
      .closest(".cart-item")
      .querySelector("h3").textContent;
    cart = cart.filter((item) => item.name !== productName);
    saveCart();
    updateCartCount();
    updateCartDisplay();
  };

  function priceTotal() {
    const priceTotal = document.querySelector(".price-total");
    let total = 0;
    cart.forEach((item) => {
      const price =
        item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price;
      total += price * item.quantity;
    });

    priceTotal.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
  }

  function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    updateCartDisplay();
  }

  function showSuccessModal() {
    const modal = document.getElementById("successModal");
    modal.classList.add("active");
  }
  function showEmptyCartModal() {
    const modal = document.getElementById("emptyCartModal");
    modal.classList.add("active");
  }

  document
    .getElementById("closeSuccessModal")
    .addEventListener("click", function () {
      document.getElementById("successModal").classList.remove("active");
    });
  document
    .getElementById("closeEmptyCartModal")
    .addEventListener("click", function () {
      document.getElementById("emptyCartModal").classList.remove("active");
    });

  window.finalizePurchase = function () {
    if (cart.length === 0) {
      showEmptyCartModal();
      return;
    }
    showSuccessModal();
    clearCart();
  };

  // Inicializa contador e carrinho ao carregar a página
  updateCartCount();
  updateCartDisplay();
});

// FILTRO EM PRODUTOS

// Seleciona todos os botões de filtro
const filtros = document.querySelectorAll(".filter-tab");
// Seleciona todos os cards de produtos
const produtos = document.querySelectorAll(".product-card");

// Para cada botão de filtro
filtros.forEach((filtro) => {
  // Adiciona o evento de clique
  filtro.addEventListener("click", () => {
    // Remove a classe 'active' de todos os botões
    filtros.forEach((f) => f.classList.remove("active"));
    // Adiciona a classe 'active' ao botão clicado
    filtro.classList.add("active");

    // Obtém a categoria selecionada no botão
    const categoria = filtro.dataset.category;

    // Mostra ou esconde os produtos de acordo com a categoria
    produtos.forEach((produto) => {
      produto.style.display =
        categoria === "todos" || produto.dataset.category === categoria
          ? ""
          : "none";
    });
  });
});
