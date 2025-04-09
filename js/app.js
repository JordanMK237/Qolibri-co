document.addEventListener('DOMContentLoaded', function () {
  /* === RETOUR EN HAUT === */
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const backToTopBtn = document.getElementById("backToTopBtn");

  function toggleScrollBtnVisibility() {
    const isVisible = window.scrollY > 200;
    if (scrollTopBtn) scrollTopBtn.style.display = isVisible ? "block" : "none";
    if (backToTopBtn) backToTopBtn.style.opacity = isVisible ? "1" : "0.7";
  }

  window.addEventListener('scroll', toggleScrollBtnVisibility);
  toggleScrollBtnVisibility();

  [scrollTopBtn, backToTopBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener("click", () => {
        window.scrollTo({top: 0, behavior: "smooth"});
      });
    }
  });



  /* === SLIDER TÉMOIGNAGES === */
  const testimonials = document.querySelectorAll('.testimonial-item');
  let currentIndex = 0;
  const total = testimonials.length;

  function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    testimonials[index].classList.add('active');
  }

  document.getElementById('nextBtn')?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % total;
    showTestimonial(currentIndex);
  });

  document.getElementById('prevBtn')?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + total) % total;
    showTestimonial(currentIndex);
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % total;
    showTestimonial(currentIndex);
  }, 5000);

  /* === ANIMATIONS DIVERSES === */
  document.querySelectorAll('.footer-links-column ul li a').forEach(link => {
    link.addEventListener('mouseenter', () => link.style.color = 'var(--jaune-pastel)');
    link.addEventListener('mouseleave', () => link.style.color = '');
  });

  document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'translateY(-3px)';
      icon.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = '';
      icon.style.boxShadow = '';
    });
  });

  /* === ANIMATION DU FOOTER === */
  const footer = document.querySelector('.site-footer');
  if (footer) {
    footer.style.opacity = 0;
    footer.style.transition = 'opacity 1s ease, transform 1s ease';
    footer.style.transform = 'translateY(50px)';

    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footer.style.opacity = '1';
          footer.style.transform = 'translateY(0)';
        }
      });
    }, {threshold: 0.1}).observe(footer);
  }

  /* === TABS DYNAMIQUES === */
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab');
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  const cards = document.querySelectorAll('.tab-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const tab = card.getAttribute('data-tab');
      tabPanes.forEach(p => p.classList.remove('active'));
      document.getElementById(tab)?.classList.add('active');
    });
  });

  /* === BTN PDF TRACKING === */
  document.querySelectorAll(".btn-pdf").forEach(link => {
    link.addEventListener("click", () => {
      console.log("Lecture de la ressource :", link.href);
    });
  });


  /* === JOINDRE UN FICHIER === */
  const toggleFile = document.getElementById('toggleFile');
  const fileUploadContainer = document.getElementById('fileUploadContainer');
  if (toggleFile && fileUploadContainer) {
    toggleFile.addEventListener('change', () => {
      fileUploadContainer.style.display = toggleFile.checked ? 'block' : 'none';
    });
  }

  /* === MENU MOBILE DÉROULANT === */
  document.querySelectorAll('.submenu-toggle').forEach(toggle => {
    toggle.addEventListener('click', e => {
      e.preventDefault();
      const parent = toggle.closest('.has-submenu');
      document.querySelectorAll('.has-submenu').forEach(item => {
        if (item !== parent) item.classList.remove('active');
      });
      parent?.classList.toggle('active');
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.mobile-nav')) {
      document.querySelectorAll('.has-submenu').forEach(item => item.classList.remove('active'));
    }
  });
});

/* === service masqués candidat === */
document.addEventListener("DOMContentLoaded", () => {
  const detailSections = {
    guide: document.getElementById('detailGuide'),
    prepare: document.getElementById('detailPrepare'),
    prepare2: document.getElementById('detailPrepare2'),
    vision: document.getElementById('detailVision'),
    service: document.getElementById('detailService'),
    audit: document.getElementById('detailAudit'),

  };

  // Cacher toutes les sections au départ
  const hideAllDetails = () => {
    Object.values(detailSections).forEach(section => {
      if (section) section.style.display = 'none';
    });
  };

  hideAllDetails();

  // Gestion d'affichage exclusif
  function showOnly(sectionToShow) {
    Object.entries(detailSections).forEach(([key, section]) => {
      if (!section) return;
      section.style.display = (key === sectionToShow) ? 'block' : 'none';
    });
    detailSections[sectionToShow]?.scrollIntoView({ behavior: 'smooth' });
  }

  // Écoute des boutons "En savoir plus"
  document.querySelector('.service-card:nth-child(1) .btn-service')?.addEventListener('click', e => {
    e.preventDefault();
    showOnly('guide');
  });

  document.querySelector('.service-card:nth-child(2) .btn-service')?.addEventListener('click', e => {
    e.preventDefault();
    showOnly('prepare');
  });

  document.querySelector('.service-card:nth-child(3) .btn-service')?.addEventListener('click', e => {
    e.preventDefault();
    showOnly('prepare2');
  });
  document.querySelector('.service-card:nth-child(4) .btn-service')?.addEventListener('click', e => {
    e.preventDefault();
    showOnly('audit');
  });
  document.querySelector('.vision-text .btn-service')?.addEventListener('click', e => {
    e.preventDefault();
    showOnly('vision');
  });
  document.querySelector('.expertise-button .btn-service')?.addEventListener('click', e => {
    e.preventDefault();
    showOnly('service');
  });


  // Masquer toutes les sections quand on remonte tout en haut
  window.addEventListener('scroll', () => {
    if (window.scrollY < 100) {
      hideAllDetails();
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".scroll-fade");

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.1}s`;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => observer.observe(el));
});



//page entreprise


//page accueil, section masquée par défaut

//liens directions sous menu
// Redirige vers la bonne section selon l'onglet cliqué

/*menu burger*/
/* === OUVERTURE / FERMETURE DU MENU BURGER === */
const burgerMenu = document.getElementById('burgerMenu');
const mobileNav = document.getElementById('mobileNav');

if (burgerMenu && mobileNav) {
  burgerMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  // Fermer le menu si on clique ailleurs
  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !burgerMenu.contains(e.target)) {
      mobileNav.classList.remove('open');
    }
  });
}

/*mise à jour automatique de l'année dans le footer*/
document.getElementById("currentYear").textContent = new Date().getFullYear();

/*page active*/
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop(); // ex: "Candidats.html"

  // Tous les liens du menu
  document.querySelectorAll("nav a").forEach(link => {
    const href = link.getAttribute("href");

    // Vérifie si le lien correspond à la page actuelle
    if (href === currentPage || window.location.href.includes(href)) {
      link.classList.add("active");
    }
  });
});

//animation à l'affichage
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".scroll-fade");

  if (window.innerWidth <= 768) {
    fadeElements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, i * 150);
    });
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -30% 0px"
    });

    fadeElements.forEach(el => observer.observe(el));
  }
});



