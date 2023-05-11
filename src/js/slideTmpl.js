function ratingPercent(voites) {
  return (voites * 100) / 10;
}

import url from '../images/hero/raiting_contour.png';
import urlRetina from '../images/hero/raiting_contour@2x.png';
import urlTab from '../images/hero/raiting_contour_tablet.png';
import urlTabRetina from '../images/hero/raiting_contour_tablet@2x.png';
import urlMob from '../images/hero/raiting_contour_mobile.png';
import urlRetinaMob from '../images/hero/raiting_contour_mobile@2x.png';

export default function (data) {
  return data.results
    .slice(0, 5)
    .map(({ backdrop_path, original_title, vote_average, overview, id }) => {
      return `<div class="hero__card swiper-slide">
      <div class="hero__info">
      <h2 class="hero__title">${original_title}</h2>
      <div class="raiting">
      <div class="raiting__fill-image" style="width:${ratingPercent(
        vote_average
      )}%"></div>
      <picture>
        <source srcset="${url} 1x, .${urlRetina} 2x" media="(min-width: 1280px)"
          type="image/png" />
          <source srcset="${urlTab} 1x, .${urlTabRetina} 2x" media="(min-width: 768px)"
          type="image/png" />
        <source srcset="${urlMob} 1x, ${urlRetinaMob} 2x" media="(max-width: 767px)"
          type="image/png" />
        <img class="raiting__image" src="${urlMob}" alt="hero" loading="lazy">
      </picture>
      </div>
      <p class="hero__description">${overview}</p>
      <button class="hero__btn js-hero-trailer" type="button" data-id="${id}">Watch trailer</button>
      </div>
      <div class="hero__image-wrap">
      <img class="hero__image" src="https://image.tmdb.org/t/p/original${backdrop_path}" alt="hero">
      </div>
      </div>`;
    })
    .join('');
}
