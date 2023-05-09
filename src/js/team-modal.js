import { refs } from './refs';

refs.open.addEventListener('click', onTeamModalClick);
refs.close.addEventListener('click', onCloseModalClick);
refs.backdrop.addEventListener('click', onBackdropClick);

function onTeamModalClick() {
  refs.backdrop.classList.remove('visually-hidden');
  document.body.classList.add('stop-scroll');
  window.addEventListener('keydown', onEscKeyDownModal);

}

function onCloseModalClick() {
  window.removeEventListener('keydown', onEscKeyDownModal);
  refs.backdrop.classList.add('visually-hidden');
  document.body.classList.remove('stop-scroll');
 
}

function onEscKeyDownModal(event) {
  if (event.code === 'Escape') {
    onCloseModalClick();
  }
}

function onBackdropClick(event) {
  if (event.target === refs.backdrop) {
    onCloseModalClick();
  }
}