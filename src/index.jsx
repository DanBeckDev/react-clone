import React, { createElement } from '../packages/react-clone/';
import { render } from '../packages/react-dom-clone/';

const heading = createElement('h1', {}, 'Hello World');
const main = createElement('main', { style: 'color: red' }, heading);

function App() {
  return <h2 style={{ color: 'yellow', textTransform: 'uppercase' }}>Test</h2>;
}

render(<App />, document.getElementById('app'));
