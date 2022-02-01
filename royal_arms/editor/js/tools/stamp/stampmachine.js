import Machine from '../../machines/machine.js';
import StampUp from './stampupstate.js';
import StampDown from './stampdownstate.js';

class StampMachine extends Machine {
  constructor(listener) {
    super(StampUp, StampDown);
    this.switchState(this.states.stampup);
    this.#bind(listener);
  }

  #bind(listener) {
    listener.addEventListener('mousedown', ev => this.switchState(this.states.stampdown));
    listener.addEventListener('mouseup',   ev => this.switchState(this.states.stampup));
  }
}

export default StampMachine;
