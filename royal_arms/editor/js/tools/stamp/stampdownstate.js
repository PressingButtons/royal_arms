import MachineState from '../../machines/state.js';

class StampDown extends MachineState {

  constructor(machine) {
    super('stampdown', machine);
  }

  exitState( ) {
  }

  enterState( ) {

  }

  update(config) {
    document.dispatchEvent(new CustomEvent('stamp', {detail: config.pos }));
  }

}

export default StampDown;
