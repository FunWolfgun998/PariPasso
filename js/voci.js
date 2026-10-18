/**
 * Logica per la schermata "Voci" (PariPasso)
 * Gestione dei filtri delle categorie del forum
 */
document.addEventListener('DOMContentLoaded', () => {
  const filterContainer = document.getElementById('forum-filter-bar');
  if (!filterContainer) return;

  const buttons = filterContainer.querySelectorAll('button');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Reimposta lo stile non attivo su tutti i bottoni
      buttons.forEach(b => {
        b.className = 'shrink-0 px-3.5 py-1.5 rounded-full bg-surface-container text-text-body font-button-label text-caption-meta hover:bg-surface-variant transition-all active:scale-95';
      });
      
      // Attiva il bottone cliccato
      btn.className = 'shrink-0 px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary font-button-label text-caption-meta shadow-sm transition-all active:scale-95';
      
      const category = btn.getAttribute('data-category');
      console.log(`Filtro forum selezionato: ${category}`);
      // Qui è possibile collegare la chiamata per filtrare dinamicamente i post
    });
  });
});