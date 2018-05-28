/* Transpile es6 code */
require('babel-register')({"presets": ["env", "stage-2","react"]})
require('babel-core/register')
require('babel-polyfill') // For async/await
require('./importScreenplays') // For async/await
