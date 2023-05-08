// !! Пробная заглушка для поиска фильма
import { showModal } from './catalog-modal-close';

// !! Пробная заглушка выбора фильма при нажатии на карточку
import { showFoundModal } from './movie-found';

const apiKey = 'e1aeaa11db3ac22382c707ccfcac931e';
const BASE_URL = 'https://api.themoviedb.org/3/';
let currentPage = 1;
let totalPages = 0;
let currentQuery = '';
let isCatalogHomePage = true;

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const moviesList = document.querySelector('.movies-list');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const localPageIndicator = document.querySelector('.page-indicator');

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
                <div class="movie-item movie-card">
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

  // !! Заглушка при нажатии на карточку фильма он открывается
  document.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', () => {
      showFoundModal('Наслаждайтесь просмотром');
    });
  });
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
async function getTrendingMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}trending/movie/day?api_key=${apiKey}&page=${currentPage}`
    );
    const data = await response.json();
    totalPages = data.total_pages;
    displayMovies(data.results);
    updatePaginationInfo();
  } catch (error) {
    console.error(error);
  }
}

// *Функция отправляет запрос к API для получения списка фильмов по запросу
// ! Работающая функция без ошибки, что фильм не найден
// async function searchMovies(query) {
//     const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${currentPage}`;
//     const data = await fetchMovies(url);
//     totalPages = data.total_pages;
//     displayMovies(data.results);
//     updatePaginationInfo();
//     searchInput.value = '';
// }

// !! Заглушка для поиска фильма
async function searchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${currentPage}`;
  const data = await fetchMovies(url);
  totalPages = data.total_pages;

  // проверка количества найденных фильмов
  if (data.results.length === 0) {
    showModal('Фильм не найден по названию.');
  } else {
    displayMovies(data.results);
    updatePaginationInfo();
  }

  searchInput.value = '';
}

// *Слушатель событий для формы поиска
searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    return;
  }
  currentPage = 1;
  currentQuery = query;
  await searchMovies(query);
});

// * Функция формирует и отображает элементы пагинации на странице. Включает кнопки "назад",
// *"вперед" и номера страниц для перемещения между страницами.
function updatePaginationInfo() {
  localPageIndicator.innerHTML = '';

  if (totalPages <= 1) {
    return;
  }

  const prevArrow = document.createElement('span');
  prevArrow.classList.add('arrow-button');
  prevArrow.innerHTML = `
    <svg width="28px" height="28px" viewBox="0 0 32 32" class="prev-page-svg">
        <path fill="none" stroke="#b7b7b7" style="stroke: var(--color1, #b7b7b7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M20.5 7l-9 9 9 9"></path>
    </svg>`;
  if (currentPage === 1) {
    prevArrow.classList.add('disabled');
  }
  prevArrow.addEventListener('click', () => {
    if (currentPage !== 1) {
      goToPage(currentPage - 1);
    }
  });
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

  // *проверяет, находится ли первая страница в пагинации на первом месте,
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

  const nextArrow = document.createElement('span');
  nextArrow.classList.add('arrow-button');
  nextArrow.innerHTML = `
    <svg width="28px" height="28px" viewBox="0 0 32 32" class="next-page-svg">
        <path fill="none" stroke="#f8f8f8" style="stroke: var(--color1, #f8f8f8)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M11.5 7l9 9-9 9"></path>
    </svg>`;

  if (currentPage === totalPages) {
    nextArrow.classList.add('arrow-disabled');
  } else {
    nextArrow.classList.remove('arrow-disabled');
  }

  nextArrow.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage += 1;
      goToPage(currentPage);
      if (currentPage === totalPages) {
        nextArrow.classList.add('arrow-disabled');
      } else {
        nextArrow.classList.remove('arrow-disabled');
      }
    }
  });
  localPageIndicator.appendChild(nextArrow);
}

// * проверяет наличие кнопки "предыдущая страница"
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

// * проверяет наличие кнопки "следующая страница"
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
async function goToPage(pageNumber) {
  if (pageNumber < 1 || pageNumber > totalPages) {
    return;
  }
  currentPage = pageNumber;
  localStorage.setItem('currentPage', currentPage);
  localStorage.setItem('currentQuery', currentQuery);
  if (currentQuery) {
    await searchMovies(currentQuery);
  } else {
    await getTrendingMovies();
  }
}

// * Функция, которая сбрасывает значения текущего запроса и страницы,
// * а также очищает локальное хранилище и элемент ввода поискового запроса.
function resetToFirstPage() {
  currentPage = 1;
  currentQuery = '';
  localStorage.removeItem('currentQuery');
  searchInput.value = '';
  getTrendingMovies();
}

getTrendingMovies();
