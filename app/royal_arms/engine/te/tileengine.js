export default class TileEngine {

  #tilesize;

  constructor(tilesize) {
    this.#tilesize = tilesize;
  }

  get tilesize( ) {return this.#tilesize};



}
