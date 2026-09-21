/* Homepage opening and navigation. Keep the existing selector and all its listeners
   when moving it into the mobile dialog; never clone the language control. */
(() => {
  const body = document.body;
  const header = document.querySelector('.immersive-home > .topbar, .immersive-case > .topbar');
  const toggle = header?.querySelector('.menu-toggle');
  const tools = header?.querySelector('.nav-tools');
  const dialog = document.querySelector('#mobile-menu');
  if (!header || !toggle || !tools || !dialog || !dialog.showModal) return;

  // Keep the existing wording, but don't split Chinese phrases such as “变成”.
  // The translation module updates first; regroup after every language change.
  const title = document.querySelector('#hero-title');
  const groupTitle = () => {
    if (!title || document.documentElement.lang === 'en') return;
    const phrases = title.textContent.match(/[^，、]+[，、]?/g) || [];
    title.replaceChildren(...phrases.map(text => {
      const phrase = document.createElement('span');
      phrase.className = 'hero-phrase';
      phrase.textContent = text;
      return phrase;
    }));
  };
  groupTitle();
  document.addEventListener('portfolio:languagechange', groupTitle);

  const closeButton = dialog.querySelector('.mobile-menu-close');
  const slot = dialog.querySelector('.mobile-menu-body');
  const home = document.createComment('Desktop navigation position');
  tools.before(home);
  const mobile = matchMedia('(max-width: 900px)');
  const focusSelector = 'a[href],button:not([disabled]),select:not([disabled]),[tabindex="0"]';
  let locked = false;
  let savedY = 0;
  let oldStyle = null;
  let scrollFrame = 0;
  let returnFocus = true;
  let afterClose = null;

  const paintHeader = () => {
    scrollFrame = 0;
    header.classList.toggle('is-scrolled', (locked ? savedY : window.scrollY) > 24);
  };
  const onScroll = () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(paintHeader);
  };
  const restore = () => {
    if (!locked || dialog.open) return;
    home.after(tools);
    toggle.setAttribute('aria-expanded', 'false');
    for (const [property, value] of Object.entries(oldStyle)) body.style[property] = value;
    locked = false;
    // Restore the exact reading position without inheriting smooth scrolling.
    window.scrollTo({ top: savedY, behavior: 'instant' });
    if (returnFocus && mobile.matches) toggle.focus({ preventScroll: true });
    const action = afterClose;
    afterClose = null;
    paintHeader();
    if (action) action();
  };
  const close = (focus = true, action = null) => {
    returnFocus = focus;
    afterClose = action;
    if (dialog.open) dialog.close();
    restore();
  };
  const open = () => {
    if (!mobile.matches || dialog.open) return;
    savedY = window.scrollY;
    oldStyle = Object.fromEntries(['position', 'top', 'left', 'right', 'width', 'overflow'].map(key => [key, body.style[key]]));
    Object.assign(body.style, { position: 'fixed', top: '-' + savedY + 'px', left: '0', right: '0', width: '100%', overflow: 'hidden' });
    locked = true;
    slot.append(tools);
    toggle.setAttribute('aria-expanded', 'true');
    dialog.showModal();
    closeButton.focus({ preventScroll: true });
  };
  const followAnchor = event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || !dialog.open || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (!target) return;
    event.preventDefault();
    close(false, () => {
      // Let the existing anchor/scroll-reveal handlers run on the original link.
      link.click();
      const hadTabindex = target.hasAttribute('tabindex');
      if (!hadTabindex) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (!hadTabindex) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    });
  };
  const trapFocus = event => {
    if (event.key !== 'Tab' || !dialog.open) return;
    const items = [...dialog.querySelectorAll(focusSelector)].filter(item => item.getClientRects().length);
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  };
  const onResize = () => {
    if (!mobile.matches && dialog.open) {
      const focused = document.activeElement;
      close(false);
      (tools.contains(focused) ? focused : tools.querySelector('a')).focus({ preventScroll: true });
    }
  };
  toggle.hidden = false;
  body.classList.add('nav-enhanced');
  toggle.addEventListener('click', open);
  closeButton.addEventListener('click', () => close());
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  dialog.addEventListener('close', restore);
  dialog.addEventListener('keydown', trapFocus);
  dialog.addEventListener('click', followAnchor);
  mobile.addEventListener('change', onResize);
  window.addEventListener('scroll', onScroll, { passive: true });
  // No persistent animation loop or timers; only one frame per scroll update.
  window.addEventListener('pagehide', () => {
    close(false);
    cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
  });
  window.addEventListener('pageshow', paintHeader);
  paintHeader();
})();
