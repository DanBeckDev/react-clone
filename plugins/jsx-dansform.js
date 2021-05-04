module.exports = function (babel) {
  const { types: t } = babel;

  function valueToLiteral(value) {
    switch (typeof value) {
      case 'boolean':
        return t.BooleanLiteral(value);
      case 'string':
        return t.StringLiteral(value);
      default:
        return t.NumericLiteral(value);
    }
  }

  function createBlockStatement(values) {
    const objectProperties = values.map((value) =>
      t.objectProperty(t.identifier(value[0]), valueToLiteral(value[1]))
    );
    return t.ObjectExpression(objectProperties);
  }

  function createNestedBlockStatement(property, values) {
    const objectProperties = values.map((value) =>
      t.objectProperty(t.identifier(value[0]), valueToLiteral(value[1]))
    );

    const nestedProperties = t.objectProperty(
      t.identifier(property),
      t.ObjectExpression(objectProperties)
    );

    return t.ObjectExpression([nestedProperties]);
  }

  function expressionToPair(prop) {
    let key;
    let value;
    let listOfPairs = [];

    if (prop.value === null) {
      // no value set
      key = prop.name.name;
      value = true;
    } else if (prop.value.type === 'StringLiteral') {
      // prop has value of string
      key = prop.name.name;
      value = prop.value.value;
    } else if (prop.value.expression.properties) {
      //nested props
      listOfPairs = prop.value.expression.properties.map((property) => [
        property.key.value || property.key.name,
        property.value.value,
      ]);
      return createNestedBlockStatement(prop.name.name, listOfPairs);
    } else {
      //inline props
      key = prop.name.name;
      value = prop.value.expression.value;
    }

    return createBlockStatement([[key, value]]);
  }

  return {
    name: 'jsx-dansform',
    visitor: {
      JSXElement(path) {
        const openingElement = path.node.openingElement;
        const tagName = openingElement.name.name;
        const props = openingElement.attributes;
        const children = path.node.children;

        const functionExpression = t.memberExpression(
          t.Identifier('React'),
          t.Identifier('createComponent')
        );

        const sanitisedProps = props.length
          ? [...props.map((a) => expressionToPair(a))]
          : [t.nullLiteral()];
        const sanitisedChildren = children.map((child) =>
          child.type !== 'JSXElement' ? t.stringLiteral(child.value) : child
        );

        var callExpression = t.callExpression(functionExpression, [
          t.stringLiteral(tagName),
          ...sanitisedProps,
        ]);
        callExpression.arguments = callExpression.arguments.concat(
          sanitisedChildren
        );

        path.replaceWith(callExpression, path.node);
      },
    },
  };
};
