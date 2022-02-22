import GameObject from '../gameobject/gameobject.js';
import LandState from './land.js';
import AerialState from './air.js';

const GRAVITY = 1;

export default class Warrior extends GameObject {

  #landState;
  #airState;

  constructor(config) {
    super(config);
    this.#landState = this.addState(new LandState(this))
    this.#airState = this.addState(new AerialState(this));
    this.switchState(this.#airState.name);
  }

}
