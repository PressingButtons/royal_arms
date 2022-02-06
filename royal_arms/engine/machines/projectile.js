import GameObject from '../objects/gameobject.js';
import ProjectileBehaviorState from '../statemachine/states/state.projectile.behavior.js';

export default class Projectile extends GameObject {

  #behavior;

  constructor(config) {
    super(config.w, config.h, config.body);
    this.#behavior = new ProjectileBehaviorState(this, config.gravity);
    this.velocity.radToComponent(config.radians);
    this.velocity.multiply(config.speed);
  }

  update(config) {
    this.#behavior.update(config);
  }

}
