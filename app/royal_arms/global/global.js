import Vector from './modules/vector.js';
import * as directoryLib from './modules/directory.js';
import * as eventLib from './modules/event.js';
import * as fetchLib from './modules/fetch.js';
import * as loadLib from './modules/load.js';
import * as generateLib from './modules/generate.js';

const Utils = Object.defineProperties({ }, {
  directory: {value: directoryLib},
  events: {value: eventLib},
  fetch: {value: fetchLib},
  load: {value: loadLib},
  generate: {value: generateLib},
  IDENTITY_MATRIX: {value: glMatrix.mat4.create( )}
})

Object.defineProperties(window, {
  Utils: {value: Utils},
  Vector: {value: Vector},
});
