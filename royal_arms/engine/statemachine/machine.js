export default class Machine {

  #states = { };
  #currentState;

  constructor(...states) {
    states = [].concat.apply([], states);
    states.forEach(this.#defineState.bind(this));
  }

  get currentState ( ) {return this.#currentState};
  get states( ) {
    let names = [];
    for(let n in states) names.push(n);
    return names;
  }

  #defineState(config, i, option) {
    const state = new config.stateConstructor(this, config.options);
    Object.defineProperty(this.#states, state.name, {value: state});
    if(i == 0) this.switchState(state.name);
  }

  addState(state) {
    Object.defineProperty(this.#states, state.name, {value: state});
  }

  switchState(name, options) {
    const state = this.#states[name];
    if(!state) {
      console.error('Invalid state', name);
      throw 'Invalid state';
    }
    const onExit = options ? options.onExit : null;
    if(this.#currentState) this.currentState.exitState(onExit);
    this.#currentState = state;
    const onEnter = options ? options.onEnter : null;
    state.enterState(onEnter);
  }

  update(config) {
    this.#currentState.update(config);
  }

  die( ) {
    document.dispatchEvent(new CustomEvent('killmachine', {detail: this}));
  }

}
