import { createElement } from '../packages/react-clone';
import { render } from '../packages/react-dom-clone';

const heading = createElement('h1', {}, 'Hello World');
const main = createElement('main', {}, heading);

render(main, document.getElementById('app'));
