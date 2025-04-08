document.addEventListener("DOMContentLoaded", () => {
  // --- Apparition fluide des sections ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 150); // décalage progressif en cascade
      }
    });
  }, { threshold: 0.1 });

  const animatedElements = document.querySelectorAll(".hero, .section, .service-item");
  animatedElements.forEach(el => observer.observe(el));

  // --- Apparition immédiate de la hero ---
  setTimeout(() => {
    const hero = document.querySelector(".hero");
    if (hero) hero.classList.add("visible");
  }, 200);

  // --- Menu overlay ---
  const openMenuBtn = document.getElementById("openMenu");
  const closeMenuBtn = document.getElementById("closeMenu");
  const overlayMenu = document.getElementById("overlayMenu");

  if (openMenuBtn && closeMenuBtn && overlayMenu) {
    openMenuBtn.addEventListener("click", () => {
      overlayMenu.classList.add("active");
    });

    closeMenuBtn.addEventListener("click", () => {
      overlayMenu.classList.remove("active");
    });

    overlayMenu.addEventListener("click", (e) => {
      if (e.target === overlayMenu) {
        overlayMenu.classList.remove("active");
      }
    });
  }

  // --- Bouton retour haut ---
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });

  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
