/* The uploaded painting is flattened. These four small SVG blossoms are new
   overlays, not animated or altered pixels from the original artwork. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const language = () => document.documentElement.lang === 'en' ? 2 : document.documentElement.lang === 'zh-TW' ? 1 : 0;
  const attachers = [];
  const mountSeal = () => {
    const home = document.querySelector('a.brand');
    const mark = home?.querySelector('.brand-mark');
    if (!mark) return;
    const group = document.createElement('div');
    group.className = 'brand seal-group';
    const toggle = document.createElement('button');
    toggle.className = `${mark.className} seal-toggle`;
    toggle.type = 'button';
    toggle.textContent = mark.textContent;
    toggle.setAttribute('aria-controls', 'portfolio-note');
    toggle.setAttribute('aria-expanded', 'false');
    home.before(group);
    mark.remove();
    home.className = 'brand-home';
    group.append(toggle, home);
    const note = document.createElement('aside');
    note.className = 'seal-note';
    note.id = 'portfolio-note';
    note.hidden = true;
    note.inert = true;
    note.setAttribute('aria-labelledby', 'portfolio-note-title');
    note.innerHTML = '<button class="seal-close" type="button">×</button><h2 id="portfolio-note-title"></h2><p class="seal-note-copy"></p><p class="seal-note-colophon"></p>';
    group.append(note);
    const closeButton = note.querySelector('.seal-close');
    const strings = [
      ['打开作品小笺', '关闭作品小笺', '作品小笺', '我从市场洞察出发，将品牌定位、内容策略、渠道协同与数据复盘连接起来。这份作品集呈现我在海外市场中的项目思考与执行。', '以清供为题，记录出海实践。'],
      ['開啟作品小箋', '關閉作品小箋', '作品小箋', '我從市場洞察出發，將品牌定位、內容策略、渠道協同與數據復盤連接起來。這份作品集呈現我在海外市場中的項目思考與執行。', '以清供為題，記錄出海實踐。'],
      ['Open portfolio note', 'Close portfolio note', 'A note on this portfolio', 'I connect market insight with brand positioning, content strategy, channel collaboration and performance review. This portfolio brings together my thinking and execution across international markets.', 'Chinese still-life painting, a quiet nod to my roots.']
    ];
    let isOpen = false;
    let closeTimer = 0;
    let entranceFrame = 0;
    const translate = () => {
      const words = strings[language()];
      toggle.setAttribute('aria-label', words[isOpen ? 1 : 0]);
      closeButton.setAttribute('aria-label', words[1]);
      note.querySelector('h2').textContent = words[2];
      note.querySelector('.seal-note-copy').textContent = words[3];
      note.querySelector('.seal-note-colophon').textContent = words[4];
    };
    const close = (restoreFocus = false, immediate = false) => {
      isOpen = false;
      cancelAnimationFrame(entranceFrame);
      clearTimeout(closeTimer);
      note.classList.remove('is-open');
      note.inert = true;
      toggle.setAttribute('aria-expanded', 'false');
      if (immediate || reduced.matches) note.hidden = true;
      else closeTimer = setTimeout(() => { note.hidden = true; }, 240);
      translate();
      if (restoreFocus) toggle.focus({ preventScroll: true });
    };
    const open = () => {
      clearTimeout(closeTimer);
      isOpen = true;
      note.hidden = false;
      note.inert = false;
      toggle.setAttribute('aria-expanded', 'true');
      translate();
      entranceFrame = requestAnimationFrame(() => note.classList.add('is-open'));
    };
    translate();
    attachers.push(() => {
      const events = new AbortController();
      const options = { signal: events.signal };
      toggle.addEventListener('click', () => isOpen ? close() : open(), options);
      closeButton.addEventListener('click', () => close(true), options);
      document.addEventListener('click', event => {
        if (isOpen && !note.contains(event.target) && !toggle.contains(event.target)) close();
      }, options);
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && isOpen) { event.preventDefault(); close(true); }
      }, options);
      document.addEventListener('focusin', event => {
        if (isOpen && !group.contains(event.target)) close();
      }, options);
      window.addEventListener('scroll', () => { if (isOpen) close(); }, { ...options, passive: true });
      document.querySelector('#portfolio-language')?.addEventListener('change', translate, options);
      return () => { events.abort(); close(false, true); };
    });
  };
  mountSeal();
  const mountPlum = () => {
  const picture = document.querySelector('.portfolio-home .hero .chapter-art img');
  if (!picture) return;
  if (picture.closest('.hero-media')) return;
  const desktop = matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
  const opening = picture.closest('.chapter-stage');
  // A single transparent keyboard target makes the same interaction available
  // without hover. Decorative descendants remain hidden from assistive tech.
  picture.parentElement.removeAttribute('aria-hidden');
  const canvas = document.createElement('div');
  canvas.className = 'plum-canvas';
  picture.before(canvas);
  canvas.append(picture);
  const flowers = [
    { x: 1111, y: 452, size: .95, turn: -12, delay: 0, duration: 2.1, alpha: .9 },
    { x: 1310, y: 298, size: .88, turn: 18, delay: .3, duration: 1.9, alpha: .87 },
    { x: 1408, y: 234, size: .78, turn: -24, delay: .65, duration: 2.2, alpha: .85 },
    { x: 1534, y: 157, size: .68, turn: 32, delay: 1.05, duration: 2, alpha: .82 }
  ];
  const petals = `
    <path d="M0 2 C-9 -2 -18 -12 -14 -20 C-11 -27 -6 -24 -3 -26 C4 -29 10 -22 9 -15 C9 -8 4 -3 0 2Z"/>
    <path d="M-1 1 C2 -9 12 -21 20 -17 C25 -15 22 -11 25 -8 C28 0 18 5 10 5 C6 5 2 3 -1 1Z"/>
    <path d="M0 0 C9 0 22 5 22 14 C22 20 16 19 13 23 C7 27 0 19 -1 12 C-2 7 -1 4 0 0Z"/>
    <path d="M1 0 C4 9 3 23 -5 26 C-11 28 -13 23 -17 23 C-25 19 -19 9 -12 5 C-7 2 -2 1 1 0Z"/>
    <path d="M1 1 C-8 7 -22 10 -26 2 C-29 -4 -24 -6 -23 -11 C-19 -19 -10 -13 -5 -7 C-2 -3 0 -1 1 1Z"/>`;
  const veins = `<g fill="none" stroke="#b99880" stroke-width=".5" opacity=".5">
    <path d="M-1 -3 Q-10 -11 -10 -19 M1 -4 Q5 -12 4 -20 M4 -1 Q14 -10 19 -10 M5 1 Q14 2 20 -3 M3 4 Q12 9 14 17 M1 5 Q3 14 8 20 M-3 5 Q-9 14 -9 20 M-5 3 Q-14 8 -16 15 M-5 0 Q-15 2 -20 -2 M-4 -3 Q-13 -9 -18 -9"/>
    </g>`;
  const stamens = `<g stroke="#927044" stroke-width=".6" fill="#977144" opacity=".9">
    <path fill="none" d="M0 1 L-5 -9 M0 1 L2 -11 M0 1 L9 -7 M0 1 L11 1 M0 1 L7 8 M0 1 L0 11 M0 1 L-7 9 M0 1 L-11 2 M0 1 L-10 -5"/>
    <circle cx="-5" cy="-9" r="1"/><circle cx="2" cy="-11" r=".8"/><circle cx="9" cy="-7" r=".9"/><circle cx="11" cy="1" r=".8"/><circle cx="7" cy="8" r="1"/><circle cx="0" cy="11" r=".8"/><circle cx="-7" cy="9" r=".9"/><circle cx="-11" cy="2" r=".8"/><circle cx="-10" cy="-5" r="1"/>
    <circle cx="0" cy="1" r="2" fill="#aa795d" stroke="none"/>
    </g>`;
  canvas.insertAdjacentHTML('beforeend', `<svg class="plum-overlay" viewBox="0 0 1672 941" aria-hidden="true" focusable="false">
    <defs><radialGradient id="plum-wash" cx="52%" cy="72%" r="80%"><stop stop-color="#dec3a6" stop-opacity=".86"/><stop offset=".32" stop-color="#f6e9d7"/><stop offset=".74" stop-color="#fff8ea"/><stop offset="1" stop-color="#deb2a1" stop-opacity=".76"/></radialGradient></defs>
    ${flowers.map(f => `<g transform="translate(${f.x} ${f.y}) rotate(${f.turn}) scale(${f.size})"><g class="plum-bloom" style="--bloom-delay:${f.delay}s;--bloom-duration:${f.duration}s;--bloom-opacity:${f.alpha}"><g fill="url(#plum-wash)" stroke="#b2927c" stroke-width=".6" stroke-opacity=".6">${petals}</g>${veins}${stamens}</g></g>`).join('')}
    <g class="plum-petals"></g></svg><span class="plum-region" aria-hidden="true"></span><button class="plum-gesture" type="button"></button>`);
  const region = canvas.querySelector('.plum-region');
  const gesture = canvas.querySelector('.plum-gesture');
  const blooms = [...canvas.querySelectorAll('.plum-bloom')];
  const petalLayer = canvas.querySelector('.plum-petals');
  const translate = () => {
    const text = reduced.matches
      ? ['梅枝；已开启减少动态效果', '梅枝；已開啟減少動態效果', 'Plum branch; reduced motion is enabled']
      : ['轻触梅枝，让几片花瓣轻落', '輕觸梅枝，讓幾片花瓣輕落', 'Touch the plum branch to release a few petals'];
    gesture.setAttribute('aria-label', text[language()]);
    gesture.disabled = reduced.matches;
  };
  let opened = false;
  let observer;
  const finishBlooms = () => blooms.forEach(bloom => bloom.classList.add('has-bloomed'));
  const open = () => {
    if (opened) return;
    opened = true;
    // Let the existing 1.4s painting entrance settle before the first blossom.
    const wait = Math.max(0, 1.4 - performance.now() / 1000);
    blooms.forEach((bloom, i) => bloom.style.setProperty('--bloom-delay', `${flowers[i].delay + wait}s`));
    if (reduced.matches) finishBlooms();
    canvas.classList.add('plum-is-open');
    observer?.disconnect();
  };
  const PETAL_LIMIT = 8;
  const TRIGGER_INTERVAL = 1700;
  const particles = new Set();
  let lastTrigger = -Infinity;
  let frame = 0;
  let pendingPointer = null;
  let resetOnScroll = false;
  let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
  let lastFrame = 0;
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  const removeParticle = particle => { particle.node.remove(); particles.delete(particle); };
  const clearParticles = () => [...particles].forEach(removeParticle);
  const schedule = () => { if (!frame && !document.hidden && !reduced.matches) frame = requestAnimationFrame(draw); };
  const release = (flower, now) => {
    if (reduced.matches || document.hidden || !opened || now - lastTrigger < TRIGGER_INTERVAL || particles.size >= PETAL_LIMIT) return;
    lastTrigger = now;
    const count = Math.min(1 + Math.floor(Math.random() * 3), PETAL_LIMIT - particles.size);
    for (let i = 0; i < count; i++) {
      const node = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      node.setAttribute('class', 'falling-petal');
      node.setAttribute('d', 'M0 0 C-7 -3 -10 -12 -5 -16 C-2 -19 1 -16 4 -17 C11 -13 7 -4 0 0Z');
      node.setAttribute('fill', 'url(#plum-wash)');
      node.setAttribute('stroke', '#b18b76');
      node.setAttribute('stroke-width', '.6');
      node.style.opacity = '0';
      petalLayer.append(node);
      particles.add({ node, start: now + i * 140, duration: 5500 + Math.random() * 1800,
        x: flower.x + (Math.random() - .5) * 14, y: flower.y,
        drift: (Math.random() - .5) * 100, fall: 200 + Math.random() * 80,
        turn: Math.random() * 28 - 14, size: .7 + Math.random() * .3 });
    }
    schedule();
  };
  const nearBranch = point => {
    let nearest = flowers[0], distance = Infinity;
    for (const flower of flowers) {
      const next = Math.hypot(point.x - flower.x, point.y - flower.y);
      if (next < distance) { nearest = flower; distance = next; }
    }
    return distance < 100 ? nearest : null;
  };
  const pointInPainting = (event, rect) => ({
    x: (event.clientX - rect.left) / rect.width * 1672,
    y: (event.clientY - rect.top) / rect.height * 941
  });
  const ignoreControl = target => target.closest('a, button:not(.plum-gesture), input, select, textarea, [contenteditable="true"]');
  function draw(now) {
    frame = 0;
    if (reduced.matches || document.hidden) return;
    // One geometry read per input frame; particle movement requires no layout.
    const rect = pendingPointer || resetOnScroll ? canvas.getBoundingClientRect() : null;
    if (resetOnScroll) {
      targetX = targetY = 0;
      if (rect.bottom < 0 || rect.top > innerHeight) clearParticles();
      resetOnScroll = false;
    }
    if (pendingPointer && rect.width) {
      const point = pointInPainting(pendingPointer, rect);
      if (desktop.matches) {
        targetX = clamp((point.x / 1672 - .5) * 6, -3, 3);
        targetY = clamp((point.y / 941 - .5) * 4, -2, 2);
      }
      const flower = nearBranch(point);
      if (flower) release(flower, now);
      pendingPointer = null;
    }
    const delta = lastFrame ? Math.min(48, now - lastFrame) : 16;
    lastFrame = now;
    const smoothing = 1 - Math.exp(-delta / 170);
    pointerX += (targetX - pointerX) * smoothing;
    pointerY += (targetY - pointerY) * smoothing;
    const moving = Math.abs(targetX - pointerX) + Math.abs(targetY - pointerY) > .02;
    if (!moving) { pointerX = targetX; pointerY = targetY; }
    canvas.style.setProperty('--plum-pointer-x', `${pointerX.toFixed(2)}px`);
    canvas.style.setProperty('--plum-pointer-y', `${pointerY.toFixed(2)}px`);
    for (const particle of particles) {
      const progress = (now - particle.start) / particle.duration;
      if (progress >= 1) { removeParticle(particle); continue; }
      if (progress < 0) continue;
      const x = particle.x + particle.drift * progress + Math.sin(progress * Math.PI * 2) * 8;
      const y = particle.y + particle.fall * progress;
      const angle = particle.turn + Math.sin(progress * Math.PI) * 16;
      const alpha = Math.min(1, progress * 8) * Math.min(1, (1 - progress) * 4) * .85;
      particle.node.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${angle.toFixed(1)}deg) scale(${particle.size})`;
      particle.node.style.opacity = alpha.toFixed(3);
    }
    if (moving || particles.size) schedule();
    else lastFrame = 0;
  }
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    pendingPointer = null;
    pointerX = pointerY = targetX = targetY = 0;
    lastFrame = 0;
    clearParticles();
    canvas.style.removeProperty('--plum-pointer-x');
    canvas.style.removeProperty('--plum-pointer-y');
  };
  translate();
  attachers.push(() => {
    const events = new AbortController();
    const options = { signal: events.signal, passive: true };
    if (!opened && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) open();
      }, { threshold: .15, rootMargin: '-100px 0px -20px 0px' });
      observer.observe(region);
    } else if (!opened) open();
    opening.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || reduced.matches || ignoreControl(event.target)) return;
      pendingPointer = { clientX: event.clientX, clientY: event.clientY };
      schedule();
    }, options);
    opening.addEventListener('pointerleave', () => {
      pendingPointer = null; targetX = targetY = 0; schedule();
    }, options);
    opening.addEventListener('pointerdown', event => {
      if (reduced.matches || ignoreControl(event.target)) return;
      const flower = nearBranch(pointInPainting(event, canvas.getBoundingClientRect()));
      if (flower) release(flower, performance.now());
    }, options);
    gesture.addEventListener('click', () => release(flowers[2], performance.now()), options);
    canvas.addEventListener('animationend', event => {
      if (event.animationName === 'plum-unfold') event.target.classList.add('has-bloomed');
    }, options);
    window.addEventListener('scroll', () => { pendingPointer = null; resetOnScroll = true; schedule(); }, options);
    window.addEventListener('resize', stop, options);
    window.addEventListener('blur', stop, options);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { stop(); if (opened) finishBlooms(); }
    }, options);
    reduced.addEventListener('change', () => {
      if (reduced.matches) { stop(); if (opened) finishBlooms(); }
      translate();
    }, options);
    desktop.addEventListener('change', stop, options);
    document.querySelector('#portfolio-language')?.addEventListener('change', translate, options);
    return () => { events.abort(); observer?.disconnect(); stop(); if (opened) finishBlooms(); };
  });
  };
  mountPlum();
  let detach = attachers.map(attach => attach());
  // Remove transient handlers/objects when leaving; restore cleanly from bfcache.
  window.addEventListener('pagehide', () => { detach.forEach(cleanup => cleanup()); detach = []; });
  window.addEventListener('pageshow', event => { if (event.persisted && !detach.length) detach = attachers.map(attach => attach()); });
})();
