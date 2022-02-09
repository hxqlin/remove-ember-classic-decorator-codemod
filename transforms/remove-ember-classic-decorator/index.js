const { getParser } = require('codemod-cli').jscodeshift;

module.exports = function transformer(file, api) {
  const j = getParser(api);
  const input = j(file.source);

  // Remove the ember-classic-decorator import
  input
    .find(j.ImportDeclaration, {
      source: {
        value: 'ember-classic-decorator',
      },
    })
    .forEach((importDeclaration) => {
      j(importDeclaration).remove();
    });

  // Remove the @classic decorator
  input.find(j.ClassDeclaration).forEach((path) => {
    if (path.value.decorators) {
      // Check if the @classic decorator exists
      const classicDecoratorIdx = path.value.decorators.findIndex(
        (decorator) => decorator.expression.name === 'classic'
      );
      const hasClassicDecorator = classicDecoratorIdx > -1;

      if (hasClassicDecorator) {
        path.value.decorators.splice(classicDecoratorIdx, 1);
      }
    }
  });

  return input.toSource();
};

module.exports.type = 'js';
