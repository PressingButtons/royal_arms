import RenderEngine from './render/render.js';
import SpriteLib from './sprite/sprite.js';
import SpriteCache from './sprite/cache.js';
import World from './world/world.js';
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
  #sprite_cache;

  constructor(gl) {
    this.#utils = new Utils(gl);
    this.#sprite_lib = new SpriteLib(this.#utils);
    this.#sprite_cache = new SpriteCache(this.#sprite_lib);
    this.#render_engine = new RenderEngine(this.#utils);
    this.#uc = new UserControls( );
  }
  //getters
  get utils( ) {return this.#utils};
  get renderer( ) {return this.#render_engine};
  get sprite( ) {return this.#sprite_lib};
  get controls( ){return this.#uc};
  get cache( ) {return  this.#sprite_cache}

  //private

  //public
  /* initializers */
  async init( ) {
    await this.#render_engine.init( );
  }
  async initTiles(url, tw, th) {
    this.#tileset = await loadImage(url).then(image => this.#sprite_lib.create(image, tw, th));
  }

  //standard methods
  async createWorld(type, native = true) {
    if(!this.#tileset) throw 'Error - (Engine.createWorld): No tileset initialized.';
    if(native) {
      return Loader.loadWorldConfig(type).then(async config => {
        config.tilemap.layers = await Promise.all(config.tilemap.layers.map(layer => {
          return this.#sprite_lib.createLayer(layer, TILESIZE);
        }));
        return new World(config)
      });
    } else {

    }
    return new World(config);
  }

  drawWorld(world) {
    this.#render_engine.drawWorld(world, this.#tileset)
  }

}
