import State from '../statemachine/state.js';
import Tilemap from '../tilemap/tilemap.js';
import Camera from './camera.js';

export default class World extends State {

  #meta;
  #tilemap;
  #entities;
  #camera;

  constructor(config) {
    super(null, 'world');
    this.#meta = config.meta;
    this.#tilemap = new Tilemap(config.tilemap)
    this.#camera = new Camera(config.meta.w, config.meta.h);
    this.#entities = [];
  }

  get camera( ) {return this.#camera;}

  renderList( ) {
    return {
      entities: this.#entities.slice( ),
      tilemap: this.#tilemap,
      e_index: this.#meta.e_index
    }
  }

}
