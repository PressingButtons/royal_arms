import State from '../state.js'

export default class Run extends State {

  #lastStep;

  constructor(world) {
    super('run', world);
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
    this.machine.updateId = requestAnimationFrame(this.#nextStep.bind(this));
  }

}
