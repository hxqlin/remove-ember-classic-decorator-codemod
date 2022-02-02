'use strict';

const { runTransformTest } = require('codemod-cli');

runTransformTest({ 
  name: 'remove-ember-classic-decorator',
  path: require.resolve('./index.js'),
  fixtureDir: `${__dirname}/__testfixtures__/`,
});