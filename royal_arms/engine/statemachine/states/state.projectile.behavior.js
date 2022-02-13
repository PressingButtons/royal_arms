import State from '../state.js';
import ProjectileMovementState from './state.projectile.movement.js';

export default class ProjectileBehaviorState extends State {

  #move
  #hit
  #dead

  constructor(machine) {
    super('projectile_behavior', machine);
    this.#move = new ProjectileMovementState(machine);
    this.addState(this.#move);
    this.switchState(this.#move.name);
  }

  onUpdate(config) {
    this.currentState(false).update(config);
  }

}
