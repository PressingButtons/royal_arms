import State from "../../statemachine/state.js";

const GRAVITY = 1;

export default class AirState extends State {

  constructor(machine) {
    super('warror.air', machine);
  }

  onUpdate(config) {
    if(config.dt) {
      this.machine.velocity.y += (config.dt * GRAVITY) * 0.001;
    }
  }

}
