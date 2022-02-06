import * as Spawner from './spawner.js';

export default class World {

  #list = [];

  constructor( ) {

  }

  get objects( ) {return this.#list.slice( )}

  spawn(type, x, y, options) {
    const object = Spawner.create(type, x, y, options);
    if(object) {
      this.#list.push(object);
      object.world = this;
      return object;
    }
    return null;
  }

}
