import { refs } from './refs';
(() => {
  // const refs.mobileMenu = document.querySelector('.js-menu-container');
  // const refs.openMenuBtn = document.querySelector('.js-open-menu');
  // const closeMenuBtn = document.querySelector('.js-close-menu');
//  refs.backdrop.document.querySelector('.backdrop');
  // const bodyScrollLock = require('body-scroll-lock');
  // const disableBodyScroll = bodyScrollLock.disableBodyScroll;
  // const enableBodyScroll = bodyScrollLock.enableBodyScroll;
  const toggleMenu = () => {
    console.log('');
    const isMenuOpen =
      refs.openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    refs.openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    refs.mobileMenu.classList.toggle('is-open');

    const scrollLockMethod = !isMenuOpen
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    refs.bodyScrollLock[scrollLockMethod](document.body);
  };

  const toggleBackdrop = () => {
    refs.backdrop.classList.toggle('is-open');
  };

  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.openMenuBtn.addEventListener('click', toggleBackdrop);
  refs.backdrop.addEventListener('click', onBackdropClose);

  refs.mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      refs.mobileMenu.classList.remove('is-open');
      refs.backdrop.classList.remove('is-open');
    });
  });

  function onBackdropClose(e) {
    if (e.target === e.currentTarget) {
      refs.mobileMenu.classList.remove('is-open');
      refs.backdrop.classList.remove('is-open');
    }
  }

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    refs.mobileMenu.classList.remove('is-open');
    refs.openMenuBtn.setAttribute('aria-expanded', false);
    refs.bodyScrollLock.enableBodyScroll(document.body);
  });
})();
