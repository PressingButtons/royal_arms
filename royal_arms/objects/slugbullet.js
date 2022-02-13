import Projectile from '../engine/machines/projectile.js';

export default class SlugBullet extends Projectile {
  constructor(config) {
    super(Object.assign({speed: 12, w:16, h: 16, gravity: false}, config));
  }
}
