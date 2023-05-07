import axios from 'axios';
import { load } from './local-storage';

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
      createLibrary(addedMovies);
      refs.emptyLibrary.classList.add('hidden');
      refs.catalogLibrary.classList.remove('hidden');
    }
  } catch (error) {
    return error;
  }
}

function createLibrary(movies) {
  try {
    const markup = movies
      .map(({ poster_path, title, release_date }) => {
        return `
    <li class="catalog-library__item">
    <img class="catalog-library__img" src="https://image.tmdb.org/t/p/w500/${poster_path}"/>
    <div class="catalog-library__description">
    <p class="catalog-library__text">${title}</p>
    <p class="catalog-library__text">${release_date}</p>
    </div>
    </li>
    `;
      })
      .join('');

    return (refs.catalogLibraryList.innerHTML = markup);
  } catch (error) {
    return error;
  }
}
