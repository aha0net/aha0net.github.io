(() => {
  const themes = ['white', 'mist', 'graphite', 'wine'];
  const key = 'aha0.home.palette';
  const params = new URLSearchParams(location.search);
  const requested = params.get('theme');
  const navigation = performance.getEntriesByType('navigation')[0];
  let theme;
  // Opening the clean view keeps the chosen comparison; reloading always reshuffles.
  if (params.get('view') === 'clean' && navigation?.type !== 'reload' && themes.includes(requested)) {
    theme = requested;
  } else {
    let previous;
    try { previous = sessionStorage.getItem(key); } catch (_) {}
    const choices = themes.filter(value => value !== previous);
    theme = choices[Math.floor(Math.random() * choices.length)];
  }
  document.documentElement.dataset.theme = theme;
  try { sessionStorage.setItem(key, theme); } catch (_) {}
})();
