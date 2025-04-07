document.addEventListener("DOMContentLoaded", () => {
  // Animation d'apparition des sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".hero, .section").forEach(el => observer.observe(el));

  // Apparition immédiate de la hero
  setTimeout(() => {
    document.querySelector(".hero")?.classList.add("visible");
  }, 200);

  // Menu overlay
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
      // Ferme si on clique à côté du contenu (fond)
      if (e.target === overlayMenu) {
        overlayMenu.classList.remove("active");
      }
    });
  }
});
