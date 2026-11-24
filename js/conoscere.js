/**
 * Logica schermata "Conoscere" (PariPasso):
 * - Filtri per categoria + ricerca per parole chiave
 * - Modale di lettura articolo completo
 * - Player interattivo per le audio-pillole da 60 secondi
 */
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('guide-search');
  const chips = document.querySelectorAll('#guide-filters .filter-pill');
  const cards = document.querySelectorAll('.article-card');
  const noResults = document.getElementById('no-results');
  const resetBtn = document.getElementById('reset-filters');

  let currentCategory = 'all';
  let currentQuery = '';

  function filterArticles() {
    let visibleCount = 0;
    cards.forEach((card) => {
      const cat = card.getAttribute('data-category');
      const title = card.querySelector('h2')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('p')?.textContent.toLowerCase() || '';

      const matchesCategory = currentCategory === 'all' || cat === currentCategory;
      const matchesQuery = currentQuery === '' || title.includes(currentQuery) || desc.includes(currentQuery);

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

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
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
      if (chips[0]) chips[0].click();
    });
  }

  const articlesContent = {
    '1': {
      kicker: 'Parità & Quotidiano',
      title: 'Parità di genere: che cosa significa nella vita di ogni giorno',
      paragraphs: [
        'La parità non è un concetto astratto né significa annullare le differenze individuali, biologiche o caratteriali: quelle differenze rappresentano una ricchezza. Parità significa garantire a ogni persona uguale dignità, autonomia e possibilità di scelta.',
        'Nelle relazioni quotidiane si misura nella condivisione equa del carico mentale e della cura familiare, nel rispetto dei progetti lavorativi o di studio di entrambi e nella libertà di esprimere il proprio dissenso senza temere tensioni.',
        'Superare i ruoli rigidi ereditati fin dall’infanzia — secondo cui la cura spetterebbe alle donne e il comando agli uomini — migliora la qualità affettiva della vita di tutti.'
      ]
    },
    '2': {
      kicker: 'Consapevolezza · I dati del sommerso',
      title: 'Violenza sulle donne: come riconoscerla prima dell’emergenza',
      paragraphs: [
        'La violenza raramente nasce all’improvviso: quasi sempre è il punto d’arrivo di un percorso graduale e silenzioso fatto di battute svalutanti, limiti imposti un passo alla volta e assuefazione a ciò che toglie libertà.',
        'Secondo i dati ISTAT (donne 16–75 anni), il 31,9% ha subito violenza fisica o sessuale, il 17,9% violenza psicologica in coppia e il 6,6% violenza economica. Eppure appena il 10,5% sporge denuncia: quasi 9 casi su 10 restano nella zona grigia.',
        'Riconoscere le forme non fisiche — umiliazioni, isolamento affettivo, controllo del denaro — è il primo passo per dare un nome a ciò che accade.'
      ]
    },
    '3': {
      kicker: 'Campanelli d’allarme',
      title: 'Controllo mascherato da premura e violenza economica',
      paragraphs: [
        '«L’interesse autentico lascia spazio e autonomia, il controllo riduce i margini di libertà e toglie respiro al legame.»',
        'Controllare lo smartphone, chiedere la posizione GPS in tempo reale o pretendere risposte immediate viene spesso giustificato come gelosia o affetto, ma limita la sfera privata. Allo stesso modo, isolare gradualmente l’altra persona da amicizie e passioni restringe il suo mondo relazionale.',
        'La violenza economica agisce in silenzio: dover giustificare ogni minima spesa, essere esclusi dalle decisioni economiche o ostacolati nello studio e nel lavoro rende materialmente più difficile uscire da una relazione dannosa.'
      ]
    },
    '4': {
      kicker: 'Supporto & Aiuto',
      title: 'Chiedere aiuto in modo riservato e sicuro',
      paragraphs: [
        'Non serve attendere una situazione estrema per confrontarsi con persone competenti. Puoi chiamare gratuitamente il 1522 (attivo 24 ore su 24 anche via chat su 1522.eu): le operatrici rispondono in anonimato senza giudicare e aiutano a valutare le opzioni disponibili.',
        'I Centri Antiviolenza (CAV) offrono gratuitamente ascolto psicologico, consulenza legale e percorsi di protezione personalizzati, rispettando sempre i tempi della persona.',
        'In caso di pericolo immediato, chiama il 112.'
      ]
    },
    '5': {
      kicker: 'Rete di prossimità',
      title: 'Come sostenere una persona vicina senza forzare i tempi',
      paragraphs: [
        'Familiari, amici, colleghi ed educatori notano spesso per primi i segnali di isolamento: rinunce frequenti agli incontri, timore delle reazioni del partner, cambiamento improvviso delle abitudini.',
        'La frase più utile è semplice e priva di giudizio: «Come stai? Se vuoi parlarne, ci sono». Evita di colpevolizzare o imporre ultimatum: chi vive pressioni ha bisogno di recuperare autonomia decisionale.',
        'Anche chi sta vicino può chiamare il 1522 o contattare un CAV per ricevere indicazioni su come offrire un supporto sicuro.'
      ]
    },
    '6': {
      kicker: 'Prevenzione primaria · Quadro RESPECT',
      title: 'Educazione al consenso e coinvolgimento di tutti',
      paragraphs: [
        'Secondo il quadro internazionale RESPECT (OMS e UN Women), la prevenzione primaria si fonda sulla trasformazione delle norme sociali, sull’educazione alle relazioni rispettose e sulla parità tra i giovani.',
        'Gli stereotipi rigidi limitano anche gli uomini, imponendo modelli di chiusura emotiva, prestazione continua e incapacità di chiedere aiuto. Mettere in discussione queste abitudini apre spazio a relazioni più serene e autentiche.'
      ]
    },
    '7': {
      kicker: 'Diritti & Tutele',
      title: 'Strumenti giuridici di protezione e sostegno',
      paragraphs: [
        'L’ordinamento italiano prevede strumenti specifici di tutela: dall’ammonimento del Questore per atti persecutori agli ordini di protezione e allontanamento dalla casa familiare.',
        'Le vittime di violenza possono accedere al patrocinio legale a spese dello Stato indipendentemente dal reddito per i reati previsti dalla normativa, oltre a congedi lavorativi retribuiti dedicati ai percorsi di protezione.'
      ]
    },
    '8': {
      kicker: 'Territorio',
      title: 'La sinergia tra presìdi territoriali',
      paragraphs: [
        'PariPasso non sostituisce né duplica i servizi già attivi, ma aiuta ad abbassare la soglia d’accesso e funge da ponte verso Centri Antiviolenza (CAV), Consultori pubblici, servizi sociali e sanitari, forze dell’ordine e reti regionali come Vivi Veneto.',
        'Nella sezione "Chiedi aiuto" puoi consultare i presìdi vicini e le modalità di contatto riservato.'
      ]
    }
  };

  const readerModal = document.getElementById('article-reader-modal');
  const readerKicker = document.getElementById('reader-kicker');
  const readerTitle = document.getElementById('reader-title');
  const readerBody = document.getElementById('reader-body');
  const closeReaderBtn = document.getElementById('close-reader-modal');

  document.querySelectorAll('.open-article-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-article-id');
      const data = articlesContent[id];
      if (!data || !readerModal) return;
      readerKicker.textContent = data.kicker;
      readerTitle.textContent = data.title;
      readerBody.innerHTML =
        data.paragraphs.map((p) => `<p>${p}</p>`).join('') +
        `<div class="row-wrap mt-2" style="padding-top: 0.9rem; border-top: 1px solid var(--border-navy);">
          <a href="riconoscersi.html" class="btn-soft">Rifletti in "Riconoscersi"</a>
          <a href="chiedere-aiuto.html" class="btn-navy">Trova ascolto sul territorio</a>
        </div>`;
      readerModal.classList.add('is-open');
    });
  });

  if (closeReaderBtn && readerModal) {
    closeReaderBtn.addEventListener('click', () => readerModal.classList.remove('is-open'));
    readerModal.addEventListener('click', (e) => {
      if (e.target === readerModal) readerModal.classList.remove('is-open');
    });
  }

  const audioTimers = {};
  document.querySelectorAll('.audio-play-btn').forEach((btn) => {
    const id = btn.getAttribute('data-audio-id');
    const card = btn.closest('article');
    const icon = btn.querySelector('.material-symbols-outlined');
    const timerEl = card.querySelector('.audio-timer');
    const statusEl = card.querySelector('.audio-status');
    const progressEl = document.getElementById(`audio-progress-${id}`);

    let seconds = 0;
    let playing = false;

    btn.addEventListener('click', () => {
      if (playing) {
        clearInterval(audioTimers[id]);
        playing = false;
        icon.textContent = 'play_arrow';
        statusEl.textContent = 'In pausa • Tocca per riprendere';
      } else {
        playing = true;
        icon.textContent = 'pause';
        statusEl.textContent = 'Riproduzione in corso...';
        audioTimers[id] = setInterval(() => {
          seconds++;
          if (seconds > 60) {
            seconds = 0;
            clearInterval(audioTimers[id]);
            playing = false;
            icon.textContent = 'play_arrow';
            statusEl.textContent = 'Ascolto completato • Riascolta';
          }
          const secFormatted = String(seconds).padStart(2, '0');
          timerEl.textContent = seconds === 60 ? '01:00 / 01:00' : `00:${secFormatted} / 01:00`;
          if (progressEl) progressEl.style.width = `${(seconds / 60) * 100}%`;
        }, 1000);
      }
    });
  });
});