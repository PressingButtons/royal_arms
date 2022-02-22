import RigidBody from './rigidbody.js';
import PMovement from '../machines/pmovement/machine.js';

export default class Person extends RigidBody {

  #health;
  #stats;
  #pmovement;

  constructor(config) {
    super(config);
    this.#health = config.health;
    this.#stats = config.stats;
    this.#pmovement = new PMovement(this);
    this.#pmovement.signal('inair');
  }

}
