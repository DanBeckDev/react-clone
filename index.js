import { render, createElement } from './react-clone.js';

const heading = createElement('h1', {}, 'Hello World');

render(heading, document.getElementById('app'));
