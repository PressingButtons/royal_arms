export default class Tilemap {

  #src
  #ortho
  #transform

  constructor(sprite, tilesize = 16) {
    this.#src = sprite;
    this.#ortho = glMatrix.mat4.ortho(glMatrix.mat4.create(), 0, sprite.totalSize[0], sprite.totalSize[1], 1, -1);
    this.#transform = glMatrix.mat4.fromScaling(glMatrix.mat4.create(), [sprite.totalSize[0] * tilesize, sprite.totalSize[1] * tilesize, 1]);
  }

  get transform () {return this.#transform};
  get ortho() {return this.#ortho};
  get texture() {return this.#src.texture};
  get buffer() {return this.#src.buffer};
  get sf() {return this.#src.sf};

}
