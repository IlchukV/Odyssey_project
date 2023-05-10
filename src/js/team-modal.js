import { refs } from './refs';

let backdropTeam = document.querySelectorAll('.backdrop')[1];

if (window.location.pathname.includes('library')) {
  backdropTeam = document.querySelector('.backdrop');
}

refs.open.addEventListener('click', onTeamModalClick);
refs.close.addEventListener('click', onCloseModalClick);
backdropTeam.addEventListener('click', onBackdropClick);

function onTeamModalClick() {
  backdropTeam.classList.add('is-open');
  document.body.classList.add('stop-scroll');
  window.addEventListener('keydown', onEscKeyDownModal);
}

function onCloseModalClick() {
  window.removeEventListener('keydown', onEscKeyDownModal);
  backdropTeam.classList.remove('is-open');
  document.body.classList.remove('stop-scroll');
}

function onEscKeyDownModal(event) {
  if (event.code === 'Escape') {
    onCloseModalClick();
  }
}

function onBackdropClick(event) {
  if (event.target === backdropTeam) {
    onCloseModalClick();
  }
}
