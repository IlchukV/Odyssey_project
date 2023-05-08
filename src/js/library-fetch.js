import { load } from './local-storage';
import { createRatingStars } from './catalog';

const apiKey = 'e1aeaa11db3ac22382c707ccfcac931e';
const BASE_URL = 'https://api.themoviedb.org/3/';

const refs = {
  emptyLibrary: document.querySelector('.empty-library'),
  catalogLibrary: document.querySelector('.catalog-library'),
  movieList: document.querySelector('.movies-list'),
};

const addedMovies = load('upcoming-film');
checkLibrary();

function checkLibrary() {
  try {
    if (addedMovies.length === 0) {
      refs.catalogLibrary.classList.add('visually-hidden');
      refs.emptyLibrary.classList.remove('visually-hidden');
    } else {
      displayMovies(addedMovies);
      refs.emptyLibrary.classList.add('visually-hidden');
      refs.catalogLibrary.classList.remove('visually-hidden');
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
      const genres = details.genres.map(genre => genre.name).join(', ');
      const releaseDate = new Date(details.release_date).getFullYear();
      const ratingStars = createRatingStars(details.vote_average);

      const movieItem = `
                <div class="movie-item movie-card">
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
    refs.movieList.innerHTML = movieItems.join('');
  } catch (error) {
    return error;
  }
}
