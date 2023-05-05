// !!Обработчик события, который перенаправляет пользователя на страницу каталога при нажатии на кнопку "Каталог"


document.addEventListener('DOMContentLoaded', () => {
    const catalogBtn = document.getElementById("catalog-btn");
    if (catalogBtn) {
        catalogBtn.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('currentQuery');
            localStorage.setItem('currentPage', 1);
            window.location.href = 'header-catalog.html';
        });
    }
});