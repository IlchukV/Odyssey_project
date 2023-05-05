import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'e1aeaa11db3ac22382c707ccfcac931e';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

const refs = {
  upcomingMoviesSection: document.querySelector('.upcoming'),
};

const searchParams = new URLSearchParams({
  api_key: `${API_KEY}`,
});

async function fetchUpcomingMovieAndGenre() {
  const response = await axios.get(
    `${BASE_URL}/movie/upcoming?${searchParams}`
  );
  const genres = await axios.get(
    `${BASE_URL}/genre/movie/list?${searchParams}`
  );
  return { response, genres };
}

fetchUpcomingMovieAndGenre().then(({ response, genres }) => {
  const movie =
    response.data.results[
      Math.floor(response.data.results.length * Math.random())
    ];

  const genreList = genres.data.genres
    .filter(el => movie.genre_ids.includes(el.id))
    .filter((el, index) => index <= 1)
    .map(el => el.name);

  refs.upcomingMoviesSection.innerHTML = UpcomingMovieMarkup(movie, genreList);

  if (window.screen.width > 767) {
    document.querySelector(
      '.movie__picture'
    ).style.backgroundImage = `url('${IMG_URL}${movie.backdrop_path}')`;
    return;
  }
  document.querySelector(
    '.movie__picture'
  ).style.backgroundImage = `url('${IMG_URL}${movie.poster_path}')`;
});

function UpcomingMovieMarkup(el, genres) {
  return `<div div class= "container" >
                <h2 class="section-title">UPCOMING THIS MONTH</h2>
                <div class="movie">
                    <div class="movie__picture"></div>
                    <div class="movie__info">
                        <h3 class="movie__title">${el.original_title}</h3>
                        <ul class="movie__categories">
                            <div class="movie-categories-separate">
                                <li class="movie__item">
                                    Release date <span class="movie__item--accent">${
                                      el.release_date
                                    }</span>
                                </li>
                                <li class="movie__item">
                                    Vote / Votes
                                    <span class="movie__item--group"
                                        ><span class="movie__item--left">${
                                          el.vote_average
                                        }</span>/<span
                                            class="movie__item--right"
                                            >${el.vote_count}</span
                                        ></span
                                    >
                                </li>
                            </div>
                            <div>
                                <li class="movie__item">
                                    Popularity <span class="movie__item--default">${Math.round(
                                      el.popularity
                                    )}</span>
                                </li>
                                <li class="movie__item">
                                    Genre
                                    <span class="movie__item--default movie__item--margin"
                                        >${genres.join(', ')}</span
                                    >
                                </li>
                            </div>
                        </ul>
                        <h4 class="movie__about">ABOUT</h4>
                        <p class="movie__descr">
                        ${el.overview}
                        </p>
                        <div class="movie__btn">
                            <button class="movie__btn-fill">Remind me</button>
                        </div>
                    </div>
                </div>
            </div>`;
}
