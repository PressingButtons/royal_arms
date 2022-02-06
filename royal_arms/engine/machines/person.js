import GameObject from '../../objects/gameobject.js';
import PersonMovementState from '../statemachine/states/states.person.movement.js';

class Person extends GameObject {

  #movement
  #action

  constructor(config) {
    super(config.x, config.y, config.body);
    this.#movement = new PersonMovmentMachine(this);
  }

  update(config) {
    this.#movement.update(config);
  }

}
