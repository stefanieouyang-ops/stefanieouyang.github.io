/* Progressive enhancement: a failed/disabled script leaves the static site visible.
   IntersectionObserver reveals once; requestAnimationFrame runs only on input. */
(() => {
  if (document.body.dataset.visualStage !== '2' || !('IntersectionObserver' in window)) return;
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
  const opening = document.querySelector('.hero.chapter-stage, .case-hero > .chapter-stage');
  const seal = document.querySelector('.brand-mark');
  const pending = new Set();
  let observer;
  let frame = 0;
  let lastY = scrollY;
  let lastTime = performance.now();
  let fast = false;

  const finishEntry = () => {
    opening?.classList.add('is-entry-complete');
    seal?.classList.add('is-entry-complete');
  };
  const show = (element, instant = false) => {
    if (instant) element.classList.add('is-instant');
    element.classList.remove('is-pending');
    pending.delete(element);
    observer?.unobserve(element);
  };
  const revealDestination = (id) => {
    let destination;
    try { destination = document.getElementById(decodeURIComponent(id)); } catch { return; }
    if (!destination) return;
    // Returning to the top must not reveal every unread chapter inside <main>.
    if (destination.matches('main')) { finishEntry(); return; }
    for (const element of pending) {
      if (destination.contains(element) || element.contains(destination)) show(element, true);
    }
    finishEntry();
  };
  const draw = () => {
    frame = 0;
    if (reduced.matches) return;
    // Read all geometry before writing composited opacity/transform state.
    const heroRect = opening && desktop.matches ? opening.getBoundingClientRect() : null;
    const immediate = fast ? [...pending].filter(element => {
      const rect = element.getBoundingClientRect();
      return rect.top < innerHeight + 100 && rect.bottom > -100;
    }) : [];
    immediate.forEach(element => show(element, true));
    if (heroRect && heroRect.bottom > -80 && heroRect.top < innerHeight) {
      const progress = Math.min(1, Math.max(0, -heroRect.top / heroRect.height));
      opening.style.setProperty('--folio-art-y', `${(progress * 12).toFixed(2)}px`);
      opening.style.setProperty('--folio-copy-y', `${(-progress * 4).toFixed(2)}px`);
    }
    fast = false;
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
  const onScroll = () => {
    const now = performance.now();
    const distance = Math.abs(scrollY - lastY);
    fast ||= distance > innerHeight * .55 || distance / Math.max(16, now - lastTime) > 1.8;
    lastY = scrollY;
    lastTime = now;
    if (scrollY > 60) finishEntry();
    schedule();
  };
  const targets = [];
  document.querySelectorAll('main > .wrap > section').forEach(section => {
    if (section.matches('.hero, .case-hero')) return;
    // Large blocks are never pinned or given artificial scroll height.
    [...section.children].forEach(child => {
      if (child.matches('.case-grid, .account-grid')) targets.push(...child.children);
      else targets.push(child);
    });
  });
  document.querySelectorAll('.case-hero > .hero-art, .footer-cta').forEach(element => targets.push(element));

  const enable = () => {
    if (reduced.matches) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) show(entry.target, fast);
      });
    }, { rootMargin: '0px 0px 90px 0px', threshold: 0 });
    opening?.classList.add('motion-opening');
    opening?.querySelector('h1')?.classList.add('motion-entry-title');
    opening?.querySelector('.eyebrow, .case-kicker')?.classList.add('motion-entry-note');
    opening?.querySelector('.hero-copy, .case-intro')?.classList.add('motion-entry-copy');
    opening?.querySelectorAll('.hero-meta, .hero-bottom').forEach(element => element.classList.add('motion-entry-detail'));
    seal?.classList.add('motion-entry-seal');
    // Capture initial bounds before setting any animation classes on the root.
    const initial = targets.map(element => ({ element, rect: element.getBoundingClientRect() }));
    initial.forEach(({element, rect}) => {
      element.classList.add('motion-reveal');
      if (rect.top >= innerHeight - 20) {
        element.classList.add('is-pending');
        pending.add(element);
        observer.observe(element);
      }
    });
    const deepLink = location.hash && location.hash !== '#top';
    if (scrollY > 60 || deepLink) finishEntry();
    root.classList.add('motion-ready');
    if (deepLink) revealDestination(location.hash.slice(1));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    schedule();
  };
  const disable = () => {
    root.classList.remove('motion-ready');
    observer?.disconnect();
    for (const element of pending) show(element, true);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', schedule);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    finishEntry();
  };
  // Native links and keyboard navigation reveal their destination immediately.
  document.addEventListener('focusin', event => {
    for (const element of pending) if (element.contains(event.target)) show(element, true);
  });
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (link) revealDestination(link.getAttribute('href').slice(1));
  }, true);
  window.addEventListener('hashchange', () => revealDestination(location.hash.slice(1)));
  window.addEventListener('pageshow', event => {
    if (event.persisted) { finishEntry(); fast = true; schedule(); }
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) disable();
    // If motion is re-enabled, keep all previously read content visible.
    else { finishEntry(); enable(); }
  });
  try { enable(); } catch (error) { disable(); console.warn('Portfolio motion disabled; static content remains available.', error); }
})();
