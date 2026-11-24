/**
 * Logica schermata "Riconoscersi" (PariPasso)
 */
function toggleCard(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;
  const content = card.querySelector('[id^="content-"]');
  const icon = card.querySelector('[id^="icon-"]');
  if (!content || !icon) return;

  const isHidden = content.classList.contains('hidden');
  content.classList.toggle('hidden', !isHidden);
  icon.classList.toggle('is-rotated', isHidden);
}

function openSpecificCard(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;
  card.classList.remove('hidden');
  const content = card.querySelector('[id^="content-"]');
  const icon = card.querySelector('[id^="icon-"]');
  if (content) content.classList.remove('hidden');
  if (icon) icon.classList.add('is-rotated');
}

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('#perspective-filters .filter-pill');
  const cards = document.querySelectorAll('#accordion-group article');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const selected = btn.getAttribute('data-filter');
      let firstOpened = false;

      cards.forEach((card) => {
        const list = (card.getAttribute('data-perspectives') || 'tutte').split(',');
        const matches = selected === 'tutte' || list.includes(selected);
        card.classList.toggle('hidden', !matches);

        if (matches && !firstOpened) {
          const content = card.querySelector('[id^="content-"]');
          const icon = card.querySelector('[id^="icon-"]');
          if (content) content.classList.remove('hidden');
          if (icon) icon.classList.add('is-rotated');
          firstOpened = true;
        }
      });
    });
  });

  document.querySelectorAll('.reflection-check').forEach((item) => {
    item.addEventListener('click', () => {
      const icon = item.querySelector('.check-icon');
      const isChecked = item.classList.toggle('is-checked');
      if (icon) {
        icon.textContent = isChecked ? 'check_circle' : 'radio_button_unchecked';
      }
    });
  });
});