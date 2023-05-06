function createGalleryCard(queriesArray) {
  const markup = queriesArray
    .map(item => {
      return `<div class="photo-card">
  <div class="thumb"><img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" /></div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span>${item.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span>${item.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span>${item.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span>${item.downloads}</span>
    </p>
  </div>
</div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}