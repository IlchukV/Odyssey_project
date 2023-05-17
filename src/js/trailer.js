import fetchVideoKey from './fetch-video-key';
import { refs } from './refs';

// const refs = {
//   backdropTrailer: document.querySelector('.js-backdrop-trailer'),
//   trailer: document.querySelector('.trailer'),
//   closeBtn: document.querySelector('.js-close-btn'),
//   playerBox: document.querySelector('.js-player'),
// };
// for (let i = 0; i < closeBtn.length; i += 1) {
//   refs.closeBtn[i].addEventListener('click', onCloseTraier);
// }

// refs.closeBtn.addEventListener('click', onCloseTraier);

// Викликається по кліку на кнопку "watch trailer"

function onWatchTrailerBtnClick(evt) {
  const filmId = evt.currentTarget.dataset.id;
  refs.backdropTrailer.classList.remove('visually-hidden');
  refs.backdropTrailer.addEventListener('click', onBackdropClick);
  document.addEventListener('keydown', onEscCloseTraier);
  for (let i = 0; i < refs.closeBtn.length; i += 1) {
    refs.closeBtn[i].addEventListener('click', onCloseTraier);
  }
  fetchVideoKey(filmId).then(filmKey => {
    if (!filmKey) {
      refs.trailer.classList.remove('visually-hidden');
      refs.playerBox.classList.add('visually-hidden');
      return;
    }
    makeMarkupIframe(filmKey);
  });
}
export { onWatchTrailerBtnClick, refs };

// рендерить розмітку плеєра

function makeMarkupIframe(key) {
  refs.playerBox.innerHTML = `<iframe id="ytplayer" type="text/html" width="720" height="405"
    src="https://www.youtube.com/embed/${key}"
    frameborder="0" allowfullscreen>`;
}

// закриває модальне вікно з трейлером

function onCloseTraier(evt) {
  document.removeEventListener('keydown', onEscCloseTraier);
  refs.trailer.classList.add('visually-hidden');
  refs.backdropTrailer.classList.add('visually-hidden');
  refs.backdropTrailer.removeEventListener('click', onBackdropClick);
  refs.playerBox.classList.remove('visually-hidden');
  refs.playerBox.innerHTML = '';
}

// закриває модальне вікно з трейлером при натисканні на клавішу Esc

function onEscCloseTraier(evt) {
  console.log(evt.code);
  if (evt.code !== 'Escape') {
    return;
  }
  refs.trailer.classList.add('visually-hidden');
  refs.backdropTrailer.classList.add('visually-hidden');
  refs.playerBox.innerHTML = '';
  document.removeEventListener('keydown', onEscCloseTraier);
  refs.playerBox.classList.remove('visually-hidden');
}

// закриває модальне вікно при кліку на бекдроп

function onBackdropClick(evt) {
  if (evt.target === refs.backdropTrailer) {
    refs.backdropTrailer.classList.add('visually-hidden');
    refs.trailer.classList.add('visually-hidden');
    refs.playerBox.innerHTML = '';
    refs.backdropTrailer.removeEventListener('click', onBackdropClick);
    document.removeEventListener('keydown', onEscCloseTraier);
    refs.playerBox.classList.remove('visually-hidden');
  }
}
