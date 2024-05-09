const buttonsContainer = document.querySelector('[data-container]');
let keyPressedInfo = document.createElement('p');

keyPressedInfo.dataset.keyInfo = "key-info-element";
buttonsContainer.parentNode.append(keyPressedInfo);

buttonsContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON')
        document.querySelector('[data-key-info]').textContent = "Was pressed " + event.target.textContent;
});

