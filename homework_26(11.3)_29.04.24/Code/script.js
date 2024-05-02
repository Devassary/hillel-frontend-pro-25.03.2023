const buttonTextColorChange = document.querySelector('#button-color-change');

buttonTextColorChange.addEventListener('click', textColorChange);

function textColorChange() {
    const textBlockForColorChange = document.getElementById('text-change-color');

    if (!textBlockForColorChange.style.color || textBlockForColorChange.style.color === 'white')
        textBlockForColorChange.style.color = 'violet';
    else
        textBlockForColorChange.style.color = 'white';
}