import RenderEngine from './render/render.js';
import SpriteLib from './sprite/sprite.js';
import Cache from './cache/cache.js';
import createWorld from './world/creator.js';
import CollisionMap from './modules/collisionmap.js'
import * as Loader from './modules/loader.js'
import UserControls from './usercontrols/usercontrols.js';
import Spawn from './entities/spawner.js';
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
  #world;
  #runid;
  #lastStep;
  #onUpdate;
  #blurred = false;

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
  get world( ) {return this.#world};

  //private
  #onBlur(event) {
    this.#blurred = true;
    this.stop( );
  }

  #onFocus(event) {
    if(this.#blurred) {
      this.run(this.#onUpdate);
      this.#blurred = false;
    }
  }

  #update(timestamp) {
    if(!this.#world) return;
    if(!this.#lastStep) this.#lastStep = timestamp;
    const dt = timestamp - this.#lastStep;
    if(this.#onUpdate) this.#onUpdate(dt);
    this.#world.update({dt: dt});
    this.drawWorld( );
    this.#lastStep = timestamp;
    this.#runid = requestAnimationFrame(this.#update.bind(this));
  }
  //public
  /* initializers */
  async init( ) {
    await this.#render_engine.init( );
    await this.#cache.preload( );
    this.#tileset = this.#cache.sprites.tiles;
    this.#render_engine.setViewPort(0, 0, 384, 240);
    document.addEventListener('blur', event => this.#onBlur(event));
    document.addEventListener('focus', event => this.#onFocus(event));
  }

  //standard methods
  async createWorld(type, native = true) {
    this.#world = await createWorld(type, this.#cache.sprites, native);
    return this.#world;
  }

  drawWorld( ) {
    this.#render_engine.drawWorld(this.#world, this.#tileset)
  }

  run(onUpdate) {
    this.#lastStep = null;
    this.#onUpdate = onUpdate;
    this.#runid = requestAnimationFrame(this.#update.bind(this));
  }

  stop( ) {
    cancelAnimationFrame(this.#runid);
  }

  spawn(type, world, position) {
    let object = Spawn(type, this.#cache.sprites);
    if(world) world.addObject(object);
    if(position.x && position.y) {
      object.setPosition(x, y);
    }
    if(position.row && position.col) {
      object.bottom = position.row * TILESIZE;
      object.left = position.col * TILESIZE
    }
    return object
  }

}
