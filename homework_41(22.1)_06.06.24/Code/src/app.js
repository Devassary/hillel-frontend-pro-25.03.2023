import { sum } from './scripts/utils.js';

import './styles/css/main.css';
import './styles/scss/main.scss';

import imgUniverse from './images/1.jpg';

const img = document.createElement('img');
img.src = imgUniverse

document.body.insertAdjacentElement('beforeend', img);

console.log(sum(1, 2));