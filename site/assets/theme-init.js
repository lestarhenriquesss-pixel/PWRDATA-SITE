(() => {
  let preference='dark';
  try { const saved=localStorage.getItem('pwr-site-theme');if(['light','dark','auto'].includes(saved))preference=saved; } catch { /* Default dark without storage. */ }
  const root=document.documentElement;
  root.dataset.themePreference=preference;
  root.dataset.pwrTheme=preference==='auto'?(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'):preference;
})();
