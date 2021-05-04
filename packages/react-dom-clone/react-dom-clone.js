function updateDOMProperties(props, node) {
  Object.keys(props).forEach((propName) => {
    if (propName === 'style') {
      const property = props[propName];
      Object.keys(property).forEach((value) => {
        console.log(value, property[value]);
        node[`${value}`] = property[value];
        // console.log(value, property[value]);
      });
    } else {
      propName !== 'children' && node.setAttribute(propName, props[propName]);
    }
  });
}

function createInitialDOMChildren(children, node) {
  children.forEach((childElement) => {
    const childType = typeof childElement;

    if (childType === 'string' || childType === 'number') {
      node.appendChild(document.createTextNode(childElement));
    } else {
      const childNode = mount(childElement);
      node.appendChild(childNode);
    }
  });
}

function mount(element) {
  const { type } = element;
  return typeof type === 'function' ? null : mountHost(element);
}

// handles elements with a host type
function mountHost({ type, props }) {
  const children = props.children;
  const node = document.createElement(type);

  updateDOMProperties(props, node);
  createInitialDOMChildren(children, node);
  return node;
}

export function render(reactElement, domElement) {
  domElement.appendChild(mount(reactElement));
}
