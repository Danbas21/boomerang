// Inicialización de animaciones y funcionalidades
document.addEventListener("DOMContentLoaded", function () {
  function startAnimation() {
    // Restablecer estado inicial
    document.querySelectorAll(".boomerang").forEach((el) => {
      el.className = "boomerang";
    });

    // Etapa 1: Mostrar boomerangs
    setTimeout(() => {
      document.querySelectorAll(".boomerang").forEach((el) => {
        el.classList.add("start");
      });

      // Etapa 2: Movimiento hacia la derecha
      setTimeout(() => {
        document.querySelectorAll(".boomerang").forEach((el) => {
          el.classList.remove("start");
          el.classList.add("going");
        });

        // Etapa 3: Regreso al logo
        setTimeout(() => {
          document.querySelectorAll(".boomerang").forEach((el) => {
            el.classList.remove("going");
            el.classList.add("returning");
          });

          // Etapa 4: Posición final
          setTimeout(() => {
            document.querySelectorAll(".boomerang").forEach((el) => {
              el.classList.remove("returning");
              el.classList.add("final");
            });
          }, 1500);
        }, 2000);
      }, 500);
    }, 300);
  }

  // Iniciar la animación cuando se carga la página
  window.addEventListener("load", startAnimation);

  // Añadir detectores de errores para recursos
  window.addEventListener(
    "error",
    function (e) {
      if (e.target.tagName === "VIDEO" || e.target.tagName === "SOURCE") {
        console.error("Error cargando recurso:", e.target.src);
      }
    },
    true
  );

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
      gsap.utils.toArray(textLines).forEach((line) => {
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

  // ===== REPRODUCCIÓN DE VIDEO =====
  // Código mejorado para la reproducción de video
  const video = document.getElementById("boomerangVideo");
  const playButton = document.querySelector(".play-btn-parent-01");
  const muteToggle = document.getElementById("muteToggle");
  const resetVideo = document.getElementById("resetVideo");
  const loadingIndicator = document.getElementById("loadingIndicator");
  const loadingBar = document.getElementById("loadingBar");
  // Definir las referencias a los elementos de UI
  const playIcon = document.querySelector(".play-icon");
  const textRing = document.querySelector(".text-ring");

  if (video && playButton) {
    // Inicializar variables
    let isPlaying = false;
    let videoError = false;
    let retryCount = 0;
    const MAX_RETRIES = 3;

    // Función para mostrar el indicador de carga
    function showLoading() {
      if (loadingIndicator) {
        loadingIndicator.style.display = "block";
      }
    }

    // Función para ocultar el indicador de carga
    function hideLoading() {
      if (loadingIndicator) {
        loadingIndicator.style.display = "none";
        if (loadingBar) loadingBar.style.width = "0%";
      }
    }

    // Actualizar barra de progreso de carga
    video.addEventListener("progress", function () {
      if (video.buffered.length > 0 && loadingBar) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          const loadProgress = (bufferedEnd / duration) * 100;
          loadingBar.style.width = loadProgress + "%";
        }
      }
    });

    // Mostrar botón de reproducción siempre que el video esté pausado
    function showPlayButton() {
      playButton.style.opacity = "1";
      playButton.style.visibility = "visible";
    }

    function hidePlayButton() {
      playButton.style.opacity = "0";
      playButton.style.visibility = "hidden";
    }

    // Detectar cuando el video está listo para reproducirse
    video.addEventListener("canplay", function () {
      console.log("Video cargado y listo para reproducirse");
      hideLoading();
    });

    // Detectar buffering
    video.addEventListener("waiting", function () {
      console.log("Buffering: esperando datos de video...");
      showLoading();
    });

    // Detectar cuando el video se está reproduciendo
    video.addEventListener("playing", function () {
      console.log("Video reproduciendo");
      isPlaying = true;
      hideLoading();
      hidePlayButton();

      // Animación de éxito al iniciar el video
      if (playButton) {
        playButton.style.animation = "pulse 0.5s ease-out";
      }
    });

    // Detectar cuando el video se pausa
    video.addEventListener("pause", function () {
      console.log("Video pausado");
      isPlaying = false;
      showPlayButton();
    });

    // Detectar cuando el video finaliza
    video.addEventListener("ended", function () {
      console.log("Video finalizado");
      isPlaying = false;
      showPlayButton();
    });

    // Manejar errores de video
    video.addEventListener("error", function (e) {
      videoError = true;
      console.error("Error de video:", e);
      console.error(
        "Código de error:",
        video.error ? video.error.code : "desconocido"
      );

      showPlayButton();

      if (retryCount < MAX_RETRIES) {
        console.log(
          `Intentando recuperar (intento ${
            retryCount + 1
          } de ${MAX_RETRIES})...`
        );
        retryCount++;
        setTimeout(resetVideoPlayer, 1000);
      } else {
        console.error("Número máximo de intentos excedido");
        alert(
          "Lo sentimos, hay un problema con la reproducción del video. Por favor, intenta recargar la página."
        );
      }
    });

    // Manejar situaciones cuando el video se atasca
    let stallTimer;
    video.addEventListener("timeupdate", function () {
      // Limpiar cualquier temporizador existente
      if (stallTimer) clearTimeout(stallTimer);

      // Establecer un nuevo temporizador
      stallTimer = setTimeout(function () {
        if (isPlaying && !video.paused) {
          console.warn(
            "Video posiblemente atascado (sin actualizaciones por 3 segundos)"
          );
          // Intentar recuperar sin reiniciar completamente
          const currentTime = video.currentTime;
          video.currentTime = currentTime + 0.5;
        }
      }, 3000);
    });

    // Función para reiniciar el reproductor de video
    function resetVideoPlayer() {
      console.log("Reiniciando reproductor de video...");

      // Guardar el estado actual
      const wasMuted = video.muted;
      const wasPlaying = !video.paused;
      const currentTime = video.paused ? 0 : video.currentTime;

      // Reiniciar el reproductor
      video.pause();
      video.removeAttribute("src");
      video.load();

      // Volver a añadir las fuentes
      const sources = video.querySelectorAll("source");
      for (let i = 0; i < sources.length; i++) {
        const source = sources[i];
        const src = source.getAttribute("src");
        source.setAttribute("src", src + "?reload=" + new Date().getTime());
      }

      // Recargar el video
      video.load();

      // Restaurar el estado
      video.currentTime = currentTime;
      video.muted = wasMuted;

      if (wasPlaying) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.error("Error al reanudar reproducción:", e);
            showPlayButton();
          });
        }
      }
    }

    // Asociar la función de reinicio al botón
    if (resetVideo) {
      resetVideo.addEventListener("click", function () {
        resetVideoPlayer();
      });
    }

    // Manejar clic en el botón de reproducción
    playButton.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Botón de reproducción clickeado");

      if (videoError) {
        resetVideoPlayer();
        videoError = false;
      }

      if (video.paused) {
        showLoading();

        // Intentar reproducir
        const playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Video reproduciendo correctamente");
              hidePlayButton();
            })
            .catch((error) => {
              console.error("Error al reproducir:", error);

              // Si falla, intentar con mute primero (política de autoplay)
              video.muted = true;
              video
                .play()
                .then(() => {
                  console.log("Video reproduciendo en modo silencioso");
                  hidePlayButton();

                  // Mostrar mensaje para activar audio
                  const audioMessage = document.createElement("div");
                  audioMessage.innerHTML = "Haz clic para activar el audio";
                  audioMessage.style.cssText =
                    "position: absolute; top: 10px; left: 0; right: 0; text-align: center; background: rgba(255,105,0,0.8); color: white; padding: 10px; cursor: pointer; z-index: 20;";

                  audioMessage.addEventListener("click", function () {
                    video.muted = false;
                    if (muteToggle) muteToggle.textContent = "🔊";
                    this.remove();
                  });

                  video.parentElement.appendChild(audioMessage);
                })
                .catch((e) => {
                  console.error("Error incluso en modo silencioso:", e);
                  showPlayButton();
                  alert(
                    "Tu navegador está bloqueando la reproducción de video. Intenta habilitar la reproducción automática en la configuración."
                  );
                });
            });
        }
      } else {
        video.pause();
        showPlayButton();
      }
    });

    // Manejar el botón de silencio
    if (muteToggle) {
      muteToggle.addEventListener("click", function () {
        video.muted = !video.muted;
        this.textContent = video.muted ? "🔇" : "🔊";
      });
    }

    // Efecto de hover en el botón
    if (playIcon && textRing) {
      playButton.addEventListener("mouseenter", function () {
        // Aumentar la velocidad de rotación del anillo
        textRing.style.animationDuration = "5s";
        playIcon.style.transform = "scale(1.2)";
      });

      playButton.addEventListener("mouseleave", function () {
        // Restaurar la velocidad normal
        textRing.style.animationDuration = "10s";
        playIcon.style.transform = "scale(1)";
      });
    }

    // Precargar video para evitar problemas
    if (video.readyState === 0) {
      console.log("Precargando video...");
      video.load();
    }

    // Si hay problemas, usar opciones de reproducción alternativas
    if (navigator.userAgent.toLowerCase().indexOf("mobile") > -1) {
      console.log(
        "Dispositivo móvil detectado, ajustando configuración de video"
      );
      video.setAttribute("playsinline", "");
      video.setAttribute("preload", "metadata");
    }

    // Forzar carga del video después de un breve retraso
    setTimeout(() => {
      if (video.readyState === 0) {
        console.log("Forzando carga del video");
        video.load();
      }
    }, 1000);
  } else {
    console.error("No se encontraron los elementos de video necesarios");
    if (!video) console.error("- Elemento de video no encontrado");
    if (!playButton) console.error("- Botón de reproducción no encontrado");
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
  let handle;

  function startBlink() {
    handle = setInterval(() => {
      const blink = document.querySelector(".blink");
      blink.style.visibility =
        blink.style.visibility === "hidden" ? "visible" : "hidden";
    }, 500);
  }

  function stopBlink() {
    const blink = document.querySelector(".blink");
    blink.style.visibility = "visible";
    clearInterval(handle);
  }

  // Opciones específicas para Boomerang
  const options = [
    "Innova",
    "Crea",
    "Logra",
    "Transforma",
    "Impulsa",
    "Conecta",
    "Evoluciona",
    "Destaca",
    "Revoluciona",
  ];

  async function replaceTyper() {
    const typer = document.getElementById("typer");
    const current = typer.innerText;
    const next = options[(options.indexOf(current) + 1) % options.length];

    const CHAR_DELAY = 60; // Un poco más lento para mejor lectura
    const WORD_DELAY = 3000; // Más tiempo para leer

    stopBlink();

    // Borrar texto actual
    while (typer.innerText.length > 0) {
      typer.innerText = typer.innerText.slice(0, -1);
      await new Promise((resolve) => setTimeout(resolve, CHAR_DELAY));
    }

    // Escribir nuevo texto
    for (let i = 0; i < next.length; i++) {
      typer.innerText += next[i];
      await new Promise((resolve) => setTimeout(resolve, CHAR_DELAY));
    }

    startBlink();

    // Esperar antes del siguiente cambio
    await new Promise((resolve) => setTimeout(resolve, WORD_DELAY));
    replaceTyper();
  }

  // Iniciar el efecto
  startBlink();
  setTimeout(() => {
    replaceTyper();
  }, 4000);
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
