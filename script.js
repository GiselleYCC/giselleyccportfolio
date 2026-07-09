// ============================================================
// SCRIPT.JS — Small behaviors for the portfolio
// ============================================================

// Wait until the full page has loaded before running anything
document.addEventListener('DOMContentLoaded', function () {

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

});
