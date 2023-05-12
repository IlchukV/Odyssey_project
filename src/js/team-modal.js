import { refs } from './refs';

let backdropTeam = document.querySelectorAll('.backdrop')[1];

refs.open.addEventListener('click', onTeamModalClick);
refs.close.addEventListener('click', onCloseModalClick);
backdropTeam.addEventListener('click', onBackdropClick);

// відкриття модального вікна
function onTeamModalClick() {
  backdropTeam.classList.add('is-open');
  document.body.classList.add('stop-scroll');
  window.addEventListener('keydown', onEscKeyDownModal);
}

// закриття модального вікна
function onCloseModalClick() {
  window.removeEventListener('keydown', onEscKeyDownModal);
  backdropTeam.classList.remove('is-open');
  document.body.classList.remove('stop-scroll');
}

// закриття модального вікна по Esc
function onEscKeyDownModal(event) {
  if (event.code === 'Escape') {
    onCloseModalClick();
  }
}

// закриття модального вікна по кліку на бекдроп
function onBackdropClick(event) {
  if (event.target === backdropTeam) {
    onCloseModalClick();
  }
}
