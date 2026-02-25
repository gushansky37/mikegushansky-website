/* ==========================================================================
   Mike Gushansky — Global JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Fade-in on Scroll (IntersectionObserver) --- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => observer.observe(el));
  }

  /* --- Mobile Hamburger Menu --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  /* =======================================================================
     PHOTOS PAGE — Carousel
     ======================================================================= */
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel__track');
    const slides = carousel.querySelectorAll('.carousel__slide');
    const prevBtn = carousel.querySelector('.carousel__arrow--prev');
    const nextBtn = carousel.querySelector('.carousel__arrow--next');
    const dotsContainer = carousel.querySelector('.carousel__dots');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel__dot') : [];
    let currentSlide = 0;
    let autoAdvance;
    const slideCount = slides.length;

    function goToSlide(index) {
      if (index < 0) index = slideCount - 1;
      if (index >= slideCount) index = 0;
      currentSlide = index;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('carousel__dot--active', i === currentSlide);
      });
    }

    function startAutoAdvance() {
      stopAutoAdvance();
      autoAdvance = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    function stopAutoAdvance() {
      if (autoAdvance) clearInterval(autoAdvance);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); startAutoAdvance(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); startAutoAdvance(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); startAutoAdvance(); });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (document.querySelector('.lightbox.active')) return;
      if (e.key === 'ArrowLeft') { goToSlide(currentSlide - 1); startAutoAdvance(); }
      if (e.key === 'ArrowRight') { goToSlide(currentSlide + 1); startAutoAdvance(); }
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);

    startAutoAdvance();
  }

  /* =======================================================================
     PHOTOS PAGE — Gallery image lazy fade-in
     ======================================================================= */
  const galleryImages = document.querySelectorAll('.gallery__item img');
  if (galleryImages.length) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
          if (img.complete) img.classList.add('loaded');
          imgObserver.unobserve(img);
        }
      });
    }, { threshold: 0.05 });
    galleryImages.forEach(img => imgObserver.observe(img));
  }

  /* =======================================================================
     PHOTOS PAGE — Lightbox
     ======================================================================= */
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevArrow = lightbox.querySelector('.lightbox__arrow--prev');
    const nextArrow = lightbox.querySelector('.lightbox__arrow--next');
    const galleryItems = document.querySelectorAll('.gallery__item');
    let lightboxIndex = 0;

    const gallerySrcs = [];
    galleryItems.forEach(item => {
      const img = item.querySelector('img');
      gallerySrcs.push(img.dataset.src || img.src);
    });

    function openLightbox(index) {
      lightboxIndex = index;
      lightboxImg.src = gallerySrcs[index];
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function lightboxNav(dir) {
      lightboxIndex += dir;
      if (lightboxIndex < 0) lightboxIndex = gallerySrcs.length - 1;
      if (lightboxIndex >= gallerySrcs.length) lightboxIndex = 0;
      lightboxImg.src = gallerySrcs[lightboxIndex];
    }

    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevArrow.addEventListener('click', () => lightboxNav(-1));
    nextArrow.addEventListener('click', () => lightboxNav(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxNav(-1);
      if (e.key === 'ArrowRight') lightboxNav(1);
    });
  }

  /* =======================================================================
     SOUNDS PAGE — Mix Modal
     ======================================================================= */
  const mixModal = document.querySelector('.mix-modal');
  if (mixModal) {
    const modalEmbed = mixModal.querySelector('.mix-modal__embed');
    const modalClose = mixModal.querySelector('.mix-modal__close');
    const mixCards = document.querySelectorAll('.mix-card');

    function openMixModal(videoId) {
      modalEmbed.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
      mixModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMixModal() {
      mixModal.classList.remove('active');
      modalEmbed.innerHTML = '';
      document.body.style.overflow = '';
    }

    mixCards.forEach(card => {
      card.addEventListener('click', () => {
        const videoId = card.dataset.videoId;
        if (videoId) openMixModal(videoId);
      });
    });

    modalClose.addEventListener('click', closeMixModal);
    mixModal.addEventListener('click', (e) => {
      if (e.target === mixModal) closeMixModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mixModal.classList.contains('active')) closeMixModal();
    });
  }

  /* =======================================================================
     CONTACT PAGE — Form Success
     ======================================================================= */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(() => {
        contactForm.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
      })
      .catch(() => {
        contactForm.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
      });
    });
  }

});
