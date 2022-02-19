import Warrior from '../../objects/warrior/warrior.js';

export default class Dummy extends Warrior {

  constructor(sprite) {
    super({w: 16, h: 48, sprite: sprite);
  }

}
