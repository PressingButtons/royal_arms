class Machine {

  #currentState;
  #states = {};

  constructor(...states) {
    for(const stateConstructor of states) {
      const state = new stateConstructor(this);
      this.#states[state.name] = state;
    }
  }

  get states( ) {return this.#states}

  update(config) {
    this.#currentState.update(config);
  }

  switchState(state) {
    //if(this.#currentState) this.#currentState.existState( );
    if(!this.#states[state.name]) throw 'Error cannot switch to invalid state ' + state.name;
    this.#currentState = state;
    this.#currentState.enterState( );
  }

}

export default Machine;
