if (!window.location.pathname.includes('catalog')){
  return
}

// !! Пробная заглушка для поиска фильма
import { showModal } from './catalog-modal-close';

import { showModal } from './catalog-modal-close';

const apiKey = 'e1aeaa11db3ac22382c707ccfcac931e';
const BASE_URL = 'https://api.themoviedb.org/3/';

let currentPage = 1;
let totalPages = 0;
let currentQuery = '';
let isCatalogHomePage = true;
let isSearchActive = false;
let observer = null;

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const moviesList = document.querySelector('.movies-list');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const localPageIndicator = document.querySelector('.page-indicator');

if (searchForm === null) {
  return;
}

// * Отправляет асинхронный запрос по переданному URL и возвращает полученный ответ в виде JSON-объекта.
async function fetchMovies(url) {
  const response = await fetch(url);
  return response.json();
}

// * Вызывает функцию fetchMovies для получения данных о популярных фильмах на текущей странице.
async function getTrendingMovies() {
  await fetchMovies(currentPage);
}

// * Для получения данных о фильмах, соответствующих переданному поисковому запросу
async function searchMovies(query) {
  await fetchMovies(currentPage, query);
  searchInput.value = '';
}

// * Код для списка фильмов и добавляется на страницу. Доп. данные о фильмах
async function displayMovies(movies) {
  const movieItems = [];

  for (const movie of movies) {
    const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`;

    const details = await fetchMovies(detailsUrl);

    const genres = details.genres.map(genre => genre.name).join(', ');
    const releaseDate = new Date(details.release_date).getFullYear();

    const ratingStars = createRatingStars(details.vote_average);
    const movieItem = `
                <div class="movie-item movie-card" id=${movie.id}>
                    <img
                    src="https://image.tmdb.org/t/p/w200${movie.poster_path}" 
                    srcset="
                        https://image.tmdb.org/t/p/w200${movie.poster_path} 200w,
                        https://image.tmdb.org/t/p/w300${movie.poster_path} 300w,
                        https://image.tmdb.org/t/p/w500${movie.poster_path} 500w
                    "
                    sizes="(max-width: 768px) 200px, (max-width: 1280px) 300px, 500px"
                    alt="${movie.title}"
                    >
                    <div class="movie-details">
                    <h3>${movie.title}</h3>
                        <div class="movie-genres-and-rating">
                    <div class="movie-info">
                        <span class="movie-genre">${genres}</span>
                        <span class="movie-separator">|</span>
                        <span class="movie-year">${releaseDate}</span>
                    </div>
                    <div class="movie-rating">
                        ${ratingStars}
                    </div>
                    </div>
                    </div>
                </div>
                `;
    movieItems.push(movieItem);
  }

  moviesList.innerHTML = movieItems.join('');
  updatePaginationInfo();
  assignPageButtonClickHandlers();
}

//* Рейтинг со звездами
export function createRatingStars(rating) {
  const maxStars = 5;
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 >= 1 ? 1 : 0;
  const emptyStars = maxStars - fullStars - halfStar;

  const fullStarIcon = `<li class="fas fa-star star-full"></li>`;
  const halfStarIcon = `<li class="fas fa-star-half-alt star-full"></li>`;
  const emptyStarIcon = `<li class="far fa-star star-full"></li>`;

  return (
    fullStarIcon.repeat(fullStars) +
    halfStarIcon.repeat(halfStar) +
    emptyStarIcon.repeat(emptyStars)
  );
}

// *Функция запрашивает популярные фильмы и отображает их, обновляя пагинацию.
function assignPageButtonClickHandlers() {
  const pageButtons = document.querySelectorAll('.page-number');
  pageButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const pageNumber = parseInt(event.target.textContent, 20);
      goToPage(pageNumber);
    });
  });
}

// ** Функция для получения списка популярных фильмов
async function getTrendingMovies() {
  try {

    // ** Отправляем запрос на сервер для получения данных о популярных фильмах
    const response = await fetch(
      `${BASE_URL}trending/movie/day?api_key=${apiKey}&page=${currentPage}`
    );
    const data = await response.json();
    totalPages = data.total_pages;
    displayMovies(data.results);
    observeLastMovieElement();
    updatePaginationInfo();
    isSearchActive = false;
  } catch (error) {
    console.error(error);
  }
}

// *Функция отправляет запрос к API для получения списка фильмов по запросу
export async function searchMovies(query, closeModal) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${currentPage}`;
  const data = await fetchMovies(url);
  totalPages = data.total_pages;

  let searchSuccess = false;

  if (data.results.length === 0) {
    showModal(' ');
    searchInput.value = "";
  } else {
    displayMovies(data.results);
    observeLastMovieElement();
    updatePaginationInfo();
    searchSuccess = true;
    isSearchActive = true;
  }

  if (!searchSuccess && closeModal) {
    searchInput.value = "";
  }

  return searchSuccess;
}

// *Обработчик события отправки формы поиска
searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    return;
  }
  showLoadingIndicator();
  currentPage = 1;
  currentQuery = query;
  await searchMovies(query);
  hideLoadingIndicator();
});

// **Обработчик события ввода в поле поиска
searchInput.addEventListener('input', async () => {
  if (!searchInput.value.trim()) {
    showLoadingIndicator();
    currentPage = 1;
    currentQuery = '';
    await getTrendingMovies();
    hideLoadingIndicator();
  }
});

// * Автоматически (через 5 секунд) выполняет поиск фильмов, когда пользователь вводит текст в поле поиска
function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const searchInputEl = document.querySelector('#search-input');

const executeSearch = debounce(function () {
  const query = searchInputEl.value.trim();
  if (query.length >= 3) {
    // Обновлять текущий запрос поиска
    currentQuery = query;
    // Сбросить текущую страницу
    currentPage = 1;
    // Вызов функции, которая выполняет поиск
    searchMovies(query, false);
  }
});

searchInputEl.addEventListener('input', executeSearch);

// * Функция формирует и отображает элементы пагинации на странице. Включает кнопки "назад",
// *"вперед" и номера страниц для перемещения между страницами.
function createArrowButton(direction, currentPage, totalPages) {
  const arrowButton = document.createElement('span');
  arrowButton.classList.add('arrow-button');

  const isPrev = direction === 'prev';
  const isNext = direction === 'next';

  const disabledClass = isPrev ? 'disabled' : 'arrow-disabled';
  const svgPath = isPrev ?
    'M20.5 7l-9 9 9 9' :
    'M11.5 7l9 9-9 9';
  const strokeColor = isPrev ? '#b7b7b7' : '#f8f8f8';

  if ((isPrev && currentPage === 1) || (isNext && currentPage === totalPages)) {
    arrowButton.classList.add(disabledClass);
  }

  arrowButton.innerHTML = `
    <svg width="28px" height="28px" viewBox="0 0 32 32">
      <path fill="none" stroke="${strokeColor}" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="${svgPath}"></path>
    </svg>`;

  arrowButton.addEventListener('click', () => {
    if (isPrev && currentPage !== 1) {
      goToPage(currentPage - 1);
    } else if (isNext && currentPage !== totalPages) {
      goToPage(currentPage + 1);
    }
  });

  return arrowButton;
}

// ** Функция для обновления информации о пагинации
function updatePaginationInfo() {
  localPageIndicator.innerHTML = '';

  if (totalPages <= 1) {
    return;
  }
  const prevArrow = createArrowButton('prev', currentPage, totalPages);
  localPageIndicator.appendChild(prevArrow);

  const maxVisiblePages = 3;
  const firstVisiblePage = Math.max(
    1,
    currentPage - Math.floor(maxVisiblePages / 2)
  );
  const lastVisiblePage = Math.min(
    totalPages,
    firstVisiblePage + maxVisiblePages - 1
  );

  // *Проверяет, находится ли первая страница в пагинации на первом месте,
  // *и если нет, то создает кнопку "1" и добавляет ее в пагинацию.
  if (firstVisiblePage > 1) {
    const firstPageButton = document.createElement('button');
    firstPageButton.classList.add('page-number');
    firstPageButton.textContent = 1;
    firstPageButton.addEventListener('click', () => goToPage(1));
    localPageIndicator.appendChild(firstPageButton);

    if (firstVisiblePage > 2) {
      const ellipsis = document.createElement('span');
      ellipsis.textContent = '...';
      localPageIndicator.appendChild(ellipsis);
    }
    assignPageButtonClickHandlers();
  }

  // *создает кнопки для каждой видимой страницы и добавляет их в пагинацию
  for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
    const pageButton = document.createElement('button');
    pageButton.classList.add('page-number');
    pageButton.textContent = i.toString().padStart(2, '0');
    if (i === currentPage) {
      pageButton.classList.add('active');
    }
    pageButton.addEventListener('click', () => goToPage(i));
    localPageIndicator.appendChild(pageButton);
  }

  // * Создает и добавляет элементы пагинации на страницу
  if (lastVisiblePage < totalPages) {
    if (lastVisiblePage < totalPages - 1) {
      const ellipsis = document.createElement('span');
      ellipsis.textContent = '...';
      localPageIndicator.appendChild(ellipsis);
    }

    const lastPageButton = document.createElement('button');
    lastPageButton.classList.add('page-number');
    lastPageButton.textContent =
      isCatalogHomePage && currentPage < 24 ? 24 : totalPages;
    lastPageButton.addEventListener('click', () =>
      goToPage(isCatalogHomePage && currentPage < 24 ? 24 : totalPages)
    );
    localPageIndicator.appendChild(lastPageButton);
  }

  const nextArrow = createArrowButton('next', currentPage, totalPages);
  localPageIndicator.appendChild(nextArrow);

}

// * Проверяет наличие кнопки "предыдущая страница"
if (prevPageBtn) {
  prevPageBtn.addEventListener('click', async () => {
    currentPage--;
    if (currentQuery) {
      await searchMovies(currentQuery);
    } else {
      await getTrendingMovies();
    }
  });
}

// * Проверяет наличие кнопки "следующая страница"
if (nextPageBtn) {
  nextPageBtn.addEventListener('click', async () => {
    currentPage++;
    if (currentQuery) {
      await searchMovies(currentQuery);
    } else {
      await getTrendingMovies();
    }
  });
}

// * Функция, которая обновляет текущую страницу на переданную pageNumber, сохраняет значение в локальном
// * хранилище и вызывает соответствующую функцию для отображения соответствующих фильмов.

function modalIsOpen() {
  return document.querySelector('.modal').style.display === 'block';
}
async function goToPage(pageNumber) {
  if (pageNumber < 1 || pageNumber > totalPages) {
    return;
  }
  // window.scrollTo({
  //   top: 0,
  //   behavior: "smooth"
  // });
  currentPage = pageNumber;
  localStorage.setItem('currentPage', currentPage);
  localStorage.setItem('currentQuery', currentQuery);

  // * Проверяем, является ли поиск активным и если да, то проверяем, был ли запрос выполнен из модального окна
  if (currentQuery && isSearchActive) {
    if (modalIsOpen()) {
      await searchMovies(currentQuery, closeModal);
    } else {
      await searchMovies(currentQuery);
    }
  } else {
    await getTrendingMovies();
  }

  updatePaginationInfo();
}

// ** Функция, отображающая индикатор загрузки
function showLoadingIndicator() {
  const loadingIndicator = document.getElementById('search-loading');
  loadingIndicator.style.display = 'block';
}

// ** Функция, скрывающая индикатор загрузки
function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById('search-loading');
  loadingIndicator.style.display = 'none';
}

// ** Функция, инициализирующая "ленивую" загрузку контента
function initLazyLoading() {
  observer = new IntersectionObserver(async (entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        currentPage++;
        if (currentQuery) {
          await searchMovies(currentQuery);
        } else {
          await getTrendingMovies();
        }
        updatePaginationInfo();
        observer.unobserve(entry.target);
        observeLastMovieElement();
      }
    });
  }, { threshold: 1 });

  observeLastMovieElement();
}

// ** Функция, начинающая наблюдение за последним элементом списка фильмов
function observeLastMovieElement() {
  let lastMovieElement = document.querySelector('.movie:last-child');
  if (lastMovieElement) {
    observer.observe(lastMovieElement);
  }
}

getTrendingMovies();
initLazyLoading();

// !!!!!!!!!!!!Привет


////!/!!!!!!!!!!!!!**/*/