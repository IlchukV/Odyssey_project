import axios from 'axios';
import noPoster from '../images/noposter.jpg';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'e1aeaa11db3ac22382c707ccfcac931e';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

const refs = {
  upcomingMoviesSection: document.querySelector('.container--upcoming'),
};

async function fetchUpcomingMovieAndGenre() {
  const searchParams = new URLSearchParams({
    api_key: `${API_KEY}`,
    region: 'UA',
  });

  const response = await axios.get(
    `${BASE_URL}/movie/upcoming?${searchParams}`
  );

  const genres = await axios.get(
    `${BASE_URL}/genre/movie/list?${searchParams}&release_date.gte=2023-05-01&release_date.lte=2023-05-31&with_release_type=1`
  );

  return { response, genres };
}

fetchUpcomingMovieAndGenre()
  .then(({ response, genres }) => {
    const movie =
      response.data.results[
        Math.floor(response.data.results.length * Math.random())
      ];

    const genreList = getGenres(movie, genres);

    let date = dateFormate(movie);

    refs.upcomingMoviesSection.innerHTML = UpcomingMovieMarkup(
      movie,
      genreList,
      date
    );

    if (window.screen.width > 767) {
      const isBackdropPath = movie.backdrop_path
        ? movie.backdrop_path
        : noPoster;

      if (isBackdropPath === noPoster) {
        getPositionOfPosterInDom().style.backgroundImage = `url('${isBackdropPath}')`;

        return;
      }
      getPositionOfPosterInDom().style.backgroundImage = `url('${IMG_URL}${isBackdropPath}')`;

      return;
    }
    getPositionOfPosterInDom().style.backgroundImage = `url('${IMG_URL}${movie.poster_path}')`;
  })
  .catch(console.log);

function UpcomingMovieMarkup(el, genres, date) {
  return `
                <h2 class="section-title">UPCOMING THIS MONTH</h2>
                <div class="movie">
                    <div class="movie__picture"></div>
                    <div class="movie__info">
                        <h3 class="movie__title">${el.original_title}</h3>
                        <ul class="movie__categories">
                            <div class="movie-categories-separate">
                                <li class="movie__item">
                                    Release date <span class="movie__item--accent">${date}</span>
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
            `;
}

function getPositionOfPosterInDom() {
  return document.querySelector('.movie__picture');
}

function getGenres(movie, genres) {
  return genres.data.genres
    .filter(el => movie.genre_ids.includes(el.id))
    .filter((el, index) => index <= 1)
    .map(el => el.name);
}

function dateFormate(movie) {
  let date = movie.release_date.replaceAll('-', '.').split('.');
  date.reverse();
  date = date.join('.');
  return date;
}
