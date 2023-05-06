import slideTmpl from './template/slideTmpl';
import swiper from './swiper';
import Notiflix from 'notiflix';

/*-- Потрібно винести в API--*/

import axios from 'axios';

const API_KEY = 'e1aeaa11db3ac22382c707ccfcac931e';

const fetchMoviesForDay = axios.create({
  baseURL: 'https://api.themoviedb.org/3/trending/movie/day',
  params: {
    api_key: API_KEY,
  },
});

async function getMoviesForDay() {
  try {
    return await fetchMoviesForDay.get('');
  } catch (err) {
    throw err;
  }
}
/*-- кінець блоку для API--*/
const sliderWrapRefs = document.querySelector('.swiper-wrapper');

(async function renderHeroSlides() {
  const { data } = await getMoviesForDay();
  const slides = await slideTmpl(data);
  sliderWrapRefs.innerHTML = await slides;
  swiper.update();
})();
