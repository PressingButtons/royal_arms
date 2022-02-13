import * as Spawner from './spawner.js';

export default class World {

  #list = [];
  #physics;

  constructor(config) {
    this.#physics = new TilemapPhysics(config.map, config.tilesize);
  }

  //getters and setters
  get objects( ) {return this.#list.slice( )}
  get width( ) {return this.#physics.width}
  get height( ) {return this.#physics.height}
  //private
  //public

  spawn(type, x, y, options) {
    const object = Spawner.create(type, x, y, options);
    if(object) {
      this.#list.push(object);
      object.world = this;
      return object;
    }
    return null;
  }

  update(config) {
    for(const object of this.#list) {

    }
  }

}
