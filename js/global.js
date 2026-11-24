/**
 * Logica globale PariPasso:
 * - Evidenziazione attiva sincronizzata su Top Nav (Desktop) e Bottom Nav (Mobile)
 * - Uscita rapida sicura (location.replace)
 * - Chiusura modali con ESC
 */
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('[data-nav-target]');

  navLinks.forEach((link) => {
    const target = link.getAttribute('data-nav-target');
    const isMatch =
      (target === 'home' && (path === '' || path === 'index.html')) ||
      (target !== 'home' && path.includes(target));

    if (isMatch) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('.quick-exit-trigger').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      try {
        window.location.replace('https://www.google.com');
      } catch (_) {
        window.location.href = 'https://www.google.com';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.pp-modal-backdrop.is-open').forEach((modal) => {
        modal.classList.remove('is-open');
      });
    }
  });
});