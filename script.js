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
      e.preventDefault(); // stop the default jump behavior

      // Find which section this link points to (e.g. #work → .work section)
      const targetId = link.getAttribute('href'); // e.g. "#work"
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

});
