(() => {
  const HERO_HOLD_TIME = 8.27;
  const HERO_REVEAL_TIME = 1.0; // The supplied movie begins with black frames.

  const media = document.querySelector('.immersive-home .immersive-hero .hero-media');
  const video = media?.querySelector('video');
  const audio = media?.querySelector('#hero-audio');
  const soundButton = document.querySelector('.immersive-home .hero-sound-toggle');
  if (!video || !audio) return;

  audio.muted = true;
  audio.loop = false;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const smallTouchScreen = matchMedia('(max-width: 540px) and (pointer: coarse)');
  let held = false;
  let frameRequest = 0;

  const shouldUseImage = () => reducedMotion.matches || smallTouchScreen.matches;
  const cancelFrame = () => {
    if (frameRequest && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(frameRequest);
    frameRequest = 0;
  };
  const useImage = () => {
    cancelFrame();
    video.pause();
    media.classList.remove('is-visible', 'is-video-active');
    if (soundButton) soundButton.hidden = true;
  };
  const reveal = () => {
    if (video.currentTime >= HERO_REVEAL_TIME && !shouldUseImage()) {
      media.classList.add('is-visible');
    }
  };
  const checkTime = () => {
    if (held || shouldUseImage()) return;
    reveal();
    if (video.currentTime < HERO_HOLD_TIME) return;
    held = true;
    cancelFrame();
    video.pause();
    // Keep the decoded video frame visible for the rest of this page load.
    if (Math.abs(video.currentTime - HERO_HOLD_TIME) > 0.005) {
      video.currentTime = HERO_HOLD_TIME;
    }
  };
  const watchFrames = () => {
    if (!video.requestVideoFrameCallback || frameRequest || video.paused || held || shouldUseImage()) return;
    frameRequest = video.requestVideoFrameCallback(() => {
      frameRequest = 0;
      checkTime();
      watchFrames();
    });
  };
  const start = () => {
    if (held) return;
    if (shouldUseImage()) { useImage(); return; }
    media.classList.add('is-video-active');
    video.play().then(() => {
      if (soundButton) soundButton.hidden = false;
      reveal();
      watchFrames();
    }).catch(useImage);
  };
  const onPreferenceChange = () => {
    if (held) return;
    if (shouldUseImage()) { useImage(); return; }
    start();
  };

  if (soundButton) {
    soundButton.addEventListener('click', () => {
      audio.muted = !audio.muted;
      soundButton.classList.toggle('is-unmuted', !audio.muted);
      soundButton.setAttribute('aria-pressed', String(!audio.muted));
      soundButton.setAttribute('aria-label', audio.muted ? '开启声音' : '关闭声音');
    });
  }

  video.addEventListener('timeupdate', checkTime);
  video.addEventListener('playing', () => { reveal(); watchFrames(); });
  video.addEventListener('error', useImage);
  reducedMotion.addEventListener('change', onPreferenceChange);
  smallTouchScreen.addEventListener('change', onPreferenceChange);
  video.currentTime = 0;
  audio.currentTime = 0;
  audio.play().catch(() => {});
  start();
})();
