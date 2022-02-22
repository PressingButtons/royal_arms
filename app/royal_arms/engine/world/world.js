import State from '../statemachine/state.js';
import Tilemap from '../tilemap/tilemap.js';
import Camera from './camera.js';
import TilePhysics from '../physics/tilephysics.js';

export default class World extends State {

  #meta;
  #tilemap;
  #entities;
  #camera;
  #physics;

  constructor(config) {
    super(null, 'world');
    this.#meta = config.meta;
    this.#tilemap = new Tilemap(config);
    this.#physics = new TilePhysics(this.#tilemap.collision_map, 16);
    this.#camera = new Camera(config.meta.w, config.meta.h);
    this.#entities = [];
  }

  get camera( ) {return this.#camera};
  get size( ) {return this.#meta.size};

  renderList( ) {
    return {
      entities: this.#entities.slice( ),
      tilemap: this.#tilemap,
      e_index: this.#meta.e_index
    }
  }

  addObject(object) {
    this.#entities.push(object);
  }

  update(config) {
    for(const entity of this.#entities) {
      entity.update(config);
      this.#physics.update(entity, config.dt)
    }
  }

}
