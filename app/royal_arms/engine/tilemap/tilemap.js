import TileLayer from './tilelayer.js';
import TileCollisionMap from './tilecollisionmap.js';

export default class Tilemap {

  #layers;
  #collision;

  constructor(config) {
    this.#layers = config.layers.map(x => new TileLayer(x));
    this.#collision = new TileCollisionMap(config.collision)
  }

  get layers( ) {return this.#layers}
  get collision_map( ) {return this.#collision}

}
