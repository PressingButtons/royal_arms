import Projectile from '../engine/machines/projectile.js';

export default class SlugBullet extends Projectile {
  constructor(config) {
    config = Object.assign({speed: 12, gravity: false, w:16, h: 16}, config);
    super(config);
  }

}
