// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeHeader();
  initializeHamburgerMenu();
  initializeHeroAnimation();
  initializeSmoothScrolling();
  initializeScrollAnimations();
});

// Header scroll effect
function initializeHeader() {
  const header = document.getElementById("astrodHeader");

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();
}

// Hamburger menu functionality
function initializeHamburgerMenu() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("mainNav");
  const navItems = document.querySelectorAll(".nav-item");

  function toggleMenu() {
    nav.classList.toggle("open");
    hamburgerBtn.classList.toggle("active");

    const isOpen = nav.classList.contains("open");
    hamburgerBtn.setAttribute("aria-expanded", isOpen);

    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  function closeMenu() {
    nav.classList.remove("open");
    hamburgerBtn.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  hamburgerBtn.addEventListener("click", toggleMenu);

  navItems.forEach((item) => {
    item.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
    }
  });
}

// Hero animation
function initializeHeroAnimation() {
  const heroContent = document.querySelector(".hero-content");
  const heroImage = document.querySelector(".hero-image");

  function triggerAnimation() {
    if (heroContent) heroContent.classList.add("hero-in");
    if (heroImage) heroImage.classList.add("hero-in");
  }

  if (document.readyState === "loading") {
    window.addEventListener("load", () => {
      setTimeout(triggerAnimation, 300);
    });
  } else {
    setTimeout(triggerAnimation, 300);
  }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight =
          document.querySelector(".astrod-header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Intersection Observer for scroll animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(".about-section");
  animateElements.forEach((element) => {
    observer.observe(element);
  });
}

// Parallax effect for hero section
function initializeParallax() {
  const heroSection = document.querySelector(".hero-section");

  function handleParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (heroSection) {
      heroSection.style.transform = `translateY(${rate}px)`;
    }
  }

  window.addEventListener("scroll", debounce(handleParallax, 16));
}

// Enhanced typing effect for hero title
function initializeTypingEffect() {
  const heroTitle = document.querySelector(".hero-title");
  const text = heroTitle.textContent;

  heroTitle.textContent = "";
  heroTitle.style.borderRight = "2px solid #ffffff";

  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      heroTitle.style.borderRight = "none";
    }
  }

  setTimeout(typeWriter, 1000);
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced mouse cursor effect
function initializeCursorEffect() {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  document.addEventListener("mousedown", function () {
    cursor.classList.add("active");
  });

  document.addEventListener("mouseup", function () {
    cursor.classList.remove("active");
  });
}

// Performance optimized scroll handler
const optimizedScrollHandler = debounce(function () {
  // Additional scroll-based functionality
}, 16);

window.addEventListener("scroll", optimizedScrollHandler);
