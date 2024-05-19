"use strict";

const contentItemsArr = [
    {
        image: '../Assets/Images/1.jpg',
        title: 'Slide #1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Fusce mattis ex sapien, vel vestibulum justo dignissim eu. ' +
            'Nam volutpat luctus rutrum. Nulla tincidunt tellus nunc, at tempus sem semper in. ',
    },
    {
        image: '../Assets/Images/2.jpg',
        title: 'Slide #2',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Fusce mattis ex sapien, vel vestibulum justo dignissim eu. ' +
            'Nam volutpat luctus rutrum. Nulla tincidunt tellus nunc, at tempus sem semper in. ',
    },
    {
        image: '../Assets/Images/3.jpg',
        title: 'Slide #3',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Fusce mattis ex sapien, vel vestibulum justo dignissim eu. ' +
            'Nam volutpat luctus rutrum. Nulla tincidunt tellus nunc, at tempus sem semper in. ',
    },
    {
        image: '../Assets/Images/4.jpg',
        title: 'Slide #4',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Fusce mattis ex sapien, vel vestibulum justo dignissim eu. ' +
            'Nam volutpat luctus rutrum. Nulla tincidunt tellus nunc, at tempus sem semper in. ',
    },
    {
        image: '../Assets/Images/5.jpg',
        title: 'Slide #5',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Fusce mattis ex sapien, vel vestibulum justo dignissim eu. ' +
            'Nam volutpat luctus rutrum. Nulla tincidunt tellus nunc, at tempus sem semper in. ',
    },
    {
        image: '../Assets/Images/6.jpg',
        title: 'Slide #6',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Fusce mattis ex sapien, vel vestibulum justo dignissim eu. ' +
            'Nam volutpat luctus rutrum. Nulla tincidunt tellus nunc, at tempus sem semper in. ',
    },
];

const sidesNavigationContainer = document.querySelector('[data-sides-navigation]');
const bottomNavigationContainer = document.querySelector('[data-bottom-navigation]');
const sliderContentEl = document.querySelector('.slider-content');

let currentSlideId = 0;

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

function createSliderBottomNavigation(arrLength, rootForRadioEl, rootForNavigationEl) {

    for (let i = 0; i < arrLength; i++) {

        let radioEl = createEl({
            type: 'input',
            content: '',
            attributes: {type: 'radio', id: `slider-r${i}`, class: "slider-radio"}
        });

        rootForRadioEl.append(radioEl);
    }

    for (let i = 0; i < arrLength; i++) {

        let labelEl = createEl({
            type: 'label',
            content: '',
            attributes: {for: `slider-r${i}`, class: "navigation-bottom-item"}
        });
        labelEl.dataset.navigationBottom = '';
        labelEl.dataset.navBottomId = i.toString();


        rootForNavigationEl.append(labelEl);
    }

}

createSliderBottomNavigation(contentItemsArr.length, sliderContentEl, bottomNavigationContainer)

function createSliderElements(contentArr) {

    sliderContentEl.style.width = contentArr.length * 100 + '%';

    let sliderFragments = document.createDocumentFragment();
    let slideIndex = 0;

    for (const contentElement in contentArr) {

        const slideEl = createEl({type: 'div', content: '', attributes: {class: 'slide'}});

        slideEl.dataset.slide = '';
        slideEl.dataset.slideId = slideIndex.toString();

        const imgEl = createEl({
            type: 'img',
            content: '',
            attributes: {class: "slide-img", src: contentArr[contentElement].image}
        });
        const contentDivEl = createEl({
            type: 'div',
            content: '',
            attributes: {class: "slide-content"}
        });
        const contentTitleEl = createEl({
            type: 'h2',
            content: contentArr[contentElement].title,
            attributes: {class: "slide-content-title"}
        });
        const contentTextEl = createEl({
            type: 'p',
            content: contentArr[contentElement].text,
            attributes: {class: "slide-content-text"}
        });


        contentDivEl.append(contentTitleEl);
        contentDivEl.append(contentTextEl);

        slideEl.append(imgEl);
        slideEl.append(contentDivEl);

        sliderFragments.append(slideEl);

        slideIndex++;
    }

    sliderContentEl.append(sliderFragments);
}

createSliderElements(contentItemsArr);

function navigationShow() {
    const navigationLeft = document.querySelector('[data-sides-navigation-left]');
    const navigationRight = document.querySelector('[data-sides-navigation-right]');

    if (currentSlideId === 0) {
        navigationLeft.style.visibility = 'hidden';
    } else navigationLeft.style.visibility = 'visible';

    if (currentSlideId === contentItemsArr.length - 1) {
        navigationRight.style.visibility = 'hidden';
    } else navigationRight.style.visibility = 'visible';
}

navigationShow();

function moveElementByX(elementToMove) {

    const currentSlide = document.querySelectorAll('.slide')[currentSlideId];
    const slideWidth = currentSlide.getBoundingClientRect().width;

    const pixelsToMoveByX = "-" + (slideWidth * currentSlideId);

    elementToMove.style.transform = `translateX(${pixelsToMoveByX}px)`;

}

sidesNavigationContainer.addEventListener('click', (e) => {

    if (e.target === sidesNavigationContainer.children[0] && currentSlideId > 0) {
        currentSlideId--;
    }

    if (e.target === sidesNavigationContainer.children[1] && currentSlideId < contentItemsArr.length - 1) {
        currentSlideId++;
    }

    navigationShow();
    moveElementByX(sliderContentEl);

});

bottomNavigationContainer.addEventListener('click', (e) => {

    if (e.target.tagName === 'LABEL') {

        currentSlideId = +e.target.dataset.navBottomId;

        moveElementByX(sliderContentEl);
        navigationShow();
    }

});