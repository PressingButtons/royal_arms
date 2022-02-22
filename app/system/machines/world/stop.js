import State from '../state.js'

export default class Stop extends State {

  constructor(state) {
    super('stop', state);
  }

  enterState( ) {
    cancelAnimationFrame(this.machine.updateId);
  }

}
