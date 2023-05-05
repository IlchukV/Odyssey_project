import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/movie/upcoming';
const API_KEY = 'e1aeaa11db3ac22382c707ccfcac931e';

const refs = {
  upcomingMoviesSection: document.querySelector('.upcoming'),
};

async function fetchUpcomingMovie() {
  const searchParams = new URLSearchParams({
    api_key: `${API_KEY}`,
  });
  const response = await axios.get(`${BASE_URL}?${searchParams}`);

  return response.data;
}

fetchUpcomingMovie().then(data => {
  const movie = data.results[Math.floor(data.results.length * Math.random())];

  console.log(movie);
  refs.upcomingMoviesSection.innerHTML = UpcomingMovieMarkup(movie);

  console.log(document.querySelector('.movie__picture'));
  document.querySelector('.movie__picture').style.backgroundImage =
    'url("9JBEPLTPSm0d1mbEcLxULjJq9Eh.jpg")';
});

function UpcomingMovieMarkup(el) {
  return `<div div class= "container" >
                <h2 class="section-title">UPCOMING THIS MONTH</h2>
                <div class="movie">
                    <div class="movie__picture"></div>
                    <div class="movie__info">
                        <h3 class="movie__title">${el.original_title}</h3>
                        <ul class="movie__categories">
                            <div class="movie-categories-separate">
                                <li class="movie__item">
                                    Release date <span class="movie__item--accent">${el.release_date}</span>
                                </li>
                                <li class="movie__item">
                                    Vote / Votes
                                    <span class="movie__item--group"
                                        ><span class="movie__item--left">${el.vote_average}</span>/<span
                                            class="movie__item--right"
                                            >${el.vote_count}</span
                                        ></span
                                    >
                                </li>
                            </div>
                            <div>
                                <li class="movie__item">
                                    Popularity <span class="movie__item--default">99.9</span>
                                </li>
                                <li class="movie__item">
                                    Genre
                                    <span class="movie__item--default movie__item--margin"
                                        >Comedy, action</span
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
