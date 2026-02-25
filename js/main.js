/* ==========================================================================
   Mike Gushansky — Global JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {

  /* --- Fade-in on Scroll (IntersectionObserver) --- */
  window.initFadeIn = function() {
    var fadeEls = document.querySelectorAll('.fade-in:not(.visible)');
    if (fadeEls.length) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      fadeEls.forEach(function(el) { observer.observe(el); });
    }
  };

  /* --- Mobile Hamburger Menu --- */
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  /* --- Carousel --- */
  window.initCarousel = function() {
    if (window.__carouselInit) return;
    var carousel = document.querySelector('.carousel');
    if (!carousel) return;
    var track = carousel.querySelector('.carousel__track');
    var slides = carousel.querySelectorAll('.carousel__slide');
    var prevBtn = carousel.querySelector('.carousel__arrow--prev');
    var nextBtn = carousel.querySelector('.carousel__arrow--next');
    var dotsContainer = carousel.querySelector('.carousel__dots');
    var dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel__dot') : [];
    var currentSlide = 0;
    var autoAdvance;
    var slideCount = slides.length;
    if (slideCount === 0) return;
    window.__carouselInit = true;

    function goToSlide(index) {
      if (index < 0) index = slideCount - 1;
      if (index >= slideCount) index = 0;
      currentSlide = index;
      track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
      dots.forEach(function(dot, i) {
        dot.classList.toggle('carousel__dot--active', i === currentSlide);
      });
    }

    function startAutoAdvance() {
      stopAutoAdvance();
      autoAdvance = setInterval(function() { goToSlide(currentSlide + 1); }, 5000);
    }

    function stopAutoAdvance() {
      if (autoAdvance) clearInterval(autoAdvance);
    }

    if (prevBtn) prevBtn.addEventListener('click', function() { goToSlide(currentSlide - 1); startAutoAdvance(); });
    if (nextBtn) nextBtn.addEventListener('click', function() { goToSlide(currentSlide + 1); startAutoAdvance(); });

    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() { goToSlide(i); startAutoAdvance(); });
    });

    document.addEventListener('keydown', function(e) {
      if (document.querySelector('.lightbox.active')) return;
      if (e.key === 'ArrowLeft') { goToSlide(currentSlide - 1); startAutoAdvance(); }
      if (e.key === 'ArrowRight') { goToSlide(currentSlide + 1); startAutoAdvance(); }
    });

    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);
    startAutoAdvance();
  };

  /* --- Gallery Image Lazy Fade-in --- */
  window.initGalleryImages = function() {
    var galleryImages = document.querySelectorAll('.gallery__item img');
    if (!galleryImages.length) return;
    var imgObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          img.addEventListener('load', function() { img.classList.add('loaded'); }, { once: true });
          if (img.complete) img.classList.add('loaded');
          imgObserver.unobserve(img);
        }
      });
    }, { threshold: 0.05 });
    galleryImages.forEach(function(img) { imgObserver.observe(img); });
  };

  /* --- Lightbox --- */
  window.initLightbox = function() {
    if (window.__lightboxInit) return;
    var lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;
    var lightboxImg = lightbox.querySelector('.lightbox__img');
    var closeBtn = lightbox.querySelector('.lightbox__close');
    var prevArrow = lightbox.querySelector('.lightbox__arrow--prev');
    var nextArrow = lightbox.querySelector('.lightbox__arrow--next');
    var galleryItems = document.querySelectorAll('.gallery__item');
    if (!galleryItems.length) return;
    window.__lightboxInit = true;
    var lightboxIndex = 0;

    var gallerySrcs = [];
    galleryItems.forEach(function(item) {
      var img = item.querySelector('img');
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

    galleryItems.forEach(function(item, i) {
      item.addEventListener('click', function() { openLightbox(i); });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevArrow.addEventListener('click', function() { lightboxNav(-1); });
    nextArrow.addEventListener('click', function() { lightboxNav(1); });

    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxNav(-1);
      if (e.key === 'ArrowRight') lightboxNav(1);
    });
  };

  /* --- Mix Modal --- */
  window.initMixModal = function() {
    if (window.__mixModalInit) return;
    var mixModal = document.querySelector('.mix-modal');
    if (!mixModal) return;
    var modalEmbed = mixModal.querySelector('.mix-modal__embed');
    var modalClose = mixModal.querySelector('.mix-modal__close');
    var mixCards = document.querySelectorAll('.mix-card');
    if (!mixCards.length) return;
    window.__mixModalInit = true;

    function openMixModal(videoId) {
      modalEmbed.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoId + '?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      mixModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMixModal() {
      mixModal.classList.remove('active');
      modalEmbed.innerHTML = '';
      document.body.style.overflow = '';
    }

    mixCards.forEach(function(card) {
      card.addEventListener('click', function() {
        var videoId = card.dataset.videoId;
        if (videoId) openMixModal(videoId);
      });
    });

    modalClose.addEventListener('click', closeMixModal);
    mixModal.addEventListener('click', function(e) {
      if (e.target === mixModal) closeMixModal();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mixModal.classList.contains('active')) closeMixModal();
    });
  };

  /* --- Contact Form --- */
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(contactForm);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(function() {
        contactForm.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
      })
      .catch(function() {
        contactForm.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
      });
    });
  }

  /* --- Auto-init for static pages (skipped on dynamic pages) --- */
  if (!window.__dynamicContent) {
    window.initFadeIn();
    window.initCarousel();
    window.initGalleryImages();
    window.initLightbox();
    window.initMixModal();
  } else {
    window.initFadeIn();
  }

});

/* --- Shared utility --- */
window.escapeHTML = function(str) {
  if (!str) return '';
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};
