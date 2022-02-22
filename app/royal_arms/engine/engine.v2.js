import Updater from './modules/updater.js';
import TileEngine from './te/tileengine.js';
import Cache from './cache/cache.js';

export default class Engine {

  #gamelib;
  #updater;
  #world;
  #tileEngine;
  #cache;

  constructor(gamelib, cache, tilesize) {
    this.#gamelib = gamelib;
    this.#updater = new Updater(this);
    this.#tileEngine = new TileEngine(tilesize);
    this.#cache = cache;
    this.#setListeners( );
  }

  //private
  #setListeners( ) {
    document.addEventListener('blur', event => this.stop( ));
    document.addEventListener('focus', event => this.run( ));
  }

  //initialization
  async init( ) {
    await this.#cache.preload( );
  }

  //public
  /* Running and Stopping */
  run(func) {
    this.#updater.run(func);
  }

  stop( ) {
    this.#updater.stop( );
  }
  /* ----------------- */

}
