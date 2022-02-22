export default class Updater extends System.State {


  constructor( ) {
    super('updater', null);
    this.addState(new Run(this));
    this.addState(new Stop(this));
  }

  get world( ) {return this.#world};

  run(func) {
    if(func) this.onUpdate = func;
    this.switchState('run');
  }

  stop( ) {
    this.switchState('stop');
  }

}


class Run extends System.State {

  #lastStep;

  constructor(state) {
    super('run', state);
  }

  #nextStep(timestamp) {
    if(!this.#lastStep) this.#lastStep = timestamp;
    const dt = timestamp - this.#lastStep;
    this.#lastStep = timestamp;
    this.machine.update(dt);
  }

  enterState( ) {
    this.#lastStep = null;
    this.machine.updateId = requestAnimationFrame(this.#nextStep.bind(this));
  }

  onUpdate(timestamp) {
    this.machine.updateId = requestAnimationFrame(this.#nextStep.bind(this));;
  }

}

class Stop extends System.State {

  constructor(state) {
    super('stop', state);
  }

  enterState( ) {
    cancelAnimationFrame(this.machine.updateId);
  }

}
