export function render(reactElement, domElement) {
    // domElement.appendChild(reactElement);
    // console.log('called');
    domElement.appendChild(mountHost(reactElement));
}

export function createElement(type, props, children) {
    return {
        type,
        props: {
            ...props,
            children,
        },
    };
}

// handles elements with a host type
function mountHost(reactElement) {
    const type = reactElement.type;
    const props = reactElement.props;
    var children = props.children ? [props.children] : [];

    var node = document.createElement(type);
    console.log(node);
    Object.keys(props).forEach(
        propName =>
            propName !== 'children' &&
            node.setAttribute(propName, props[propName])
    );

    children.forEach(childElement => node.appendChild(childElement));
    return node;
}
