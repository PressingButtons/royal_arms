import * as fetchlib from './fetch.js';
import * as loadlib from './load.js'
import AutoId from './autoid.js';

Object.defineProperty(window, 'Utils', {
  value: {
    fetch: fetchlib,
    AutoId: AutoId,
    load: loadlib
  }
})
