export default class Sprite {

  #inverted;
  #textureData;
  #buffer;
  #size;

  constructor(texture, buffer, w, h) {
    this.#inverted = new Float32Array([1/w, 1/h]);
    this.#size = new Int16Array([w, h]);
    this.#textureData = texture;
    this.#buffer = buffer;
  }

  get textureData( ) {return this.#textureData };
  get inverted( ) {return this.#inverted };
  get buffer( ) {return this.#buffer};

}
