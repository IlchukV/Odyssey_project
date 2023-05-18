export const refs = {
  // from team-modal
  open: document.querySelector('.footer__link'),
  close: document.querySelector('.team-modal__btn--close'),
  backdrop: document.querySelector('.backdrop'),
  // from buttonUp
  buttonUp: document.querySelector('.up'),
  // from upcoming
  upcomingMoviesSection: document.querySelector('.container--upcoming'),
  // from weeklytrends
  weeklyGallery: document.querySelector('.weeklytrends_gallery_list'),
  // from trailer
  backdropTrailer: document.querySelector('.js-backdrop-trailer'),
  trailer: document.querySelector('.trailer'),
  closeBtn: document.querySelectorAll('.js-close-btn'),
  playerBox: document.querySelector('.js-player'),

  // from mobile-menu
  mobileMenu: document.querySelector('.js-menu-container'),
  openMenuBtn: document.querySelector('.js-open-menu'),
  backdrop: document.querySelector('.backdrop'),
  bodyScrollLock: require('body-scroll-lock'),
};
