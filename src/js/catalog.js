const apiKey = "e1aeaa11db3ac22382c707ccfcac931e";
let currentPage = 1;
let totalPages = 0;
let currentQuery = '';

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const moviesList = document.querySelector(".movies-list");
const prevPageBtn = document.getElementById("prev-page");
const nextPageBtn = document.getElementById("next-page");
const localPageIndicator = document.querySelector(".page-indicator");

// ! Функция, которая отправляет GET-запрос по переданному URL и возвращает полученный ответ в виде объекта.
async function fetchMovies(url) {
    const response = await fetch(url);
    return response.json();
}

// ! Функция, которая принимает массив объектов фильмов и формирует из него HTML-код,
// ! который затем добавляется внутрь элемента с классом movies - list.

function displayMovies(movies) {
    const movieItems = movies
        .map((movie) => {
            return `<div class="movie-item">
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        </div>`;
        })
        .join("");

    moviesList.innerHTML = movieItems;
}

// !Функция, которая отправляет GET-запрос к API для получения списка популярных фильмов за неделю и вызывает функцию displayMovies() 
// !для отображения результата на странице.
// !Также функция обновляет общее количество страниц и вызывает функцию updatePaginationInfo() для отображения пагинации.

async function getTrendingMovies() {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=${currentPage}`;
    const data = await fetchMovies(url);
    totalPages = data.total_pages;
    displayMovies(data.results);
    updatePaginationInfo();
}

//! Функция, которая отправляет GET-запрос к API для поиска фильмов по переданному запросу query и вызывает функцию displayMovies() 
// ! для отображения результата на странице.
// ! Также функция обновляет общее количество страниц и вызывает функцию updatePaginationInfo() для отображения пагинации.

async function searchMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${currentPage}`;
    const data = await fetchMovies(url);
    totalPages = data.total_pages;
    displayMovies(data.results);
    updatePaginationInfo();
    searchInput.value = '';
}

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) {
        return;
    }
    currentPage = 1;
    currentQuery = query;
    await searchMovies(query);
});


// ! Функция, которая формирует элементы пагинации на основе текущих значений currentPage и totalPages,
// ! а также отображает их на странице.Внутри функции создаются кнопки "назад", "вперед" и номера страниц,
// ! которые позволяют перемещаться между страницами.

function updatePaginationInfo() {
    localPageIndicator.innerHTML = "";

    if (totalPages <= 1) {
        return;
    }

    const prevArrow = document.createElement("button");
    prevArrow.classList.add("arrow-button");
    prevArrow.innerHTML = `<svg width="28px" height="28px" class="prev-page-svg"><use href="#"></use></svg>`;
    prevArrow.disabled = currentPage === 1;
    prevArrow.addEventListener("click", () => goToPage(currentPage - 1));
    localPageIndicator.appendChild(prevArrow);

    const maxVisiblePages = 5;
    const firstVisiblePage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const lastVisiblePage = Math.min(totalPages, firstVisiblePage + maxVisiblePages - 1);

    // *проверяет, находится ли первая страница в пагинации на первом месте, 
    // *и если нет, то создает кнопку "1" и добавляет ее в пагинацию.
    if (firstVisiblePage > 1) {
        const firstPageButton = document.createElement("button");
        firstPageButton.classList.add("page-number");
        firstPageButton.textContent = 1;
        firstPageButton.addEventListener("click", () => goToPage(1));
        localPageIndicator.appendChild(firstPageButton);

        if (firstVisiblePage > 2) {
            const ellipsis = document.createElement("span");
            ellipsis.textContent = "...";
            localPageIndicator.appendChild(ellipsis);
        }
    }

    // *создает кнопки для каждой видимой страницы и добавляет их в пагинацию
    for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
        const pageButton = document.createElement("button");
        pageButton.classList.add("page-number");
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add("active");
        }
        pageButton.addEventListener("click", () => goToPage(i));
        localPageIndicator.appendChild(pageButton);
    }

    // *проверяет, находится ли последняя доступная страница в пагинации на последнем месте, 
    // * и если нет, то добавляет кнопку с номером последней страницы и многоточие, 
    // * если есть страницы после последней доступной страницы.
    if (lastVisiblePage < totalPages) {
        if (lastVisiblePage < totalPages - 1) {
            const ellipsis = document.createElement("span");
            ellipsis.textContent = "...";
            localPageIndicator.appendChild(ellipsis);
        }

        const lastPageButton = document.createElement("button");
        lastPageButton.classList.add("page-number");
        lastPageButton.textContent = totalPages;
        lastPageButton.addEventListener("click", () => goToPage(totalPages));
        localPageIndicator.appendChild(lastPageButton);
    }

    const nextArrow = document.createElement("button");
    nextArrow.classList.add("arrow-button");
    nextArrow.innerHTML = `<svg width="28px" height="28px" class="next-page-svg"><use href="#"></use></svg>`;
    nextArrow.disabled = currentPage === totalPages;
    nextArrow.addEventListener("click", () => goToPage(currentPage + 1));
    localPageIndicator.appendChild(nextArrow);
}

// ! Функция, которая обновляет текущую страницу на переданную pageNumber, сохраняет значение в локальном 
// ! хранилище и вызывает соответствующую функцию для отображения соответствующих фильмов.
async function goToPage(pageNumber) {
    currentPage = pageNumber;
    localStorage.setItem('currentPage', currentPage);
    localStorage.setItem('currentQuery', currentQuery);
    if (currentQuery) {
        await searchMovies(currentQuery);
    } else {
        await getTrendingMovies();
    }
}

// ! функция, которая сбрасывает значения текущего запроса и страницы, 
// ! а также очищает локальное хранилище и элемент ввода поискового запроса.
function resetToFirstPage() {
    currentPage = 1;
    currentQuery = '';
    localStorage.removeItem('currentQuery');
    searchInput.value = '';
    getTrendingMovies();
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

getTrendingMovies();
