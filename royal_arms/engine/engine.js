import RenderEngine from './render/render.js';
import SpriteLib from './sprite/sprite.js';
import Cache from './cache/cache.js';
import createWorld from './world/creator.js';
import CollisionMap from './modules/collisionmap.js'
import * as Loader from './modules/loader.js'
import UserControls from './usercontrols/usercontrols.js';
import Utils from '../webgl-lib/webgl-lib.js';

const TILESIZE = 16;

export default class Engine {

  #utils;
  #sprite_lib;
  #render_engine;
  #tileset;
  #uc;
  #cache;
  #spawner;

  constructor(gl) {
    this.#utils = new Utils(gl);
    this.#sprite_lib = new SpriteLib(this.#utils);
    this.#render_engine = new RenderEngine(this.#utils);
    this.#uc = new UserControls( );
    this.#cache = new Cache(this);
  }
  //getters
  get utils( ) {return this.#utils};
  get renderer( ) {return this.#render_engine};
  get sprite( ) {return this.#sprite_lib};
  get controls( ){return this.#uc};
  get cache( ) {return  this.#cache}

  //private

  //public
  /* initializers */
  async init( ) {
    await this.#render_engine.init( );
    await this.#cache.preload( );
    this.#tileset = this.#cache.sprites.tiles;
  }

  //standard methods
  async createWorld(type, native = true) {
    return createWorld(type, this.#cache.sprites, native);
  }

  drawWorld(world) {
    this.#render_engine.drawWorld(world, this.#tileset)
  }

}
