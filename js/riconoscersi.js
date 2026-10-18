/**
 * Logica per la schermata "Riconoscersi" (PariPasso)
 */

function toggleCard(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;
  const content = card.querySelector('[id^="content-"]');
  const icon = card.querySelector('[id^="icon-"]');
  if (!content || !icon) return;

  const isHidden = content.classList.contains('hidden');
  if (isHidden) {
    content.classList.remove('hidden');
    icon.classList.add('rotate-180');
  } else {
    content.classList.add('hidden');
    icon.classList.remove('rotate-180');
  }
}

function openExerciseModal() {
  const modal = document.getElementById('exercise-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeExerciseModal() {
  const modal = document.getElementById('exercise-modal');
  if (modal) modal.classList.add('hidden');
}

// Gestione dei filtri per prospettiva (Tutte, Donne, Uomini, Giovani)
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('#perspective-filters button');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.className = 'px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-text-body font-button-label text-[13px] shadow-sm hover:bg-surface-subtle transition-all whitespace-nowrap active:scale-95';
      });
      btn.className = 'px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-button-label text-[13px] shadow-sm transition-all whitespace-nowrap active:scale-95';
    });
  });
});