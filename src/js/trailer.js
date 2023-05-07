import fetchVideoKey from './fetch-video-key';

const refs = {
  watchTrailerBtn: document.querySelector('.js-hero-trailer'),
  backdropTrailer: document.querySelector('.js-backdrop-trailer'),
  trailer: document.querySelector('.trailer'),
  closeBtn: document.querySelector('.js-close-btn'),
  playerBox: document.querySelector('.js-player'),
};

const filmId = refs.watchTrailerBtn.dataset.id;

refs.watchTrailerBtn.addEventListener('click', onWatchTrailerBtnClick);
refs.closeBtn.addEventListener('click', onCloseTraier);

function onWatchTrailerBtnClick(evt) {
  refs.backdropTrailer.classList.remove('visually-hidden');
  refs.backdropTrailer.addEventListener('click', onBackdropClick)
  document.addEventListener('keydown', onEscCloseTraier);
    fetchVideoKey(filmId).then((filmKey) => {
        if(!filmKey) {
            refs.trailer.classList.remove('visually-hidden');
            refs.playerBox.classList.add('visually-hidden');      
      return;
        }        
        makeMarkupIframe(filmKey);        
    })  
}

function makeMarkupIframe(key) {
    refs.playerBox.innerHTML = `<iframe id="ytplayer" type="text/html" width="720" height="405"
    src="https://www.youtube.com/embed/${key}"
    frameborder="0" allowfullscreen>`;
}

function onCloseTraier(evt) {
  document.removeEventListener('keydown', onEscCloseTraier);
  refs.trailer.classList.add('visually-hidden');
  refs.backdropTrailer.classList.add('visually-hidden');
  refs.backdropTrailer.removeEventListener('click', onBackdropClick); 
  refs.playerBox.classList.remove('visually-hidden'); 
}

function onEscCloseTraier(evt) {  
  console.log(evt.code);
  if(evt.code !== 'Escape') {
    return;
  }
  refs.trailer.classList.add('visually-hidden');
  refs.backdropTrailer.classList.add('visually-hidden');
  refs.playerBox.innerHTML = '';
  document.removeEventListener('keydown', onEscCloseTraier);
  refs.playerBox.classList.remove('visually-hidden');
}

function onBackdropClick(evt) {
    if(evt.target === refs.backdropTrailer) {
    refs.backdropTrailer.classList.add('visually-hidden');
    refs.trailer.classList.add('visually-hidden');
    refs.playerBox.innerHTML = '';
  }
  refs.backdropTrailer.removeEventListener('click', onBackdropClick);
  document.removeEventListener('keydown', onEscCloseTraier);
  refs.playerBox.classList.remove('visually-hidden');
}