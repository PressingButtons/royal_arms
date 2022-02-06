import State from '../statemachine/state.js';

class GunNuetral extends State {
  constructor(machine) {
    call('nuetral', machine);
  }

  enterState(config) {

  }

  update(config) {

  }

  exitState(config) {

  }

  shoot( ) {
    machine.switchState('fire');
  }

}
