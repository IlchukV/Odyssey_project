// ! Пробная заглушка для поиска фильма

export function showModal(message) {
    const modalContent = document.querySelector('.modal-content');
    modalContent.textContent = message;
    modal.classList.add('visible');
    modalOverlay.classList.add('visible');
}

const modal = document.createElement('div');
modal.className = 'modal';

const modalContent = document.createElement('div');
modalContent.className = 'modal-content';
modal.appendChild(modalContent);

const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
modalOverlay.addEventListener('click', () => {
    modal.classList.remove('visible');
    modalOverlay.classList.remove('visible');
});

document.body.appendChild(modal);
document.body.appendChild(modalOverlay);