class MachineState {

  #machine
  #name

  constructor(name, machine) {
    this.#name = name;
    this.#machine = machine;
  }

  get name( ) {return this.#name};
  get machine( ) {return this.#machine};

  enterState( ){

  }

  exitState( ){

  }

  update( ) {

  }

}

export default MachineState;
