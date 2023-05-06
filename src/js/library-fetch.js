import axios from 'axios';

const refs = {
  emptyLibrary: document.querySelector('.empty-library'),
  catalogLibrary: document.querySelector('.catalog-library'),
};

function checkLocalStorage() {
  if (localStorage.getItem('added-films') !== null) {
    refs.emptyLibrary.classList.add('hidden');
    refs.catalogLibrary.classList.remove('hidden');

    let addFilm = localStorage.getItem('added-films');
    addFilm = eval('(' + addFilm + ')');
    addFilm();
  } else {
    refs.emptyLibrary.classList.remove('hidden');
    refs.catalogLibrary.classList.add('hidden');
  }
}
checkLocalStorage();

async function fetchMovies() {
  const API_KEY = 'e1aeaa11db3ac22382c707ccfcac931e';
  const BASE_URL = 'https://api.themoviedb.org/3/trending/all/week';
  const url = `${BASE_URL}?api_key=${API_KEY}`;
  const { data } = await axios.get(url);
  return data.results;
}

const library = function createLibrary() {
  fetchMovies()
    .then(movies => {
      return movies
        .map(({ poster_path, title, genre_ids, release_date }) => {
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
    })
    .then(markup => {
      const catalogLibraryList = document.querySelector(
        '.catalog-library__list'
      );
      catalogLibraryList.insertAdjacentHTML('beforeend', markup);
    });
};
localStorage.setItem('added-films', library);
