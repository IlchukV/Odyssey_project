
import { searchMovies } from './catalog';

export function showModal() {
  const modal = document.querySelector(".search-modal");

  const modalCloseButton = modal.querySelector(".search-modal-close");
  modalCloseButton.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
    // Очистка поля ввода на главной странице
    const mainSearchInput = document.querySelector("#main-search-input");
    if (mainSearchInput) {
      mainSearchInput.value = "";
    }
  });

  const searchForm = modal.querySelector("#search-form");
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchInput = modal.querySelector("#search-input");
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
      const searchSuccess = await searchMovies(searchTerm, true);
      if (searchSuccess) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      } else {
        searchInput.value = "";
      }
    }
  });

  const searchInput = modal.querySelector("#search-input");
  searchInput.value = ''; // Очистить поле ввода при открытии модального окна

  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  return modal;
}




