import Sprite from './sprite.js';

export function load(type, config) {
  return Utils.load.image(`./graphics/${type}.webp`)
  .then(img => Webutils.createTexture(img))
  .then(texture => createSprite(texture, config));
}

function createQuad(w, h) {
  const data = new Float32Array([0, 0, 0, 0, w, 0, 1, 0, 0, h, 0, 1, 0, h, 0, 1, w, h, 1, 1, w, 0, 1, 0]);
  return Webutils.createBuffer(data);
}

function createSprite(texture, config) {
  const buffer = makeBuffer(texture, config);
  const inverted = invertDimensions(texture, config);
  return new Sprite(texture, buffer, inverted, config);
}

function invertDimensions(texture, config) {
  if(config instanceof Array)
    return new Float32Array([config[0]/texture.width, config[1]/texture.height]);
  else
    return new Float32Array([1/texture.width, 1/texture.height]);
}

function makeBuffer(texture, config) {
  if(config instanceof Array)
    return createQuad(config[0], config[1]);
  if(config == 'tilemap')
    return createQuad(texture.width * System.TILESIZE, texture.height * System.TILESIZE);
  return createQuad(texture.width, texture.height);
}
