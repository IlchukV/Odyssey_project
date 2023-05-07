import { load } from './local-storage';
import axios from 'axios';
import renderCard from './film-card';

// const card = renderCard();

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'e1aeaa11db3ac22382c707ccfcac931e';

const refs = {
  emptyLibrary: document.querySelector('.empty-library'),
  catalogLibrary: document.querySelector('.catalog-library'),
  catalogLibraryList: document.querySelector('.catalog-library__list'),
};
const addedMovies = load('upcoming-film');
console.log(addedMovies);

checkLibrary();

function checkLibrary() {
  try {
    if (addedMovies.length === 0) {
      refs.catalogLibrary.classList.add('hidden');
      refs.emptyLibrary.classList.remove('hidden');
    } else {
      createLibrary();
      refs.emptyLibrary.classList.add('hidden');
      refs.catalogLibrary.classList.remove('hidden');
    }
  } catch (error) {
    return error;
  }
}

async function fetchGenre() {
  const genres = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=UA`
  );
  return { genres };
}

function libraryMarkup(movies, genres) {
  return movies
    .map(({ poster_path, title, release_date }) => {
      return `
    <li class="catalog-library__item">
          <img class="catalog-library__img" src="https://image.tmdb.org/t/p/w500/${poster_path}"/>
          <div class="catalog-library__content">
               <h2 class="catalog-library__title">${title}</h2>
               <p class="catalog-library__description"> ${genres.join(
                 ', '
               )} ${release_date}</p>
         </div>
    </li>
    `;
    })
    .join('');
}

function createLibrary() {
  fetchGenre()
    .then(({ genres }) => {
      const genreList = getGenres(addedMovies, genres);

      refs.catalogLibraryList.innerHTML = libraryMarkup(addedMovies, genreList);
    })
    .catch(console.log);
}

fetchGenre()
  .then(({ genres }) => {
    const genreList = getGenres(addedMovies, genres);

    refs.catalogLibraryList.innerHTML = libraryMarkup(addedMovies, genreList);
  })
  .catch(console.log);

function getGenres(addedMovies, genres) {
  for (const movie of addedMovies) {
    return genres.data.genres
      .filter(genre => movie.genre_ids.includes(genre.id))
      .filter((genre, index) => index <= 1)
      .map(genre => genre.name);
  }
}
