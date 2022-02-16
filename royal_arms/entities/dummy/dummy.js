import GameObject from '../../engine/objects/gameobject.js';

export default class Dummy extends GameObject {

  constructor(sprite) {
    super(16, 48);
    this.#sprite = sprite;
  }

}
