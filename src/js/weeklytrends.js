import axios from 'axios';
const KEY = 'e1aeaa11db3ac22382c707ccfcac931e';

const weeklyGallery = document.querySelector('.weeklytrends_gallery_list');
let genre = '';
if (weeklyGallery === null) {
  return;
}

async function getMovies() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}`
    );
    createWeeklyGalery(response.data);
  } catch (error) {
    console.log(error);
  }
}

function createWeeklyGalery({ results }) {
  const randomResults = [];
  while (randomResults.length < 3) {
    const randomIndex = Math.floor(Math.random() * results.length);
    const randomElement = results[randomIndex];
    if (!randomResults.includes(randomElement)) {
      randomResults.push(randomElement);
    }
  }
  weeklyGallery.innerHTML = createListHtml(randomResults);
}

function createListHtml(resultArray) {
  console.log(resultArray);
  return (list = resultArray.reduce(
    (markup, item) => markup + createWeeklyCard(item),
    ''
  ));
}

async function getDetails(id) {
  try {

    const details = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`)
    console.log(details)
  } catch (error) { 

    console.log(error);
  }
}

function createWeeklyCard(card) {

  const genre = getDetails(card.id)
 console.log(card)

  return `<div class="movie-item movie-card" id=${card.id}>
                    <img
                    src="https://image.tmdb.org/t/p/w200${card.poster_path}" 
                    srcset="
                        https://image.tmdb.org/t/p/w200${card.poster_path} 200w,
                        https://image.tmdb.org/t/p/w300${card.poster_path} 300w,
                        https://image.tmdb.org/t/p/w500${card.poster_path} 500w
                    "
                    sizes="(max-width: 768px) 200px, (max-width: 1280px) 300px, 500px"
                    alt="${card.title}">
                    <div class="movie-details weekly-trends--flex">
                    <h3>${card.title}</h3>
                        <div class="movie-genres-and-rating weekly-trends--start">
                        <div class="movie-info">
                        <span class="movie-separator">|</span>
                        <span class="movie-year">${card.release_date}</span>
                    </div>
                    </div>
                    </div>
                </div>
                `;
}
getMovies();
