(() => {
  const name = document.querySelector('.identity .wordmark');
  const line = document.querySelector('.tagline');
  const text = document.querySelector('.tagline-text');
  if (!name || !line || !text) return;
  let frame;
  const fit = () => {
    const identity = name.closest('.identity');
    if (identity.hasAttribute('data-wordmark-fit')) {
      const available = identity.getBoundingClientRect().width;
      name.style.fontSize = '100px';
      const measuredName = name.getBoundingClientRect().width;
      if (measuredName > 0) name.style.fontSize = `${100 * available / measuredName}px`;
    }
    const width = name.getBoundingClientRect().width;
    if (!width) return;
    line.style.fontSize = '100px';
    const measured = text.getBoundingClientRect().width + parseFloat(getComputedStyle(text).marginInlineEnd);
    if (measured > 0) {
      line.style.width = `${width}px`;
      line.style.fontSize = `${100 * width * .9 / measured}px`;
    } else {
      line.style.removeProperty('font-size');
    }
  };
  const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(fit); };
  window.addEventListener('resize', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(name);
  if (document.fonts) document.fonts.ready.then(schedule);
  schedule();
})();
