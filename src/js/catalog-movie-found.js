export function showFoundModal(message) {
    const foundModalContent = document.querySelector('.found-modal-content');
    foundModalContent.textContent = message;
    foundModal.classList.add('visible');
    foundModalOverlay.classList.add('visible');
}

const foundModal = document.createElement('div');
foundModal.className = 'modal';

const foundModalContent = document.createElement('div');
foundModalContent.className = 'found-modal-content';
foundModal.appendChild(foundModalContent);

const foundModalOverlay = document.createElement('div');
foundModalOverlay.className = 'modal-overlay';
foundModalOverlay.addEventListener('click', () => {
    foundModal.classList.remove('visible');
    foundModalOverlay.classList.remove('visible');
});

document.body.appendChild(foundModal);
document.body.appendChild(foundModalOverlay);