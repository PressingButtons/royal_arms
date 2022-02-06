import State from '../state.js';
import PersonLandState from './state.person.land.js';
import PersonAerialState from './state.person.air.js';

export default class PersonMovementState extends State {

  #land;
  #air;

  constructor(machine) {
    super('person_movement', machine);
    this.#land = new PersonLandState(machine);
    this.#air  = new PersonAirState(machine);
    this.addState(this.#land);
    this.addState(this.#air);
    this.switchState(this.#land.name);
  }

  onUpdate(config) {
    const currentState = this.currentState(false);
    if(Math.abs(this.machine.velocity.y) > 0.5) {
      if(currentState == this.#land) this.switchState(this.#air.name);
    } else {
      if(currentState == this.#air) this.switchState(this.#land.name);
    }
    State.update.call(this);
  }

}
