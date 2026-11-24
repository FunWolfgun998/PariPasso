/**
 * Logica schermata "Chiedere Aiuto" (PariPasso · Vicenza e provincia)
 */
document.addEventListener('DOMContentLoaded', () => {
  const toggleSafetyGuide = document.getElementById('toggle-safety-guide');
  const safetyGuideContent = document.getElementById('safety-guide-content');
  const guideArrow = document.getElementById('guide-arrow');

  if (toggleSafetyGuide && safetyGuideContent && guideArrow) {
    toggleSafetyGuide.addEventListener('click', () => {
      const isHidden = safetyGuideContent.classList.contains('hidden');
      safetyGuideContent.classList.toggle('hidden', !isHidden);
      guideArrow.classList.toggle('is-rotated', isHidden);
    });
  }

  const citySelector = document.getElementById('city-selector');
  const locationLabel = document.getElementById('location-label');
  const mapCityBadge = document.getElementById('map-city-badge');
  const btnUseLocation = document.getElementById('btn-use-location');
  const mapFrame = document.getElementById('area-map-frame');

  const areasConfig = {
    vicenza: {
      label: 'Vicenza e provincia',
      badge: '4 presidi verificati · Vicenza',
      lat: 45.548,
      lon: 11.546,
      bbox: '11.515,45.528,11.578,45.568',
      addresses: [
        'Stradella dei Cappuccini 67, 36100 Vicenza',
        'Via G. Vaccari 113, 36100 Vicenza',
        'Corso Santi Felice e Fortunato 227, 36100 Vicenza',
        'Area territoriale di Vicenza e Provincia'
      ]
    },
    arzignano: {
      label: 'Arzignano · Ovest Vicentino',
      badge: 'Sportello attivo · Arzignano (VI)',
      lat: 45.5204,
      lon: 11.3335,
      bbox: '11.300,45.502,11.368,45.540',
      addresses: [
        'Via Cavour 49, Arzignano (Sportello Donna Chiama Donna)',
        'Via G. Vaccari 113, Vicenza (Rete Provinciale)',
        'Via Kennedy 2, Distretto Ovest ULSS 8 Berica',
        'Area Ovest Vicentino'
      ]
    },
    schio: {
      label: 'Schio · Alto Vicentino',
      badge: 'Sportello attivo · Schio (VI)',
      lat: 45.7131,
      lon: 11.3568,
      bbox: '11.320,45.695,11.392,45.732',
      addresses: [
        'Via Pasini 33, Schio (Sportello Donna "Maria Grazia Cutuli")',
        'Rete Inclusione Alto Vicentino',
        'Consultorio Familiare Distretto Alto Vicentino',
        'Area Alto Vicentino'
      ]
    },
    bassano: {
      label: 'Bassano del Grappa · Pedemontana',
      badge: 'Presidi verificati · Bassano (VI)',
      lat: 45.7667,
      lon: 11.7347,
      bbox: '11.700,45.748,11.770,45.786',
      addresses: [
        'Centro Antiviolenza territoriale · Bassano del Grappa',
        'Sportello Autonomia · Area Pedemontana',
        'Consultorio Familiare ULSS 7 Pedemontana',
        'Area Bassano e Marostica'
      ]
    },
    padova: {
      label: 'Padova · Rete Vivi Veneto',
      badge: '4 presidi verificati · Padova',
      lat: 45.4064,
      lon: 11.8768,
      bbox: '11.840,45.388,11.912,45.425',
      addresses: [
        'Centro Veneto Progetti Donna · Padova',
        'Sportello Inclusione · Padova',
        'Consultorio Familiare ULSS 6 Euganea · Padova',
        'Area territoriale di Padova'
      ]
    }
  };

  function updateArea(areaKey) {
    const cfg = areasConfig[areaKey] || areasConfig.vicenza;
    if (locationLabel) locationLabel.textContent = `Area: ${cfg.label}`;
    if (mapCityBadge) mapCityBadge.textContent = cfg.badge;

    if (mapFrame) {
      const encodedBbox = encodeURIComponent(cfg.bbox);
      mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodedBbox}&layer=mapnik&marker=${cfg.lat}%2C${cfg.lon}`;
      mapFrame.title = `Mappa territoriale di ${cfg.label}`;
    }

    const addrNodes = document.querySelectorAll('.entity-address');
    addrNodes.forEach((node, idx) => {
      if (cfg.addresses[idx]) node.textContent = cfg.addresses[idx];
    });
  }

  if (citySelector) {
    citySelector.addEventListener('change', (e) => updateArea(e.target.value));
  }

  if (btnUseLocation) {
    btnUseLocation.addEventListener('click', () => {
      if (citySelector) {
        citySelector.value = 'vicenza';
        updateArea('vicenza');
      }
    });
  }

  // Filtro ambiti di supporto
  const filterButtons = document.querySelectorAll('#support-filters .filter-pill');
  const serviceCards = document.querySelectorAll('.service-card-item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const serviceType = btn.getAttribute('data-service');
      serviceCards.forEach((card) => {
        const cardType = card.getAttribute('data-service');
        const show = serviceType === 'all' || cardType === serviceType;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  // Modale Dettagli Presidi Vicenza
  const entitiesData = {
    'ceav-vicenza': {
      kicker: 'Centro Antiviolenza Comunale di Vicenza · Rete 1522',
      title: 'CeAV — Gestito da Donna Chiama Donna',
      points: [
        'Sede operativa: Stradella dei Cappuccini 67, 36100 Vicenza (e sportello ad Arzignano).',
        'Orari al pubblico: Lun, Mar, Mer, Ven 08:30–14:00 · Gio 09:00–17:00 (segreteria attiva nel weekend).',
        'Email: ceav@comune.vicenza.it · Tel. CeAV 0444 230402 · Associazione 0444 542377.',
        'Servizio pubblico gratuito di ascolto, consulenza psicologica, legale e protezione immediata.'
      ],
      cta: '<div class="row-wrap mt-2"><a href="tel:0444230402" class="btn-navy flex-1">Chiama CeAV 0444 230402</a><a href="tel:1522" class="btn-soft flex-1">Chiama 1522 (h24)</a></div>'
    },
    'autonomia-vicenza': {
      kicker: 'Autonomia Economica & Lavoro · Vicenza',
      title: 'Sportello Tutela & Autonomia — Vicenza',
      points: [
        'Riferimento territoriale in Via G. Vaccari 113, 36100 Vicenza.',
        'Orientamento contro l’abuso finanziario, accesso alle misure di sostegno e microcredito.',
        'Supporto per indipendenza lavorativa, abitativa e tutela legale separazioni.'
      ],
      cta: '<div class="row-wrap mt-2"><a href="tel:0444542377" class="btn-navy flex-1">Chiama 0444 542377</a><a href="tel:1522" class="btn-soft flex-1">Orienta via 1522</a></div>'
    },
    'consultorio-ulss8': {
      kicker: 'Azienda ULSS 8 Berica · Distretto Est',
      title: 'Consultorio Familiare di Vicenza',
      points: [
        'Sedi a Vicenza: Corso Santi Felice e Fortunato 227 e Contrà Santi Apostoli 21.',
        'Accesso gratuito senza necessità di impegnativa del medico di base (dai 14 anni).',
        'Contatti: Tel. 0444 752004 / 0444 752010 · info.consultoriest@aulss8.veneto.it.'
      ],
      cta: '<a href="tel:0444752004" class="btn-navy w-full mt-2">Chiama Consultorio 0444 752004</a>'
    },
    'cuav-vicenza': {
      kicker: 'Percorsi di Cambiamento · Provincia di Vicenza',
      title: 'Spazio di Responsabilità CUAV — Vicenza',
      points: [
        'Colloqui individuali e riservati per uomini che vogliono interrompere dinamiche di controllo o aggressività.',
        'Lavoro educativo e psicologico su gestione della rabbia, confini e responsabilità.',
        'Presa in carico volontaria in raccordo con la rete territoriale veneta.'
      ],
      cta: '<a href="tel:1522" class="btn-navy w-full mt-2">Chiedi orientamento riservato</a>'
    }
  };

  const modal = document.getElementById('entity-detail-modal');
  const modalKicker = document.getElementById('entity-modal-kicker');
  const modalTitle = document.getElementById('entity-modal-title');
  const modalBody = document.getElementById('entity-modal-body');
  const closeModalBtn = document.getElementById('close-entity-modal');

  document.querySelectorAll('.open-entity-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-entity-id');
      const data = entitiesData[id];
      if (!data || !modal) return;
      modalKicker.textContent = data.kicker;
      modalTitle.textContent = data.title;
      modalBody.innerHTML =
        '<ul class="stack-xs">' +
        data.points.map((pt) => `<li class="row-start"><span class="material-symbols-outlined icon-md text-cyan">check_circle</span><span>${pt}</span></li>`).join('') +
        '</ul>' +
        data.cta;
      modal.classList.add('is-open');
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => modal.classList.remove('is-open'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('is-open');
    });
  }
});