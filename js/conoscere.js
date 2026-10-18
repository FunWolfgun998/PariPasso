(function() {
  const searchInput = document.getElementById('guide-search');
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.article-card');
  const noResults = document.getElementById('no-results');
  const resetBtn = document.getElementById('reset-filters');

  let currentCategory = 'all';
  let currentQuery = '';

  function filterArticles() {
    let visibleCount = 0;
    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const title = card.querySelector('h2')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
      
      const matchesCategory = (currentCategory === 'all' || cat === currentCategory);
      const matchesQuery = (currentQuery === '' || title.includes(currentQuery) || desc.includes(currentQuery));

      if (matchesCategory && matchesQuery) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (noResults) {
      noResults.classList.toggle('hidden', visibleCount > 0);
    }
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => {
        c.classList.remove('bg-primary', 'text-on-primary', 'active');
        c.classList.add('bg-surface-container-lowest', 'text-on-surface-variant');
      });
      chip.classList.add('bg-primary', 'text-on-primary', 'active');
      chip.classList.remove('bg-surface-container-lowest', 'text-on-surface-variant');
      currentCategory = chip.getAttribute('data-category');
      filterArticles();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentQuery = e.target.value.trim().toLowerCase();
      filterArticles();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      currentQuery = '';
      const firstChip = chips[0];
      if (firstChip) firstChip.click();
    });
  }
})();