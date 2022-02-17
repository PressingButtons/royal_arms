import Dummy from './dummy/dummy.js';

export default class Spawner {

  constructor( ) {
    this.#engine = engine;
  }

  spawn(type) {
    let object = null;
    switch(type.toLowerCase()) {
      case 'dummy': object = new Dummy(engine.cache.sprites.dummy); break;
    }
    return object;
  }

}
