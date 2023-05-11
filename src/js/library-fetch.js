import { load } from './local-storage';
import { createRatingStars } from './catalog';
import { handleMovieClick } from '../js/details-modal';

const apiKey = 'e1aeaa11db3ac22382c707ccfcac931e';
const BASE_URL = 'https://api.themoviedb.org/3/';

const emptyLibrary = document.querySelector('.empty-library');
const catalogLibrary = document.querySelector('.catalog-library');
const catalogLibraryList = document.querySelector('.catalog-library__list');
const loadMoreBtn = document.querySelector('.load-more');
let movieCardRef;

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

                <div class="catalog-library__item movie-card" id=${movie.id}>
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" 
                    srcset="
                        https://image.tmdb.org/t/p/w200${movie.poster_path} 200w,
                        https://image.tmdb.org/t/p/w300${movie.poster_path} 300w,
                        https://image.tmdb.org/t/p/w500${movie.poster_path} 500w
                    "
                    sizes="(max-width: 768px) 200px, (max-width: 1280px) 300px, 500px"
                    alt="${movie.title}" loading="lazy"
                    >
                    <div class="catalog-library__details">
                        <h3>${movie.title}</h3>
                        <div class="catalog-library__info-wrap">
                          <div class="catalog-library__info">
                            <span class="catalog-library__text">${genres}</span>
                            <span class="catalog-library__text">${releaseDate}</span>
                         </div>
                         <div class="movie-rating">${ratingStars}
                         </div>
                       </div>
                    </div>
                </div>
                `;
      movieItems.push(movieItem);
    }
    catalogLibraryList.innerHTML = movieItems.join('');
  } catch (error) {
    return error;
  }
}

if (addedMovies.length < 6) {
  loadMoreBtn.classList.add('visually-hidden');
} else {
  let currentItems = 6;
  loadMoreBtn.addEventListener('click', e => {
    const elementList = [
      ...document.querySelectorAll('.catalog-library__item'),
    ];
    e.target.classList.add('show-loader');

    for (let i = currentItems; i < currentItems + 6; i++) {
      setTimeout(function () {
        e.target.classList.remove('show-loader');
        if (elementList[i]) {
          elementList[i].style.display = 'flex';
        }
      }, 3000);
    }
    currentItems += 6;
  });
}
