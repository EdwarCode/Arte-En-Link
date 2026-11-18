(() => {
  'use strict';
  const menuButton = document.getElementById('menu-button');
  const nav = document.getElementById('site-navigation');
  if (!menuButton || !nav) return;
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });
  window.matchMedia('(min-width: 861px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
})();
