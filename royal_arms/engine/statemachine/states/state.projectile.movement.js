import State from '../state.js';

export default class ProjectileMovementState extends State {

  constructor(machine) {
    super('projectile_movement', machine);
  }

  onUpdate(config) {
    if(this.machine.gravityFlag) {
      const dt = config.dt * 0.001;
      this.machine.velocity.y += config.gravity * dt;
    }
  }

}
