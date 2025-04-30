// Inicialización de animaciones y funcionalidades
document.addEventListener("DOMContentLoaded", function () {
  // Comprobamos que las bibliotecas necesarias existan
  const hasGSAP = typeof gsap !== "undefined";
  const hasLenis = typeof Lenis !== "undefined";
  const hasLuxy = typeof luxy !== "undefined";

  // Inicialización de Lenis para smooth scrolling
  let lenis;
  if (hasLenis) {
    lenis = new Lenis({
      duration: 1.5,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    // Conectar Lenis con GSAP ScrollTrigger
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Inicializar Luxy para efectos de paralaje
  if (hasLuxy) {
    var isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      luxy.init({
        wrapper: "#luxy",
        wrapperSpeed: 0.065,
      });
    }
  }

  // Mostrar la página después de cargar completamente
  setTimeout(() => {
    const loader = document.getElementById("page-loader");
    if (loader) {
      loader.classList.add("loaded");
      document.body.classList.add("page-loaded");
    }
  }, 1000);

  // Inicializar GSAP y ScrollTrigger
  if (hasGSAP && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Animaciones de entrada para secciones
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    });

    // Animación para el texto de scroll
    const scrollTextOne = document.querySelector(".super-text-2.one");
    if (scrollTextOne) {
      gsap.to(scrollTextOne, {
        xPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-section-2",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    const scrollTextTwo = document.querySelector(".super-text-2.two");
    if (scrollTextTwo) {
      gsap.to(scrollTextTwo, {
        xPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-section-2",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Animación para testimonios
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    if (testimonialCards.length > 0) {
      gsap.from(testimonialCards, {
        stagger: 0.2,
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".testimonials-container",
          start: "top 80%",
        },
      });
    }

    // Animación para estadísticas
    const statItems = document.querySelectorAll(".stat-item");
    if (statItems.length > 0) {
      gsap.from(statItems, {
        stagger: 0.2,
        scale: 0.8,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 80%",
        },
      });
    }

    // Animación para sección CTA
    const ctaContainer = document.querySelector(".container-6.is-flip");
    if (ctaContainer) {
      gsap.from(ctaContainer, {
        rotateX: -20,
        opacity: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: ".fotter",
          start: "top 70%",
        },
      });
    }

    // Animación de las celdas de proyectos
    const gridCells = document.querySelectorAll(".grid__cell");
    if (gridCells.length > 0) {
      gsap.from(gridCells, {
        stagger: 0.1,
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".grid",
          start: "top 70%",
        },
      });
    }

    // Efecto de scroll con parallax en el footer
    const footerShape = document.querySelector(".footer-shape");
    if (footerShape) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#contacto",
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        })
        .to(footerShape, {
          y: -50,
          ease: "none",
        });
    }

    // Efecto 3D para el botón de contacto
    const btnParent = document.querySelector(".btn-parent");
    if (btnParent) {
      gsap.to(btnParent, {
        rotationX: 15,
        rotationY: -15,
        scale: 1.05,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".fotter",
          start: "top center",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Animar líneas de texto con divisiones y separaciones
    const textLines = document.querySelectorAll(".split .line");
    if (textLines.length > 0) {
      gsap.utils.toArray(textLines).forEach((line, i) => {
        gsap.from(line, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }
  }

  // Animación de contador para estadísticas
  const counters = document.querySelectorAll(".counter");
  if (counters.length > 0) {
    const speed = 200;

    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 1);
        } else {
          counter.innerText = target;
        }
      };

      // Iniciar contador cuando el elemento es visible
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                updateCount();
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.5 }
        );

        observer.observe(counter);
      } else {
        // Fallback para navegadores sin soporte para IntersectionObserver
        updateCount();
      }
    });
  }

  // Header scroll effect
  function handleScroll() {
    const header = document.getElementById("header");
    const scrollPosition = window.scrollY;
    const progressBar = document.querySelector(".progress-bar");

    if (document.body.scrollHeight > window.innerHeight) {
      const scrollPercentage =
        (scrollPosition / (document.body.scrollHeight - window.innerHeight)) *
        100;

      if (header) {
        if (scrollPosition > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }

      // Actualizar barra de progreso
      if (progressBar) {
        progressBar.style.width = `${scrollPercentage}%`;
      }

      // Parallax effect para el fondo de testimonios
      const parallaxBg = document.querySelector(".parallax-bg");
      if (parallaxBg) {
        const parallaxSection = document.querySelector(".parallax-section");
        if (parallaxSection) {
          const sectionTop = parallaxSection.getBoundingClientRect().top;
          const sectionHeight = parallaxSection.offsetHeight;

          if (sectionTop < window.innerHeight && sectionTop > -sectionHeight) {
            const scrollValue = sectionTop / 5;
            parallaxBg.style.transform = `translateY(${scrollValue}px)`;
          }
        }
      }

      // Mostrar/ocultar botón de volver arriba
      const backToTop = document.getElementById("back-to-top");
      if (backToTop) {
        if (scrollPosition > 500) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }
      }
    }
  }

  window.addEventListener("scroll", handleScroll);
  // Ejecutar handleScroll una vez para configurar el estado inicial
  handleScroll();

  // Smooth scroll para enlaces de anclaje con easing
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      if (targetId === "#") {
        // Volver arriba suavemente
        if (hasLenis) {
          lenis.scrollTo(0, {
            duration: 1.5,
            easing: (t) => 1 - Math.pow(2, -10 * t),
          });
        } else {
          // Fallback para navegadores sin Lenis
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        if (hasLenis) {
          lenis.scrollTo(target, {
            offset: -100,
            duration: 1.5,
            easing: (t) => 1 - Math.pow(2, -10 * t),
          });
        } else {
          // Fallback para navegadores sin Lenis
          const targetPosition =
            target.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Custom cursor functionality
  const cursor = document.querySelector(".custom-cursor");
  const cursorDot = document.querySelector(".cursor-dot");

  if (cursor && cursorDot) {
    document.addEventListener("mousemove", (e) => {
      if (hasGSAP) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
        });
        gsap.to(cursorDot, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
        });
      } else {
        // Fallback para navegadores sin GSAP
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    });

    // Efecto al pasar sobre elementos interactivos
    const interactiveElements = document.querySelectorAll(
      "a, button, .grid__cell-img, .btn--md--extra--border--animation, input, textarea"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-active");
        cursorDot.classList.add("cursor-active");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-active");
        cursorDot.classList.remove("cursor-active");
      });
    });
  }

  // Control de menú móvil
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mainMenu = document.getElementById("main-menu");

  if (mobileMenuToggle && mainMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      const expanded = mainMenu.getAttribute("aria-expanded") === "true";
      mainMenu.setAttribute("aria-expanded", !expanded);
      mobileMenuToggle.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Cerrar menú al hacer clic en un enlace
    mainMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainMenu.setAttribute("aria-expanded", "false");
        mobileMenuToggle.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }

  // Modal de créditos
  const creditsBtn = document.getElementById("credits-btn");
  const creditsModal = document.getElementById("credits-modal");
  const closeModal = document.querySelector(".modal-close");

  if (creditsBtn && creditsModal && closeModal) {
    creditsBtn.addEventListener("click", () => {
      creditsModal.classList.add("show");
      document.body.style.overflow = "hidden";
    });

    closeModal.addEventListener("click", () => {
      creditsModal.classList.remove("show");
      document.body.style.overflow = "";
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener("click", (e) => {
      if (e.target === creditsModal) {
        creditsModal.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  }

  // Controles para carrusel de testimonios en móvil
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  const dotsContainer = document.querySelector(".testimonial-dots");

  if (testimonialCards.length > 0 && window.innerWidth < 768 && dotsContainer) {
    let currentSlide = 0;

    // Crear puntos indicadores
    testimonialCards.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);

      dot.addEventListener("click", () => {
        goToSlide(index);
      });
    });

    const dots = document.querySelectorAll(".dot");

    // Función para mostrar un slide específico
    function goToSlide(n) {
      testimonialCards.forEach((card, index) => {
        if (hasGSAP) {
          gsap.to(card, {
            x: `${100 * (index - n)}%`,
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          // Fallback sin GSAP
          card.style.transform = `translateX(${100 * (index - n)}%)`;
        }
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === n);
      });

      currentSlide = n;
    }

    // Inicializar posición de slides
    goToSlide(0);

    // Eventos para botones
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentSlide > 0) {
          goToSlide(currentSlide - 1);
        } else {
          // Ir al último slide si estamos en el primero
          goToSlide(testimonialCards.length - 1);
        }
      });

      nextBtn.addEventListener("click", () => {
        if (currentSlide < testimonialCards.length - 1) {
          goToSlide(currentSlide + 1);
        } else {
          // Volver al primer slide si estamos en el último
          goToSlide(0);
        }
      });
    }

    // Swipe en móvil para testimonios
    let touchStartX = 0;
    let touchEndX = 0;

    const testimonialsContainer = document.querySelector(
      ".testimonials-container"
    );

    if (testimonialsContainer) {
      testimonialsContainer.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      testimonialsContainer.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });

      function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
          // Swipe a la izquierda
          if (nextBtn) nextBtn.click();
        } else if (touchEndX > touchStartX + swipeThreshold) {
          // Swipe a la derecha
          if (prevBtn) prevBtn.click();
        }
      }
    }
  }

  // Reproducción automática del video solo cuando está visible
  const video = document.getElementById("boomerangVideo");
  if (video && "IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((e) => console.warn("Error al reproducir:", e));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    videoObserver.observe(video);
  }

  // Agregar efectos hover a los proyectos
  const projectImages = document.querySelectorAll(
    ".projects .grid__cell-img-inner"
  );

  projectImages.forEach((project) => {
    project.addEventListener("mouseenter", () => {
      project.classList.add("hover");
    });

    project.addEventListener("mouseleave", () => {
      project.classList.remove("hover");
    });
  });

  // Formulario de contacto - prevenir envío predeterminado
  const contactForm = document.getElementById("quick-contact");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulación de envío de formulario
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText =
          submitBtn.querySelector("span")?.textContent || "ENVIAR";

        submitBtn.disabled = true;
        if (submitBtn.querySelector("span")) {
          submitBtn.querySelector("span").textContent = "ENVIANDO...";
        }

        // Animación 3D al enviar
        if (hasGSAP) {
          gsap.to(submitBtn, {
            rotateX: 15,
            scale: 0.95,
            duration: 0.3,
          });
        }

        // Simulamos un tiempo de espera para el envío
        setTimeout(() => {
          // Mostrar mensaje de éxito
          this.innerHTML = `
            <div class="success-message">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#FF6900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22 4L12 14.01l-3-3" stroke="#FF6900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3>¡Mensaje enviado con éxito!</h3>
                <p>Nos pondremos en contacto contigo muy pronto.</p>
            </div>
          `;

          // Animación de entrada del mensaje de éxito
          if (hasGSAP) {
            gsap.from(".success-message", {
              y: 50,
              opacity: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
            });
          }
        }, 2000);
      }
    });

    // Animación 3D para inputs del formulario
    const formInputs = contactForm.querySelectorAll("input, textarea");
    formInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        if (hasGSAP) {
          gsap.to(input, {
            z: 20,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });

      input.addEventListener("blur", () => {
        if (hasGSAP) {
          gsap.to(input, {
            z: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    });
  }

  // Animar elementos cuando aparecen en el viewport
  const animateOnScroll = function () {
    // Elementos de texto con animación fade in
    const textElements = document.querySelectorAll(
      ".animation-line .line, .heading--uppercase--inline .line, .item-fade:not([data-aos])"
    );

    textElements.forEach((element) => {
      const position = element.getBoundingClientRect();

      if (position.top < window.innerHeight * 0.9) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });

    // Iconos de servicios con efecto de rotación
    const serviceIcons = document.querySelectorAll(
      ".scaling-svg:not([data-aos])"
    );
    serviceIcons.forEach((icon) => {
      const position = icon.getBoundingClientRect();

      if (position.top < window.innerHeight * 0.9) {
        icon.classList.add("animate-in");
      }
    });
  };

  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);
});
