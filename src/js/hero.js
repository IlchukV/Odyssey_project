import slideTmpl from './slideTmpl';
import defaultSlideTmpl from './defaultSlideTmpl';
import defaultLibarySlideTmpl from './defaultLibarySlideTmpl';
import swiper from 'swiper';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
const swipeControlRefs = document.querySelector('.swiper-control');
const page = window.location.pathname;

(async function renderHeroSlides() {
  try {
    const { data } = await getMoviesForDay();
    const slides = await slideTmpl(data);

    sliderWrapRefs.innerHTML = await slides;
    swipeControlRefs.classList.add('swiper-control--show');
    swiper.update();
  } catch (error) {
    Notify.failure(`Error ${error.message}`);
    sliderWrapRefs.innerHTML = page.includes('library')
      ? defaultLibarySlideTmpl
      : defaultSlideTmpl;
  }
})();
