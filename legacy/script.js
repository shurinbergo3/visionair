/* =========================================================
   VisionAir — Site interactions
   ========================================================= */

(function () {
  'use strict';

  /* ---------- NAV: scrolled state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ---------- DRONE: switch to idle bobbing after fly-in ---------- */
  const drone = document.getElementById('droneImg');
  if (drone) {
    drone.addEventListener('animationend', (e) => {
      if (e.animationName === 'droneFlyIn') {
        drone.classList.add('idle');
      }
    });
  }


  /* ---------- LANG SWITCH (cosmetic) ---------- */
  document.querySelectorAll('.lang button').forEach((b) => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.lang button').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
    });
  });


  /* ---------- REVEAL on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -80px 0px', threshold: 0.05 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));


  /* ---------- CASES carousel ---------- */
  const track = document.getElementById('casesTrack');
  const prevBtn = document.getElementById('casePrev');
  const nextBtn = document.getElementById('caseNext');
  const counter = document.getElementById('casesCount');
  let caseIdx = 0;

  function visibleCount() {
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 980) return 2;
    return 3;
  }
  function totalCases() {
    return track ? track.children.length : 0;
  }
  function maxIdx() {
    return Math.max(0, totalCases() - visibleCount());
  }
  function updateCarousel() {
    if (!track) return;
    const total = totalCases();
    const max = maxIdx();
    if (caseIdx > max) caseIdx = max;
    const card = track.children[0];
    const cardW = card ? card.getBoundingClientRect().width : 0;
    const gap = 18;
    const offset = caseIdx * (cardW + gap);
    track.style.transform = `translateX(-${offset}px)`;
    counter.textContent = `${String(Math.min(caseIdx + 1, total)).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    prevBtn.disabled = caseIdx <= 0;
    nextBtn.disabled = caseIdx >= max;
  }
  prevBtn && prevBtn.addEventListener('click', () => { caseIdx = Math.max(0, caseIdx - 1); updateCarousel(); });
  nextBtn && nextBtn.addEventListener('click', () => { caseIdx = Math.min(maxIdx(), caseIdx + 1); updateCarousel(); });
  window.addEventListener('resize', updateCarousel);
  setTimeout(updateCarousel, 100);


  /* ---------- PRICING packages ---------- */
  const packages = {
    real: {
      name: 'Недвижимость · Real Estate',
      items: [
        { name: 'Basic', tagline: 'Для агентств и быстрых листингов', price: '900', sub: 'PLN net', list: ['15 ретушированных фото 4K', 'Доставка за 48 часов', '1 пилот · 1 локация · ~1.5 ч', 'Полный пакет разрешений CTR EPWA', 'Лицензия на коммерческое использование'] },
        { name: 'Standard', featured: true, tagline: 'Лучший выбор для премиум-листингов', price: '1 600', sub: 'PLN net', list: ['25 фото + 60-секундный reel', 'Color grading, музыка, формат 4K', 'Доставка за 5 дней', 'Аэро + наземная съёмка территории', 'Drone walkthrough интерьера'] },
        { name: 'Premium', tagline: 'Под высокобюджетные виллы и резиденции', price: '3 200', sub: 'PLN net', list: ['40 фото + 90-сек cinematic фильм', '360° tour + интерактивный walkthrough', 'Закат + день — 2 визита', '8K master + версии под порталы', 'Custom storyboard, режиссёр на площадке'] },
      ],
    },
    wedding: {
      name: 'Свадьбы · Weddings',
      items: [
        { name: 'Mini', tagline: 'Один вылет на церемонию', price: '1 200', sub: 'PLN net', list: ['1 вылет · ~15 мин RAW', 'Интеграция с вашим видеографом', 'Mavic 3 Pro — практически бесшумен', 'Доставка RAW в течение 7 дней'] },
        { name: 'Standard', featured: true, tagline: 'Самый популярный пакет', price: '2 400', sub: 'PLN net', list: ['3 вылета (церемония, банкет, портреты)', '3-минутный cinematic-фильм', 'Color grading + музыкальная лицензия', 'Расширенный RAW для вашего монтажа'] },
        { name: 'Cinema', tagline: 'Полнометражная аэро-история дня', price: '4 200', sub: 'PLN net', list: ['5 вылетов в течение всего дня', 'Cinematic-фильм + 25 фото', 'Drone + ground BTS captures', '8K мастер + социал-версии'] },
      ],
    },
    commercial: {
      name: 'Реклама · Commercial',
      items: [
        { name: 'Day Rate · Mavic', tagline: 'Online контент, корпоративка', price: '2 200', sub: 'PLN net / день', list: ['DJI Mavic 3 Pro + Hasselblad', '1 пилот + ассистент', 'До 8 часов съёмки', 'Storyboard и pre-production включены'] },
        { name: 'Day Rate · Inspire', featured: true, tagline: 'TV-кампании, premium бренды', price: '5 000', sub: 'PLN net / день', list: ['DJI Inspire 3 + Zenmuse X9-8K', 'ProRes RAW · ARRI / RED pipeline', '2-операторская команда', 'Camera Car + FPV доступны'] },
        { name: 'Full Cinema Unit', tagline: 'Multi-day TVC и брендинг', price: '12 000', sub: 'PLN net / день', list: ['Full crew: пилот, оператор, AC, DIT', 'Все типы дронов в распоряжении', '3-7 дней съёмок + producer', 'Live monitoring + immediate dailies'] },
      ],
    },
    film: {
      name: 'Кино / ТВ · Film & TV',
      items: [
        { name: '1-Op Day', tagline: 'Подъёмные кадры для съёмочного дня', price: '5 000', sub: 'PLN net / день', list: ['Inspire 3 · 8K ProRes RAW', '1 пилот-оператор', 'STS-01 BVLOS · ночные полёты', 'Color science под основную камеру'] },
        { name: '2-Op Crew Day', featured: true, tagline: 'Стандарт для драма-сериалов', price: '8 500', sub: 'PLN net / день', list: ['Пилот + dedicated camera-op', 'Live wireless monitoring на видеовиллидж', 'Все категории EASA + STS-02', 'Insurance OC до 10 mln PLN'] },
        { name: 'Full Cinema Unit', tagline: 'Feature films, Netflix originals', price: '13 000', sub: 'PLN net / день', list: ['Full aerial unit: 4 человека', 'Inspire 3 + Avata 2 FPV + Mavic', 'Producer-координатор на проект', 'PDF полного compliance pack'] },
      ],
    },
    construction: {
      name: 'Стройка · Construction',
      items: [
        { name: 'Single Visit', tagline: 'Разовая документация', price: '900', sub: 'PLN net', list: ['1 визит · фото + видео', 'RTK позиционирование 2-3 см', 'Доставка в течение 48 часов', 'GeoTIFF + PDF report'] },
        { name: 'Monthly', featured: true, tagline: 'Документация для банков и инвесторов', price: '1 800', sub: 'PLN net / мес', list: ['2 визита в месяц', 'Timelapse-композит ежемесячно', 'Ортофотомапа PL-2000 по запросу', 'Онлайн-портал для всех stakeholders'] },
        { name: 'Premium Weekly', tagline: 'Активная стройка с еженедельным контролем', price: '4 500', sub: 'PLN net / мес', list: ['Еженедельный визит + report', 'Тепловые инспекции включены', '3D-модель объекта (ежеквартально)', 'Фотограмметрия 80 PLN/ha'] },
      ],
    },
    hotel: {
      name: 'Отели · Hospitality',
      items: [
        { name: 'Boutique', tagline: 'Бутик-отели до 30 номеров', price: '2 800', sub: 'PLN net', list: ['30-секундный hero-ролик', 'Аэро + интерьерные кадры', '5 ключевых статичных кадров', 'Версии 16:9 / 9:16 / 1:1'] },
        { name: 'Mid Hotel', featured: true, tagline: 'Сетевые и mid-segment отели', price: '4 800', sub: 'PLN net', list: ['60-90 секундный фильм', 'Лето + зима (доп 20%)', 'Многоязычные субтитры PL/EN/UA/DE', '15 фото + 2 panoramy'] },
        { name: 'Resort', tagline: 'Курорты и санатории', price: '9 000', sub: 'PLN net', list: ['Полная кампания: hero + reels', '2-3 дня съёмок', 'Talent на площадке (модели)', 'Quarterly content refresh contract'] },
      ],
    },
    events: {
      name: 'События · Events',
      items: [
        { name: 'FPV Day', tagline: 'Динамические FPV-кадры', price: '2 800', sub: 'PLN net / день', list: ['DJI Avata 2 + custom FPV', 'Same-day highlight за 24 часа', 'До 200 km/h полёт', 'Up to 8 hours coverage'] },
        { name: 'Premium Day', featured: true, tagline: 'Inspire 3 + FPV комбо', price: '6 500', sub: 'PLN net / день', list: ['Inspire 3 + Avata 2 одновременно', 'Live HD-SDI / NDI трансляция', '2-3 операторская команда', 'Cinematic recap к концу события'] },
        { name: 'Multi-cam Event', tagline: 'Фестивали, концерты, спорт', price: '14 000', sub: 'PLN net', list: ['3-4 дня съёмок · полный crew', 'Live мульти-камера feed', 'Cinematic highlight + индивидуальные клипы', 'Доход организатора: продажа клипов участникам'] },
      ],
    },
  };

  const pkgGrid = document.getElementById('pkgGrid');
  const pkgTabs = document.getElementById('pkgTabs');

  function renderPackages(key) {
    if (!pkgGrid || !packages[key]) return;
    const items = packages[key].items;
    pkgGrid.innerHTML = items.map(p => `
      <div class="pkg ${p.featured ? 'featured' : ''}">
        <div class="p-name">${p.name}</div>
        <div class="p-title">${packages[key].name.split(' · ')[0]}</div>
        <div class="p-tagline">${p.tagline}</div>
        <div class="p-price tabular">${p.price}<small>${p.sub}</small></div>
        <ul>
          ${p.list.map(l => `<li>${l}</li>`).join('')}
        </ul>
        <a href="#contact" class="btn ${p.featured ? 'btn-primary' : 'btn-ghost'}" style="width:100%; justify-content:center">
          Выбрать пакет
          <svg class="arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
      </div>
    `).join('');
  }

  if (pkgTabs) {
    pkgTabs.querySelectorAll('button').forEach((b) => {
      b.addEventListener('click', () => {
        pkgTabs.querySelectorAll('button').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        renderPackages(b.dataset.pkg);
      });
    });
  }
  renderPackages('real');


  /* ---------- HERO BG variants (used by tweaks) ---------- */
  window.setHeroBg = function (variant) {
    const map = { photo: '.v-photo', landscape: '.v-landscape', gradient: '.v-gradient' };
    document.querySelectorAll('.hero-bg .layer').forEach(l => l.classList.remove('active'));
    const sel = map[variant] || map.photo;
    const el = document.querySelector(`.hero-bg ${sel}`);
    if (el) el.classList.add('active');
  };


  /* ============================================================
     TWEAKS panel — bare-bones vanilla
     ============================================================ */
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "heroStyle": "photo",
    "accentHue": "gold"
  }/*EDITMODE-END*/;

  const state = Object.assign({}, TWEAK_DEFAULTS);

  // Apply state on load
  window.setHeroBg(state.heroStyle);
  applyAccent(state.accentHue);

  function applyAccent(hue) {
    const root = document.documentElement;
    const map = {
      gold:   { gold: '#C9A961', bright: '#E2C57F', deep: '#8C7440', glow: 'rgba(201, 169, 97, 0.28)' },
      cyan:   { gold: '#5BC9D8', bright: '#7FE0EB', deep: '#3B8F9C', glow: 'rgba(91, 201, 216, 0.28)' },
      crimson:{ gold: '#D85B5B', bright: '#EB7F7F', deep: '#9C3B3B', glow: 'rgba(216, 91, 91, 0.28)' },
    };
    const c = map[hue] || map.gold;
    root.style.setProperty('--gold', c.gold);
    root.style.setProperty('--gold-bright', c.bright);
    root.style.setProperty('--gold-deep', c.deep);
    root.style.setProperty('--gold-glow', c.glow);
    root.style.setProperty('--line-gold', c.gold.replace(')', ', 0.35)').replace('rgb', 'rgba').replace('#', 'rgba(')); // fallback below
    // For hex codes the above won't work; use opacity layer via shadow
    if (hue === 'gold') root.style.setProperty('--line-gold', 'rgba(201, 169, 97, 0.35)');
    if (hue === 'cyan') root.style.setProperty('--line-gold', 'rgba(91, 201, 216, 0.35)');
    if (hue === 'crimson') root.style.setProperty('--line-gold', 'rgba(216, 91, 91, 0.35)');
  }

  // Build tweaks panel (hidden until activated)
  const panel = document.createElement('div');
  panel.id = 'tweaksPanel';
  panel.style.cssText = `
    position: fixed; right: 24px; bottom: 90px;
    width: 320px;
    background: rgba(20, 17, 14, 0.96);
    backdrop-filter: blur(14px);
    border: 1px solid var(--line-strong);
    border-radius: 14px;
    padding: 20px;
    z-index: 90;
    font-family: var(--f-body);
    color: var(--cream);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
    display: none;
  `;
  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <div style="font-family: var(--f-mono); font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color: var(--gold)">Tweaks</div>
      <button id="tw-close" style="background:none; border:none; color: var(--muted); cursor:pointer; font-size:18px; line-height:1;">×</button>
    </div>

    <div style="margin-bottom:18px">
      <div style="font-family: var(--f-mono); font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color: var(--muted); margin-bottom:10px">Стиль hero</div>
      <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:6px">
        <button class="tw-opt" data-tw="heroStyle" data-val="photo" style="padding:10px 8px; border:1px solid var(--line); background:var(--ink-3); color:var(--cream-2); border-radius:8px; font-family:var(--f-mono); font-size:10px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer;">Видео-фон</button>
        <button class="tw-opt" data-tw="heroStyle" data-val="landscape" style="padding:10px 8px; border:1px solid var(--line); background:var(--ink-3); color:var(--cream-2); border-radius:8px; font-family:var(--f-mono); font-size:10px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer;">Пейзаж</button>
        <button class="tw-opt" data-tw="heroStyle" data-val="gradient" style="padding:10px 8px; border:1px solid var(--line); background:var(--ink-3); color:var(--cream-2); border-radius:8px; font-family:var(--f-mono); font-size:10px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer;">Градиент</button>
      </div>
    </div>

    <div>
      <div style="font-family: var(--f-mono); font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color: var(--muted); margin-bottom:10px">Цветовой акцент</div>
      <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:6px">
        <button class="tw-opt" data-tw="accentHue" data-val="gold" style="padding:10px 8px; border:1px solid var(--line); background:var(--ink-3); color:var(--cream-2); border-radius:8px; font-family:var(--f-mono); font-size:10px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#C9A961"></span>Gold</button>
        <button class="tw-opt" data-tw="accentHue" data-val="cyan" style="padding:10px 8px; border:1px solid var(--line); background:var(--ink-3); color:var(--cream-2); border-radius:8px; font-family:var(--f-mono); font-size:10px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#5BC9D8"></span>Cyan</button>
        <button class="tw-opt" data-tw="accentHue" data-val="crimson" style="padding:10px 8px; border:1px solid var(--line); background:var(--ink-3); color:var(--cream-2); border-radius:8px; font-family:var(--f-mono); font-size:10px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#D85B5B"></span>Crimson</button>
      </div>
    </div>
  `;
  document.body.appendChild(panel);

  function refreshTweakUI() {
    panel.querySelectorAll('.tw-opt').forEach(b => {
      const key = b.dataset.tw;
      const val = b.dataset.val;
      if (state[key] === val) {
        b.style.background = 'var(--gold)';
        b.style.color = 'var(--ink)';
        b.style.borderColor = 'var(--gold)';
      } else {
        b.style.background = 'var(--ink-3)';
        b.style.color = 'var(--cream-2)';
        b.style.borderColor = 'var(--line)';
      }
    });
  }
  refreshTweakUI();

  panel.querySelectorAll('.tw-opt').forEach(b => {
    b.addEventListener('click', () => {
      const key = b.dataset.tw;
      const val = b.dataset.val;
      state[key] = val;
      if (key === 'heroStyle') window.setHeroBg(val);
      if (key === 'accentHue') applyAccent(val);
      refreshTweakUI();
      try {
        window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
      } catch (e) {}
    });
  });

  panel.querySelector('#tw-close').addEventListener('click', () => {
    panel.style.display = 'none';
    try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) {}
  });

  // Listen for host activation
  window.addEventListener('message', (e) => {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === '__activate_edit_mode') {
      panel.style.display = 'block';
    } else if (e.data.type === '__deactivate_edit_mode') {
      panel.style.display = 'none';
    }
  });

  // Announce availability
  try {
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  } catch (e) {}

})();
