/* ==========================================
   OBSIDIAN TECH & FORMAL PORTFOLIO - MAIN JS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Active Section Scroll Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Looker Studio Dashboard Switcher & Interactive Preview
  const dashboardSelect = document.getElementById('dashboardSelect');
  const dashboardIframe = document.getElementById('dashboardIframe');
  const viewerTitle = document.getElementById('viewerTitle');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  // Pre-configured Looker Studio Dashboard URLs (Standard Public Embeds or Fallbacks)
  const dashboards = {
    sales: {
      title: "Dashboard 1: Análisis Ejecutivo de Ventas & Retención de Clientes",
      // Sample Looker Studio Public Embed URL (replace with actual embed URL)
      url: "https://lookerstudio.google.com/embed/reporting/0B1e0B4vBCSYnSmVUa184cmV1TW8/page/6zB",
      fallbackTitle: "Dashboard Ejecutivo de Ventas (Looker Studio)",
      metrics: "Ingresos Totales: $1.2M | Cohorte Activa: 84% | CLV Promedio: $420"
    },
    telemetry: {
      title: "Dashboard 2: Telemetría de Usuario & Rendimiento Web",
      url: "https://lookerstudio.google.com/embed/reporting/1739c9f4-3dd4-463d-8e6f-449e7b2ff93d/page/p_38291038",
      fallbackTitle: "Telemetría & Web Analytics (Looker Studio)",
      metrics: "Usuarios Únicos: 142.5K | Tasa Conversión: 3.8% | Latencia Media: 180ms"
    },
    financial: {
      title: "Dashboard 3: Monitoreo Financiero & Proyección KPI",
      url: "https://lookerstudio.google.com/embed/reporting/1_0f4i9N9W1i5O1u6a3_N3O_O_O/page/1M",
      fallbackTitle: "Monitoreo Financiero & EBITDA (Looker Studio)",
      metrics: "Margen Operativo: 31.4% | CAC: $18.5 | Churn Rate: 1.2%"
    }
  };

  if (dashboardSelect && dashboardIframe) {
    dashboardSelect.addEventListener('change', (e) => {
      const selectedKey = e.target.value;
      const data = dashboards[selectedKey];
      if (data) {
        if (viewerTitle) viewerTitle.textContent = data.title;
        // Attempt loading iframe
        dashboardIframe.src = data.url;
        
        // Show notification toast
        showToast(`Cargando dashboard: ${data.title}`);
      }
    });
  }

  // Fullscreen Mode for Dashboard Viewer
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      const viewer = document.getElementById('dashboardViewer');
      if (viewer) {
        if (!document.fullscreenElement) {
          if (viewer.requestFullscreen) viewer.requestFullscreen();
          else if (viewer.webkitRequestFullscreen) viewer.webkitRequestFullscreen();
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      }
    });
  }

  // 4. Project Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 5. Copy Email to Clipboard Functionality
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const userEmailText = document.getElementById('userEmailText');

  if (copyEmailBtn && userEmailText) {
    copyEmailBtn.addEventListener('click', () => {
      const email = userEmailText.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copiado al portapapeles: ' + email);
        const origText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
        setTimeout(() => {
          copyEmailBtn.innerHTML = origText;
        }, 2000);
      }).catch(() => {
        showToast('Error al copiar el email.');
      });
    });
  }

  // 6. Contact Form Submission Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const messageInput = document.getElementById('formMessage');

      if (nameInput.value && emailInput.value && messageInput.value) {
        showToast('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
        contactForm.reset();
      } else {
        showToast('Por favor completa todos los campos requeridos.');
      }
    });
  }

  // 7. Helper: Toast Notification Handler
  function showToast(message) {
    let toast = document.getElementById('obsidianToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'obsidianToast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color: var(--accent-light);"></i> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // Make showToast globally accessible for embedded triggers
  window.showToast = showToast;
});
