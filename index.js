import { render, createElement } from './react-clone.js';

const heading = createElement('h1', {}, 'Hello World2');
const main = createElement('main', {}, heading);

render(main, document.getElementById('app'));
