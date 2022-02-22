import State from '../state.js';
import LandState from './land.js';
import AerialState from './aerial.js';

export default class PMovment extends State {

  constructor(machine) {
    super('pmovement', machine);
    this.addState(new LandState(machine));
    this.addState(new AerialState(machine));
    this.addLink(this.states.land, this.states.aerial, 'inair');
    this.addLink(this.states.aerial, this.states.land, 'onland');
    this.switchState(this.states.aerial);
  }

  #moveX(config) {
    this.machine.x += this.machine.velocity.x;
    //handle x tile collision
  }

  #moveY(config) {
    this.machine.y += this.machine.velocity.y;
    //handle y tile collision
  }

  #update(config) {
    this.#moveX(config);
    this.#moveY(config);
  }

  get update( ) {
    return this.#update;
  }

}
