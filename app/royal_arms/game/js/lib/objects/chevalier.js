import GameObject from './gameobject.js';

class Chevalier extends GameObject {
  constructor(sprite, config) {
    super( );
    this.#sprite = sprite;
    this.#config = config;
    this.position = {x: 0, y: 0}
  }
}
