// function createGalleryCard(queriesArray) {
//   const markup = queriesArray
//     .map(item => {
//       return `<div class="photo-card">
//   <div class="thumb"><img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" /></div>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b><span>${item.likes}</span>
//     </p>
//     <p class="info-item">
//       <b>Views</b><span>${item.views}</span>
//     </p>
//     <p class="info-item">
//       <b>Comments</b><span>${item.comments}</span>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b><span>${item.downloads}</span>
//     </p>
//   </div>
// </div>`;
//     })
//     .join('');
//   gallery.insertAdjacentHTML('beforeend', markup);
// }

function renderCard(title, imageSrc, description) {
  const card = document.createElement('div');
  card.classList.add('card');

  const image = document.createElement('img');
  image.src = imageSrc;
  image.alt = title;
  image.classList.add('card__image');
  card.appendChild(image);

  const content = document.createElement('div');
  content.classList.add('card__content');
  card.appendChild(content);

  const cardTitle = document.createElement('h2');
  cardTitle.textContent = title;
  cardTitle.classList.add('card__title');
  content.appendChild(cardTitle);

  const cardDescription = document.createElement('p');
  cardDescription.textContent = description;
  cardDescription.classList.add('card__description');
  content.appendChild(cardDescription);

  return card;
} 