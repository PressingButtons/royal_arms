export default class Sprite {

  #textureData;
  #inverse;
  #buffer;
  #size;
  #w;
  #h;

  constructor(texture, buffer, inverse, config) {
    this.#textureData = texture;
    this.#buffer = buffer;
    this.#inverse = inverse;
    this.#w = config.w ? config.w : texture.width;
    this.#h = config.h ? config.h : texture.height;
  }

  get width( ) {return this.#w};
  get height( ) {return this.#h};

  get textureData( ) {
    return this.#textureData;
  }

  get inverse( ) {
    return this.#inverse;
  }

  get buffer( ) {
    return this.#buffer;
  }

  get size( ) {
    return this.#size;
  }

}
