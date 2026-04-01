/* ============================================================
   MAIN JS — Minimal interactivity
   Navigation toggle, scroll effects, intersection observer,
   portfolio filters, form validation
   ============================================================ */

(function () {
  'use strict';

  // ---------- DOM References ----------
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const contactForm = document.getElementById('contactForm');
  const filterBtns = document.querySelectorAll('.gallery__filter-btn');
  const videoCards = document.querySelectorAll('.gallery__grid .video-card, .gallery__grid .project-card');

  // ---------- Mobile Navigation Toggle ----------
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Sticky Nav — Background on Scroll ----------
  function handleNavScroll() {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Run on load

  // ---------- Intersection Observer — Fade-in Animations ----------
  var animatedElements = document.querySelectorAll(
    '.fade-in, .fade-in-left, .fade-in-right'
  );

  if ('IntersectionObserver' in window && animatedElements.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements if IntersectionObserver is unavailable
    animatedElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ---------- Portfolio Filters ----------
  if (filterBtns.length && videoCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Update active state
        filterBtns.forEach(function (b) {
          b.classList.remove('gallery__filter-btn--active');
        });
        btn.classList.add('gallery__filter-btn--active');

        var filter = btn.getAttribute('data-filter');

        videoCards.forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ---------- Contact Form — Basic Client-Side Validation ----------
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.querySelector('#name');
      var email = contactForm.querySelector('#email');
      var message = contactForm.querySelector('#message');
      var isValid = true;

      // Simple validation
      [name, email, message].forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = '#e74c3c';
          isValid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      // Basic email format check
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = '#e74c3c';
        isValid = false;
      }

      if (isValid) {
        // Success feedback (replace with actual form submission)
        var submitBtn = contactForm.querySelector('button[type="submit"]');
        var originalText = submitBtn.textContent;

        submitBtn.textContent = 'Message Sent!';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        setTimeout(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '';
          contactForm.reset();
        }, 3000);
      }
    });

    // Remove error styling on input
    contactForm.querySelectorAll('input, textarea, select').forEach(function (field) {
      field.addEventListener('input', function () {
        field.style.borderColor = '';
      });
    });
  }
})();
