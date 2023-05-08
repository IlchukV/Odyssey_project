import Notiflix from 'notiflix';
import axios from 'axios';

const API_KEY = 'e1aeaa11db3ac22382c707ccfcac931e';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const refs = {
  modalWindow: document.querySelector('.modal-body'),
  modalCloseBtn: document.querySelector('[data-modal-movie-close]'),
  backdrop: document.querySelector('.backdrop'),
  movieList: document.querySelector('.movies-list'),
};

refs.movieList.addEventListener('click', handleMovieClick);
refs.modalCloseBtn.addEventListener('click', handleModalClose);
refs.backdrop.addEventListener('click', closeModalBackdropClick);

function handleMovieClick(e) {
  fetchMovieInfo(e.target.id).then(data => {
    refs.modalWindow.innerHTML = markupMovieCard(data);
    refs.backdrop.classList.remove('is-hidden');
  });
}

function handleModalClose() {
  refs.backdrop.classList.add('is-hidden');
}

function closeModalBackdropClick(evt) {
  if (evt.target.classList.contains('modal-overlay-movie')) {
    refs.backdrop.classList.add('is-hidden');
  }
  return;
}

 async function fetchMovieInfo(id) {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
  Notiflix.Loading.circle();
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error(error);
  } finally {
    Notiflix.Loading.remove();
  }
}

const markupMovieCard = ({
  poster_path,
  title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
}) => {
  const normalizedVote = vote_average.toFixed(1);
  const normalizedPopularity = popularity.toFixed(1);
  const normalizedGenres = genres.map(genre => genre.name).join(' ');

  return `
    <div class='movie-wraper'>
        <div>
            <img  class='movie-poster' src=${IMG_URL}${poster_path} alt='movie poster'/>
        </div>
        <div class='modal-movie-info'>
            <h2 class='movie-title'>${title}</h2>
            <div class='movie-characteristics-wrapper'>
                 <div class='movie-characteristics-names'> 
                    <ul>
                        <li class='movie-vote'>Vote / Votes</li>
                        <li class='movie-popularity'>Popularity</li>
                        <li>Genre</li>
                    </ul>
                 </div>
                 <div class='movie-characteristics-results'>
                     <ul>
                        <li class='movie-vote movie-vote-result'>
                            <div class='movie-vote-wrapper'>${normalizedVote}</div> / 
                            <div class='movie-vote-wrapper'>${vote_count}</div>
                        </li>
                        <li class='movie-popularity-results'>${normalizedPopularity}</li>
                        <li class='movie-genre'>${normalizedGenres}</li>
                    </ul>
                 </div>
            </div>   
            <p class='movie-about'>About</p>
            <p class='movie-description'>${overview}</p>
            <button class="addBtn">Add to my library</button>
        </div>
    </div>
    `;
};
