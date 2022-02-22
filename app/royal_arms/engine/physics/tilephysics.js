import GameObject from '../objects/gameobject.js'

export default class TilePhysics {

  #map;
  #tilesize;

  constructor(map, tilesize) {
    this.#map = map;
    this.#tilesize = tilesize;
  }

  get width( ) {return this.#map.w};
  get height( ) {return this.#map.h};

  #getTilePosition(gameobject) {

    const l = (gameobject.left / this.#tilesize)|0;
    const r = (gameobject.right / this.#tilesize)|0;
    const t = (gameobject.top / this.#tilesize)|0;
    const b = (gameobject.bottom / this.#tilesize)|0;



    return {
      l: l, r: r, t: t, b: b,
      tl: this.#map.getTileByIndex(t, l),
      tr: this.#map.getTileByIndex(t,r),
      bl: this.#map.getTileByIndex(b,l),
      br: this.#map.getTileByIndex(b,r)
    }

  }

  #resolveStep(gameobject, dt) {
    gameobject.x += gameobject.velocity.x * dt;
    this.#resolveX(gameobject);
    gameobject.y += gameobject.velocity.y * dt;
    this.#resolveY(gameobject);
  }

  #resolveX(gameobject) {
    let pos = this.#getTilePosition(gameobject);
    if(pos.tl == '1.0' || pos.bl == '1.0') {
      gameobject.left = (pos.l + 1) * this.#tilesize;
      pos = this.#getTilePosition(gameobject);
    }
    if(pos.tr == "1.0" || pos.br == "1.0") {
      gameobject.right = pos.r * this.#tilesize - 1;
    }
  }

  #resolveY(gameobject) {
    let pos = this.#getTilePosition(gameobject);
    if(pos.tl == 1 || pos.tr == 1) {
      gameobject.top = (pos.t + 1) * this.#tilesize;
       pos = this.#getTilePosition(gameobject);
    }
    if(pos.bl === '1.0' || pos.br === '1.0') {
      gameobject.bottom = pos.b * this.#tilesize - 0.1;
      gameobject.velocity.y = 0;
    }
  }

  update(gameobject, dt) {
    if(!gameobject instanceof GameObject) {
      console.error('Error - invalid type', gameobject);
      throw 'Error, object is not an instanceof gameobject'
    }
    this.#resolveStep(gameobject, dt);
  }

}
