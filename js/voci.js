/**
 * Logica schermata "Voci" (PariPasso)
 */
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('#forum-filter-bar .filter-pill');
  const posts = document.querySelectorAll('.forum-post');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const category = btn.getAttribute('data-category');
      posts.forEach((post) => {
        const postCat = post.getAttribute('data-category');
        const show = category === 'all' || postCat === category;
        post.classList.toggle('hidden', !show);
      });
    });
  });

  const shareModal = document.getElementById('share-modal');
  const openShareBtn = document.getElementById('open-share-modal');
  const closeShareBtn = document.getElementById('close-share-modal');
  const doneShareBtn = document.getElementById('done-share-modal');
  const form = document.getElementById('anonymous-post-form');
  const confirmation = document.getElementById('post-confirmation');
  const codeBox = document.getElementById('generated-code');
  const postsList = document.getElementById('forum-posts-list');

  function closeShareModal() {
    if (!shareModal) return;
    shareModal.classList.remove('is-open');
    setTimeout(() => {
      if (form) {
        form.reset();
        form.classList.remove('hidden');
      }
      if (confirmation) confirmation.classList.add('hidden');
    }, 200);
  }

  if (openShareBtn && shareModal) {
    openShareBtn.addEventListener('click', () => shareModal.classList.add('is-open'));
  }
  if (closeShareBtn) closeShareBtn.addEventListener('click', closeShareModal);
  if (doneShareBtn) doneShareBtn.addEventListener('click', closeShareModal);
  if (shareModal) {
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) closeShareModal();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const cat = document.getElementById('post-category').value;
      const text = document.getElementById('post-text').value.trim();
      if (!text) return;

      const randomCode = 'PP-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.floor(100 + Math.random() * 899);
      if (codeBox) codeBox.textContent = randomCode;

      const catLabels = {
        domande: 'Domande agli esperti',
        economica: 'Autonomia economica',
        segnali: 'Relazioni & Segnali',
        legale: 'Supporto legale'
      };
      if (postsList) {
        const article = document.createElement('article');
        article.className = 'forum-post editorial-card stack-sm accent-cyan';
        article.setAttribute('data-category', cat);
        article.innerHTML = `
          <div class="row-between-start">
            <div class="row-start" style="align-items: center;">
              <div class="icon-badge-round bg-soft-cyan font-display" style="font-weight: 700;">V</div>
              <div>
                <p style="font-size: 0.8rem; font-weight: 700; color: var(--ink-primary);">Voce simbolica · Nuova nota</p>
                <p class="small-copy" style="font-size: 0.72rem;">${catLabels[cat] || 'Comunità'} • In attesa di moderazione preventiva</p>
              </div>
            </div>
            <span class="pill-badge bg-soft-cyan">Anonimo</span>
          </div>
          <p class="body-copy text-ink"></p>
        `;
        article.querySelector('p.body-copy').textContent = text;
        postsList.prepend(article);
      }

      form.classList.add('hidden');
      if (confirmation) confirmation.classList.remove('hidden');
    });
  }
});