// ============================================================
// SCRIPT.JS — Small behaviors for the portfolio
// ============================================================

// Wait until the full page has loaded before running anything
document.addEventListener('DOMContentLoaded', function () {

  // ----------------------------------------------------------
  // MOBILE NAV — hamburger toggle
  // On small screens the links collapse into a dropdown.
  // The button opens/closes it; tapping any link closes it.
  // No-ops on pages without a .nav-toggle.
  // ----------------------------------------------------------
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');

  if (nav && navToggle) {
    navToggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    nav.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // ----------------------------------------------------------
  // SMOOTH SCROLL
  // When a nav link is clicked, the page scrolls smoothly
  // to that section instead of jumping instantly.
  // ----------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = link.getAttribute('href'); // e.g. "#work"

      // Only intercept in-page anchor links (#section).
      // External/file links like the Resume PDF must open normally.
      if (!targetId || targetId.charAt(0) !== '#') {
        return;
      }

      e.preventDefault(); // stop the default jump behavior

      // Find which section this link points to (e.g. #work → .work section)
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Scroll smoothly to that section
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ----------------------------------------------------------
  // ACTIVE NAV HIGHLIGHT
  // As you scroll down, the matching nav link turns darker
  // so you always know which section you are in.
  // ----------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function highlightNav () {
    let currentSection = '';

    sections.forEach(function (section) {
      // Check if this section is in the upper part of the viewport
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    // Special case: if scrolled to near the bottom of the page,
    // force the last section (contact) active — its offsetTop may be
    // unreachable via normal scroll detection on shorter viewport heights.
    const nearBottom =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50;
    if (nearBottom && sections.length > 0) {
      currentSection = sections[sections.length - 1].getAttribute('id');
    }

    // Remove active class from all links, then add to the current one
    navLinks.forEach(function (link) {
      link.classList.remove('nav-active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('nav-active');
      }
    });
  }

  // Run on scroll and once on load
  window.addEventListener('scroll', highlightNav);
  highlightNav();

  // ----------------------------------------------------------
  // PROJECT CHAPTER NAV
  // Case study pages have a fixed side rail of section numbers
  // (see .proj-chapters in project-base.css). This highlights
  // whichever section is currently centered in the viewport.
  // No-ops entirely on pages without the rail, like the homepage.
  // ----------------------------------------------------------
  const chapterLinks = document.querySelectorAll('.proj-chapter-link');

  if (chapterLinks.length > 0) {
    const chapterSections = Array.from(chapterLinks)
      .map(function (link) {
        return document.getElementById(link.getAttribute('href').slice(1));
      })
      .filter(Boolean);

    const setActiveChapter = function (id) {
      chapterLinks.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
      });
    };

    // Shrinks the observation area to a thin band near vertical
    // center — whichever section crosses that band is "current".
    const chapterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    chapterSections.forEach(function (section) {
      chapterObserver.observe(section);
    });
  }


  /* ── IMAGE LIGHTBOX ──────────────────────────────────────────
     Case-study pages only: click any content image to open it
     full-screen. Uses the native <dialog>, so Esc closes it and
     focus is trapped without any extra code. */
  if (document.querySelector('.proj-title') || document.querySelector('.about-personal')) {
    // Every content image on the page. Selecting by container missed
    // images that sit directly under <body> (the Roadtrip screenshots),
    // so take them all and exclude the chrome instead.
    // On a case study: every content image. On the homepage: only the
    // Personal Index photos, which are deliberately small — the album
    // covers are links to Spotify and must keep that click.
    const scope = document.querySelector('.proj-title')
      ? document.querySelectorAll('img')
      : document.querySelectorAll('.pi-note img, .pi-pair img');

    const zoomables = [].filter.call(scope, function (img) {
      return !img.closest('.proj-nav, .proj-nav-footer, .proj-footer, .proj-chapters, .pi-cover');
    });

    if (zoomables.length) {
      const dialog = document.createElement('dialog');
      dialog.className = 'lightbox';
      dialog.innerHTML =
        '<button class="lightbox-close" aria-label="Close image">\u2715</button>' +
        '<div class="lightbox-inner">' +
        '<img class="lightbox-img" alt="">' +
        '<p class="lightbox-caption"></p>' +
        '</div>';
      document.body.appendChild(dialog);

      const bigImg = dialog.querySelector('.lightbox-img');
      const caption = dialog.querySelector('.lightbox-caption');

      zoomables.forEach(function (img) {
        img.classList.add('zoomable');
        img.addEventListener('click', function () {
          bigImg.src = img.currentSrc || img.src;
          bigImg.alt = img.alt || '';
          caption.textContent = img.alt || '';
          dialog.showModal();
        });
      });

      // Click anywhere (the image included) or the X to close.
      dialog.addEventListener('click', function () { dialog.close(); });

      // Free the large image once closed so it is not kept in memory.
      dialog.addEventListener('close', function () { bigImg.removeAttribute('src'); });
    }
  }

});
