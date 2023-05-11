(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');
  const backdrop = document.querySelector('.backdrop');
  const bodyScrollLock = require('body-scroll-lock');
  const disableBodyScroll = bodyScrollLock.disableBodyScroll;
  const enableBodyScroll = bodyScrollLock.enableBodyScroll;
  const toggleMenu = () => {
    console.log('');
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    const scrollLockMethod = !isMenuOpen
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
  };

  const toggleBackdrop = () => {
    backdrop.classList.toggle('is-open');
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  openMenuBtn.addEventListener('click', toggleBackdrop);
  backdrop.addEventListener('click', onBackdropClose);

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      backdrop.classList.remove('is-open');
    });
  });

  function onBackdropClose(e) {
    if (e.target === e.currentTarget) {
      mobileMenu.classList.remove('is-open');
      backdrop.classList.remove('is-open');
    }
  }

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();
