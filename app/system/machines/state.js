export default class State extends EventTarget {

  #currentState;
  #machine;
  #states = { };
  #name;

  constructor(name, machine = null) {
    super( );
    this.#name = name;
    this.#machine = machine ? machine : this;
  }
  get machine( ) {return this.#machine}
  get name( ) {return this.#name};
  get switchState( ) {return this.#switchState};
  get states( ) {return this.#states};
  get update( ) {return this.#update};
  get addLink( ) {return this.#addLink};
  get addState( ) {return this.#addState};

  #addState(state) {
    Object.defineProperty(this.#states, state.name, {value: state});
    return state;
  }

  #addLink(state, target, eventType) {
    if(!this.#states[state.name] || !this.#states[target.name]) {
      console.error('State.addLink encountered error');
      console.trace( );
      console.error(state, target, eventType);
      throw 'State.addLink - invalid link operation';
    }
    let self = this;
    //this.#states[state.name].addEventListener(eventType, event => {
    this.#machine.addEventListener(eventType, event => {
      self.switchState(target, event.detail);
    })
  }

  #switchState(state, options) {
    if(this.#states[state.name] != state) {
      console.error('State.switchState', state);
      console.trace( );
      throw 'State.switchState - state is not set within machine';
    }
    if(this.#currentState)
      this.#currentState.exitState(options);
    this.#currentState = state;
    this.#currentState.enterState(options);
  }

  #update(config) {
    this.onUpdate(config);
    if(this.#currentState)
      this.#currentState.update(config);
  }

  //public
  currentState(deep = true) {
    if(!this.#currentState) return this;
    else {
      if(deep) return this.#currentState.currentState( );
      else return this.#currentState;
    }
  }

  signal(type, detail = null) {
    this.dispatchEvent(new CustomEvent(type, {detail: detail}))
  }

  //required
  enterState(config) {};
  exitState(config) {};
  onUpdate() {};

}
