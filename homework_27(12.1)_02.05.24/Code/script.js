const buttonsContainer = document.querySelector('[data-container]');
let linkToGo = "";

buttonsContainer.addEventListener('click', (event) => {
    const targetButton = event.target.dataset.button;

    if (targetButton === 'button-input') {
        linkToGo = prompt('Enter please link to go (default: google.com)', 'https://www.google.com');
    }

    if (targetButton === 'button-open') {
        window.location.href = linkToGo;
    }

});