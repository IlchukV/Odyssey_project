import axios from 'axios';
import { refs } from './refs';
const KEY = 'e1aeaa11db3ac22382c707ccfcac931e';
import { createRatingStars } from './catalog';
import { handleMovieClick } from '../js/details-modal';

// const refs.upcomingMoviesSection = document.querySelector('.weeklytrends_gallery_list');

if (refs.weeklyGallery === null) {
  return;
}

//отримує від API трендс response та жанри в genreList.

async function getMovies() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}`
    );

    const genreList = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}`
    );

    let galleryCardsList = createWeeklyGalery(response.data);
    let trendMovieList = galleryCardsList;

    // if (window.screen.width < 767) {
    //   trendMovieList = galleryCardsList.filter((el, index) => index < 1);
    // }

    const genres = genreList.data.genres;

    refs.weeklyGallery.innerHTML = cardsMarkup(trendMovieList, genres);
    refs.weeklyGallery.addEventListener('click', handleMovieClick);
  } catch (error) {
    console.log(error);
  }
}

// рандомні 3 фільми за результатами запиту API

function createWeeklyGalery({ results }) {
  const randomResults = [];
  while (randomResults.length < 3) {
    const randomIndex = Math.floor(Math.random() * results.length);
    const randomElement = results[randomIndex];

    if (randomResults.includes(randomElement)) {
      continue;
    }
    randomResults.push(randomElement);
  }
  return randomResults;
}

// рендер картки

function cardsMarkup(cards, genreList) {
  return cards
    .map(card => {
      const genres = genreList
        .filter(el => card.genre_ids.includes(el.id))
        .filter((el, index) => index <= 1)
        .map(el => el.name);

      const releaseDate = new Date(card.release_date).getFullYear();
      const ratingStars = createRatingStars(card.vote_average);

      return `<div class="movie-item movie-card weekly-trends--card" id=${card.id}>
                    <img class="weeklytrends_gallery_image"
                    src="https://image.tmdb.org/t/p/w200${card.poster_path}" 
                    srcset="
                        https://image.tmdb.org/t/p/w200${card.poster_path} 200w,
                        https://image.tmdb.org/t/p/w300${card.poster_path} 300w,
                        https://image.tmdb.org/t/p/w500${card.poster_path} 500w
                    "
                    sizes="(max-width: 768px) 200px, (max-width: 1280px) 300px, 500px"
                    alt="${card.title}"
                    >
                    <div class="movie-details weekly-trends--flex">
                    <h3>${card.title}</h3>
                        <div class="movie-genres-and-rating weekly-trends--start">
                    <div class="movie-info">
                        <span class="movie-genre">${genres.join(', ')}</span>
                        <span class="movie-separator">|</span>
                        <span class="movie-year">${releaseDate}</span>
                    </div>
                    <div class="movie-rating">
                        ${ratingStars}
                    </div>
                    </div>
                    </div>
                </div>`;
    })
    .join('');
}

// function addDynamicClass() {
  
//   const elements = document.querySelectorAll(".card");
//   console.log(elements);
//     elements.forEach((element, index) => {
//     const dynamicClass = `movie-item-${index + 1}`;
//     element.classList.add(dynamicClass);
//   });
// }
getMovies();
// addDynamicClass();
