"use strict";

function createEl({type = "div", content, attributes}) {
    const $el = document.createElement(type);

    if (content)
        $el.textContent = content;

    if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {

            if (key !== "style" && typeof value !== "object")
                return $el.setAttribute(key, value);

            Object.entries(value).forEach(([styleKey, styleValue]) => {
                $el.style[styleKey] = styleValue;
            });
        });
    }

    return $el;
}

function countdownOutput(minutes, elemToOutput) {

    let timer = minutes * 60;
    let timerMins = minutes - 1;
    let timerSeconds = 60;
    let timerPrint = `${timerMins + 1} : 00`;

    elemToOutput.textContent = timerPrint;

    const intervalId = setInterval(() => {

        timer--;
        timerSeconds--;

        if (timerSeconds === 0 && timerMins === 0 && timer === 0) {
            timerSeconds = 0;
        } else if (timerSeconds === 0 && timerMins >= 1) {
            timerSeconds = 59;
            timerMins--;
        } else if (timerSeconds === 0 && timerMins === 0) {
            timerSeconds = 59;
        }

        timerPrint = `${timerMins} : ${timerSeconds}`;
        elemToOutput.textContent = timerPrint;

        if (timer === 0) clearInterval(intervalId)
    }, 1000);

    elemToOutput.dataset.intervalId = intervalId.toString();
}

function createHtmlCountdownElement(parent) {

    let countdownField = createEl({type: 'div', content: '', attributes: {class: 'countdown-field'}});
    let countdownEl = createEl({type: 'p', content: '', attributes: {class: 'countdown'}});

    countdownField.dataset.countdownField = '';
    countdownEl.dataset.countdown = '';

    countdownField.append(countdownEl);
    parent.append(countdownField);
}

const countdownContainer = document.querySelector('.countdown-container');
const startButton = document.querySelector('.btn-start');

startButton.addEventListener('click', () => {

    const inputMinutes = parseInt(document.querySelector('.input-minutes').value);

    if (isFinite(inputMinutes) && inputMinutes > 0) {

        createHtmlCountdownElement(countdownContainer);

        const countdownEl = countdownContainer.querySelector('.countdown-field:last-child .countdown');

        countdownOutput(inputMinutes, countdownEl);
    }
});


