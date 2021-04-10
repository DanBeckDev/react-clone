export function render(reactElement, domElement) {
  // domElement.appendChild(reactElement);
  // console.log('called');
  domElement.appendChild(mount(reactElement));
}

export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}

function mount(element) {
  const { type } = element;
  return typeof type === 'function' ? null : mountHost(element);
}

// handles elements with a host type
function mountHost(reactElement) {
  const type = reactElement.type;
  const props = reactElement.props;
  const children = props.children;
  const node = document.createElement(type);

  Object.keys(props).forEach((propName) => {
    propName !== 'children' && node.setAttribute(propName, props[propName]);
  });

  children.forEach((childElement) => {
    const childType = typeof childElement;

    if (childType === 'string' || childType === 'number') {
      node.appendChild(document.createTextNode(childElement));
    } else {
      const childNode = mount(childElement);
      node.appendChild(childNode);
    }
  });
  return node;
}

function createInitialDOMChildren(children) {
  // TODO: extract logic out into function
}
