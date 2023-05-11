
import { searchMovies } from './catalog';

export function showModal() {
  const modal = document.querySelector(".search-modal");

  const modalSearchInput = modal.querySelector(".search-block_search-input");
  const modalSearchButton = modal.querySelector(".search-block_submit-btn");

  modalSearchInput.disabled = true;
  modalSearchButton.style.pointerEvents = "none";

  const modalCloseButton = modal.querySelector(".search-modal-close");
  modalCloseButton.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
    const mainSearchInput = document.querySelector("#main-search-input");
    if (mainSearchInput) {
      mainSearchInput.value = "";
    }

    modalSearchInput.disabled = false;
    modalSearchButton.style.pointerEvents = "";
  });

  const searchForm = modal.querySelector("#search-form");
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchTerm = modalSearchInput.value.trim();

    if (searchTerm) {
      searchFromModal = true; // Установите переменную в true перед выполнением поиска
      const searchSuccess = await searchMovies(searchTerm, true);
      if (searchSuccess) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      } else {
        modalSearchInput.value = "";
      }
    }
  });

  modalSearchInput.value = '';

  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  return modal;
}
