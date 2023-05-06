function ratingPercent(voites) {
  return (voites * 100) / 10;
}

url = new URL('../../images/raiting_contour.png', import.meta.url);

export default function (data) {
  return data.results
    .slice(0, 5)
    .map(({ backdrop_path, original_title, vote_average, overview, id }) => {
      return `<div class="hero__card swiper-slide">
      <div class="hero__info">
      <h1 class="hero__title">${original_title}</h1>
      <div class="raiting">
      <div class="raiting__fill-image" style="width:${ratingPercent(
        vote_average
      )}%"></div>
      <img class="raiting__image" src="${url}" alt="hero">
      </div>
      <p class="hero__description">${overview}</p>
      <button class="hero__btn" type="button" data-id="${id}">Watch trailer</button>
      </div>
      <div class="hero__image-wrap">
      <img class="hero__image" src="https://image.tmdb.org/t/p/original${backdrop_path}" alt="hero">
      </div>
      </div>`;
    })
    .join('');
}
