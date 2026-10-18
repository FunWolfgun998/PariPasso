document.addEventListener('DOMContentLoaded', () => {
  // Evidenzia automaticamente la scheda corretta nella barra di navigazione inferiore
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a[data-path]');

  navLinks.forEach(link => {
    const target = link.getAttribute('data-path');
    const isCurrent = (currentPath.includes(target)) || (target === 'home' && currentPath === 'index.html');

    if (isCurrent && target !== 'chiedere-aiuto') {
      link.classList.remove('text-text-muted');
      link.classList.add('text-primary-container', 'font-semibold');
    }
  });

  // Gestione click su elementi con attributo data-nav
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const destination = el.getAttribute('data-nav');
      window.location.href = `${destination}.html`;
    });
  });
});