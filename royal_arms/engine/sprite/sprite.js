export default class SpriteLib {

  #utils;

  constructor(utils) {
    this.#utils = utils;
  }

  #createQuad(w, h) {
    const data = new Float32Array([
      0, 0, 0, 0,
      w, 0, 1, 0,
      0, h, 0, 1,
      0, h, 0, 1,
      w, h, 1, 1,
      w, 0, 1, 0
    ]);
    return this.#utils.createBuffer(data);
  }

  #generateTexture(image) {
    if(image.texture && image.texture instanceof WebGLTexture) return Promise.resolve(image);
    return this.#utils.createTexture(image);
  }

  #packLayer(texture, tilesize) {
    return Object.defineProperties({ }, {
      buffer: {value: this.#createQuad(texture.width * tilesize, texture.height * tilesize)},
      texture: {value: texture.texture},
      sf: {value: new Float32Array([1/texture.width, 1/texture.height])},
      size: {value: new Float32Array([texture.width * tilesize, texture.height * tilesize])},
      srcSize: {value: new Float32Array([texture.width, texture.height])}
    });
  }

  #packSprite(texture, w, h) {
    return Object.defineProperties({}, {
      buffer: {value: this.#createQuad(w, h)},
      texture: {value: texture.texture},
      sf: {value: new Float32Array([w/texture.width, h/texture.height])},
      totalSize: {value: new Float32Array([texture.width, texture.height])},
      size: {value: new Float32Array([w, h])}
    })
  }

  create(image, w, h) {
    w = w ? w : image.width;
    h = h ? h : image.height;
    return this.#generateTexture(image).then(texture => this.#packSprite(texture, w, h));
  }

  createLayer(image, tilesize) {
    return this.#generateTexture(image).then(texture => this.#packLayer(texture, tilesize));
  }

}
