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

class Weather {
    constructor(jsonData) {
        this.city = jsonData.name;
        this.country = jsonData.sys.country;
        this.temp = jsonData.main.temp + '°C';
        this.feels = jsonData.main.feels_like + '°C';
        this.pressure = jsonData.main.pressure + ' hPa';
        this.humidity = jsonData.main.humidity + '%';
        this.wind = jsonData.wind.speed + ' m/s';
        this.weather = jsonData.weather[0].description;
    }
}

class OpenWeatherWidget {

    #baseUrl = 'https://api.openweathermap.org';
    #path = '/data/2.5/weather';

    constructor(appid) {
        this.appid = appid;
    }

    async render(location) {
        const data = await this.#getData(location);
        const weather = new Weather(data);

        if (document.querySelector('[data-widget-container]'))
            document.querySelector('[data-widget-container]').remove();

        const widgetContainer = document.querySelector('[data-weather-widget-container]');
        const widgetDataContainer = createEl({type: 'div', content: '', attributes: {class: 'widget-container'}});
        widgetDataContainer.dataset.widgetContainer = "";

        let widgetFragment = document.createDocumentFragment();

        for (const key in weather) {
            const containerEl = createEl({type: 'div', content: '', attributes: {class: `widget-${key}`}});
            const h2 = createEl({type: 'h2', content: this.#ucFirst(key) + ': ' + weather[key]});
            containerEl.append(h2);
            widgetFragment.append(containerEl);
        }

        widgetDataContainer.append(widgetFragment);
        widgetContainer.append(widgetDataContainer);
    }

    #ucFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    async #getData(location) {
        const url = new URL(this.#path, this.#baseUrl);

        url.searchParams.append('q', location);
        url.searchParams.append('appid', this.appid);
        url.searchParams.append('units', 'metric');

        const resp = await fetch(url.toString());

        if (!resp.ok) throw new Error("ups something went wrong");

        return await resp.json();
    }

}

const locationsArray = [
    {town: 'Odessa', countryId: 'ua'},
    {town: 'London', countryId: 'gb'},
    {town: 'Toronto', countryId: 'ca'},
    {town: 'Paris', countryId: 'fr'},
    {town: 'Rome', countryId: 'it'}
];
const apiKey = 'e8e7015c1db68e747b4516eb54b3ea9a';
const openWeather = new OpenWeatherWidget(apiKey);

(function (valuesArr) {
    const parentEl = document.querySelector('[data-select-location]');

    for (const value in valuesArr) {
        const option = createEl({
            type: 'option',
            content: valuesArr[value].town,
            attributes: {value: valuesArr[value].town + ',' + valuesArr[value].countryId}
        });

        parentEl.append(option);
    }

    openWeather.render(parentEl[parentEl.selectedIndex].value);

})(locationsArray);

const refreshButton = document.querySelector('[data-btn-refresh]');

refreshButton.addEventListener('click', (e) => {
    renderWidget();
});

function renderWidget() {
    const selectHtmlEl = document.querySelector('[data-select-location]');
    const selectedValue = selectHtmlEl[selectHtmlEl.selectedIndex].value;

    openWeather.render(selectedValue);
}

setInterval(renderWidget, 60000);