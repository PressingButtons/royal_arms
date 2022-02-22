import Sprite from './sprite.js';

let utils;

//exports
export function init(_utils) {
  utils = _utils;
}

export async function load(url, w, h, bufferMod = 1) {
  if(!utils) throw 'SpriteLib.createBuffer - library not initialized with webutils!';
  let texture = await utils.createTexture(url);
  w = w ? w : texture.width;
  h = h ? h : texture.height;
  let buffer = createBuffer(w * bufferMod, h * bufferMod);
  return new Sprite(texture, buffer, w, h);
}

//methods
function createBuffer(w, h) {
  return utils.createBuffer(new Float32Array([0, 0, 0, 0, w, 0, 1, 0, 0, h, 0, 1, 0, h, 0, 1, w, h, 1, 1, w, 0, 1, 0]));
}
