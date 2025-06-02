// DOM Content Loaded - Versão Simplificada
document.addEventListener("DOMContentLoaded", function () {
  initializeHamburgerMenu();
  initializeSmoothScrolling();
  initializeCart();
  initializeLogin();
});

// Hamburger menu
function initializeHamburgerMenu() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navCompact = document.querySelector(".nav-compact");

  if (hamburgerBtn && navCompact) {
    hamburgerBtn.addEventListener("click", function () {
      navCompact.classList.toggle("open");
      hamburgerBtn.classList.toggle("active");
    });

    // Close menu when clicking nav items
    navCompact.addEventListener("click", function (e) {
      if (
        e.target.classList.contains("nav-item") ||
        e.target.closest(".nav-item")
      ) {
        navCompact.classList.remove("open");
        hamburgerBtn.classList.remove("active");
      }
    });
  }
}

// Smooth scrolling
function initializeSmoothScrolling() {
  document.addEventListener("click", function (e) {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
}

// Cart functionality
function initializeCart() {
  let cartCount = 0;
  const cartCountElement = document.getElementById("cartCount");
  const cartIcon = document.getElementById("cartIcon");

  // Add to cart buttons
  document.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("btn-add-cart") ||
      e.target.closest(".btn-add-cart")
    ) {
      e.preventDefault();

      // Check if user is logged in
      if (!isUserLoggedIn()) {
        showLoginModal();
        return;
      }

      cartCount++;
      cartCountElement.textContent = cartCount;
      cartCountElement.style.display = cartCount > 0 ? "flex" : "none";

      // Add animation to cart icon
      cartIcon.style.transform = "scale(1.2)";
      setTimeout(() => {
        cartIcon.style.transform = "scale(1)";
      }, 200);

      // Show success message
      showNotification("Produto adicionado ao carrinho!");
    }
  });

  // Cart icon click
  if (cartIcon) {
    cartIcon.addEventListener("click", function () {
      if (cartCount > 0) {
        showNotification(`Você tem ${cartCount} item(s) no carrinho`);
      } else {
        showNotification("Seu carrinho está vazio");
      }
    });
  }
}

// Login functionality
function initializeLogin() {
  const loginIcon = document.getElementById("loginIcon");
  const loginModal = document.getElementById("loginModal");
  const closeModal = loginModal.querySelector(".close");
  const loginForm = document.getElementById("loginForm");

  if (loginIcon) {
    loginIcon.addEventListener("click", function () {
      showLoginModal();
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", function () {
      hideLoginModal();
    });
  }

  window.addEventListener("click", function (e) {
    if (e.target === loginModal) {
      hideLoginModal();
    }
  });

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Simulate login
      localStorage.setItem("userLoggedIn", "true");
      hideLoginModal();
      showNotification("Login realizado com sucesso!");
      updateLoginStatus();
    });
  }
}

// Helper functions
function isUserLoggedIn() {
  return localStorage.getItem("userLoggedIn") === "true";
}

function showLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) {
    modal.style.display = "block";
  }
}

function hideLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) {
    modal.style.display = "none";
  }
}

function updateLoginStatus() {
  const loginIcon = document.getElementById("loginIcon");
  if (loginIcon) {
    if (isUserLoggedIn()) {
      loginIcon.innerHTML = '<i class="fas fa-user-check"></i>';
      loginIcon.title = "Usuário logado";
    } else {
      loginIcon.innerHTML = '<i class="fas fa-user"></i>';
      loginIcon.title = "Fazer login";
    }
  }
}

function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    z-index: 3000;
    font-family: "Space Grotesk", sans-serif;
    font-size: 14px;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
  }, 100);

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Initialize login status on page load
updateLoginStatus();
