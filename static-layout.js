// Manual gallery navigation only. No timers, automatic motion or scroll effects.
(() => {
  if (!['1', '2'].includes(document.body.dataset.visualStage)) return;
  document.querySelectorAll('.sample-grid, .social-grid, .copy-grid').forEach((gallery) => {
    gallery.classList.add('is-manual');
    const seen = new Set();
    [...gallery.children].forEach(card => {
      const asset = card.querySelector('video source[src], video[src], img[src]');
      const src = asset?.getAttribute('src');
      if (src && seen.has(src)) card.remove();
      else if (src) seen.add(src);
    });
    gallery.tabIndex = 0;
    gallery.setAttribute('role', 'region');
    gallery.setAttribute('aria-label', window.PortfolioI18n?.t('Content gallery') || 'Content gallery');
    gallery.addEventListener('keydown', (event) => {
      if (event.target !== gallery) return;
      const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      const card = gallery.firstElementChild;
      const gap = parseFloat(getComputedStyle(gallery).columnGap) || 0;
      gallery.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || gallery.clientWidth) + gap), behavior: 'instant' });
    });
  });
})();
