/**
 * Logica per la schermata "Chiedere Aiuto" (PariPasso)
 */
document.addEventListener('DOMContentLoaded', () => {
  // Accordion per la guida alla cancellazione della cronologia
  const toggleSafetyGuide = document.getElementById('toggle-safety-guide');
  const safetyGuideContent = document.getElementById('safety-guide-content');
  const guideArrow = document.getElementById('guide-arrow');

  if (toggleSafetyGuide && safetyGuideContent && guideArrow) {
    toggleSafetyGuide.addEventListener('click', () => {
      const isHidden = safetyGuideContent.classList.contains('hidden');
      if (isHidden) {
        safetyGuideContent.classList.remove('hidden');
        safetyGuideContent.classList.add('flex');
        guideArrow.classList.add('rotate-180');
      } else {
        safetyGuideContent.classList.add('hidden');
        safetyGuideContent.classList.remove('flex');
        guideArrow.classList.remove('rotate-180');
      }
    });
  }

  // Interattività della posizione (Mock GPS)
  const btnUseLocation = document.getElementById('btn-use-location');
  if (btnUseLocation) {
    btnUseLocation.addEventListener('click', () => {
      btnUseLocation.classList.toggle('bg-primary-fixed');
      btnUseLocation.classList.toggle('text-on-primary-fixed');
      const label = btnUseLocation.querySelector('span:last-child');
      if (label) {
        label.innerText = label.innerText.includes('Milano') 
          ? 'Posizione rilevata: Padova Centro (5 km)' 
          : 'Posizione approssimata: Milano e provincia';
      }
    });
  }

  // Interattività sui filtri orizzontali di supporto
  const filterButtons = document.querySelectorAll('#support-filters button');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.className = 'px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container font-label-sm text-label-sm font-medium whitespace-nowrap shrink-0 transition-colors';
      });
      btn.className = 'px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold whitespace-nowrap shadow-sm shrink-0';
    });
  });
});