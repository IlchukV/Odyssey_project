// ! Пробная заглушка для поиска фильма

export function showModal() {
  const modal = document.createElement("div");
  modal.classList.add("search-modal");

  const modalContent = `
    <div class="search-modal-content">
      <span class="search-modal-close">&times;</span>
      <p class="search-modal-content__text-modal">OOPS...<br>We are very sorry!<br>We don’t have any results due to your search.</p>
    </div>
  `;

  modal.innerHTML = modalContent;

  const modalCloseButton = modal.querySelector(".search-modal-close");
  modalCloseButton.addEventListener("click", () => {
    modal.remove(); // закрываем модальное окно
    document.body.style.overflow = ""; // возвращаем прокрутку страницы
  });

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden"; // отключаем прокрутку страницы

  return modal;
}



// async function searchMoviesForModal(query, modal) {
//   if (!query) {
//     console.log("Пустой поисковый запрос");
//     return;
//   }

//   try {
//     const response = await fetch(
//       `${BASE_URL}search/movie?api_key=${apiKey}&language=ru-RU&query=${encodeURIComponent(
//         query
//       )}&page=1&include_adult=false`
//     );
//     const data = await response.json();
//     const movies = data.results;

//     console.log(`Поисковый запрос: ${query}`);

//     if (movies.length > 0) {
//       modal.remove();
//       // Здесь вы можете обновить список фильмов на странице
//       // Например: updateMovieList(movies);
//     } else {
//       const inputField = modal.querySelector("#search-modal-input");
//       inputField.value = "";
//       inputField.placeholder = "Поиск не дал результатов. Попробуйте снова.";
//     }
//   } catch (error) {
//     console.error("Ошибка при выполнении поиска фильмов:", error);
//   }
// }

