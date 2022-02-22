import State from '../../../../engine/statemachine/state.js';

class Stamp extends State {

  #up
  #down

  constructor(listener) {
    super('stamp', null);
    this.#up = this.addState(new UpState(this));
    this.#down = this.addState(new DownState(this));
    this.switchState(this.#up.name);
    this.#bind(listener);
  }

  #bind(listener) {
    listener.addEventListener('mousedown', ev => this.switchState(this.#down.name));
    listener.addEventListener('mouseup',   ev => this.switchState(this.#up.name));
  }
}


class UpState extends State {
  constructor(machine) {
    super('stampup', machine);
  }
}

class DownState extends State {

  constructor(machine) {
    super('stampdown', machine)
  }

  onUpdate(config) {
    document.dispatchEvent(new CustomEvent('stamp', {detail: config }));
  }

}

export default Stamp;
