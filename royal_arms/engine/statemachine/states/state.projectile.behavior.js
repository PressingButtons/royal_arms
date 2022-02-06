import State from '../state.js';
import ProjectileMovementState from './state.projectile.movement.js';

export default class ProjectileBehaviorState extends State {

  #move
  #hit
  #dead
  #gravityFlag;

  constructor(machine, applyGravity = true) {
    super('projectile_behavior', machine);
    this.#gravityFlag = applyGravity;
    this.#move = new ProjectileMovementState(machine);
    this.addState(this.#move);
    this.switchState(this.#move.name);
  }

  get gravityFlag( ) {return this.#gravityFlag}

  update(config) {
    this.currentState(false).update(config);
  }

}
