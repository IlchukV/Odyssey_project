
const apiKey = "142a08b8b46a996988de76365e4c9ff1";
let currentPage = 1;
let totalPages = 0;
let currentQuery = '';

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const moviesList = document.querySelector(".movies-list");
const prevPageBtn = document.getElementById("prev-page");
const nextPageBtn = document.getElementById("next-page");
const localPageIndicator = document.querySelector(".page-indicator");

async function fetchMovies(url) {
    const response = await fetch(url);
    return response.json();
}

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

async function getTrendingMovies() {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=${currentPage}`;
    const data = await fetchMovies(url);
    totalPages = data.total_pages;
    displayMovies(data.results);
    updatePaginationInfo();
}

async function searchMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${currentPage}`;
    const data = await fetchMovies(url);
    totalPages = data.total_pages;
    displayMovies(data.results);
    updatePaginationInfo();
}

// !Пагинация

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

document.addEventListener('DOMContentLoaded', async () => {
    currentPage = Number(localStorage.getItem('currentPage')) || 1;
    currentQuery = localStorage.getItem('currentQuery') || '';

    if (currentQuery) {
        searchInput.value = currentQuery;
        await searchMovies(currentQuery);
    } else {
        await getTrendingMovies();
    }
});


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


