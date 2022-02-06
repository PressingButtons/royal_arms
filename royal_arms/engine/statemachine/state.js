export default class State {

  #machine
  #name;
  #currentState;
  #previousState;
  #states = { };

  constructor(name, machine) {
    this.#machine = machine;
    this.#name = name;
  }

  get name( ) {return this.#name};
  get machine( ) {return this.#machine};

  currentState(deep = true) {
    if(!this.#currentState) return this;
    else {
      if(deep) return this.#currentState.currentState;
      else return this.#currentState;
    }
  }

  addState(state) {
    Object.defineProperty(this.#states, state.name, {value: state});
  }

  enterState(config) {

  }

  exitState(config) {

  }

  getState(name) {
    return this.#states[name];
  }

  switchState(name, options) {
    const state = this.#states[name];
    if(!state) {
      console.error('Invalid substate', name);
      throw 'Error, invalid substate: ' + name
    }
    if(this.#currentState)
      this.#currentState.exitState(options);
    this.#currentState = state;
    this.#currentState.enterState(options);
  }

  update(config) {
    this.onUpdate(config);
    this.#currentState.update(config);
  }

}
