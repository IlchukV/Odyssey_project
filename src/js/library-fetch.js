import { load } from './local-storage';
import { createRatingStars } from './catalog';
import { handleMovieClick } from '../js/details-modal';

const apiKey = 'e1aeaa11db3ac22382c707ccfcac931e';
const BASE_URL = 'https://api.themoviedb.org/3/';

const emptyLibrary = document.querySelector('.empty-library');
const catalogLibrary = document.querySelector('.catalog-library');
const movieList = document.querySelector('.movies-list');
let movieCardRef;

const loadMoreBtn = document.querySelector('.load-more');


const addedMovies = load('my library');

if (emptyLibrary === null) {
  return;
}

checkLibrary();

function checkLibrary() {
  try {
    if (addedMovies.length === 0) {
      catalogLibrary.classList.add('visually-hidden');
      emptyLibrary.classList.remove('visually-hidden');
    } else {
      movieCardRef = document.querySelector('.movie-card');
      displayMovies(addedMovies);
      emptyLibrary.classList.add('visually-hidden');
      catalogLibrary.classList.remove('visually-hidden');
       movieCardRef.addEventListener('click', handleMovieClick);

    }
  } catch (error) {
    return error;
  }
}

async function fetchMovies(url) {
  const response = await fetch(url);
  return response.json();
}

async function displayMovies(movies) {
  try {
    const movieItems = [];

    for (const movie of movies) {
      const detailsUrl = `${BASE_URL}/movie/${movie.id}?api_key=${apiKey}&language=en-US`;
      const details = await fetchMovies(detailsUrl);
      const genres = details.genres
        .filter((genre, index) => index <= 1)
        .map(genre => genre.name)
        .join(', ');
      const releaseDate = new Date(details.release_date).getFullYear();

      const ratingStars = createRatingStars(details.vote_average);

      const movieItem = `

                <div class="movie-item movie-card" id=${movie.id}>

                                  <img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                   alt="${movie.title}"/>
                    <div class="movie-details">
                        <h3>${movie.title}</h3>
                        <div class="movie-genres-and-rating">
                          <div class="movie-info">
                            <span class="movie-genre">${genres}</span>
                            <span class="movie-separator">|</span>
                            <span class="movie-year">${releaseDate}</span>
                         </div>
                         <div class="movie-rating">${ratingStars}
                         </div>
                       </div>
                    </div>
                </div>
                `;
      movieItems.push(movieItem);
    }
    movieList.innerHTML = movieItems.join('');
  } catch (error) {
    return error;
  }
}

loadMoreBtn.classList.remove('visually-hidden');
let currentItems = 9;
loadMoreBtn.addEventListener('click', e => {
  const elementList = [...document.querySelectorAll('.movie-item')];
  e.target.classList.add('show-loader');

  for (let i = currentItems; i < currentItems + 9; i++) {
    setTimeout(function () {
      e.target.classList.remove('show-loader');
      if (elementList[i]) {
        elementList[i].style.display = 'flex';
      }
    }, 3000);
  }
  currentItems += 9;
});
