export default class TilemapPhysics {

  #map;
  #tilesize;

  constructor(map, tilesize) {
    this.#map = map;
    this.#tilesize = tilesize;
  }

  get width( ) {return this.#map.w }
  get height( ) {return this.#map.h }

  #getTilePosition(gameobject) {
    const l = (gameobject.left / this.#tilesize)|0;
    const r = (gameobject.right / this.#tilesize)|0;
    const t = (gameobject.top / this.#tilesize)|0;
    const b = (gameobject.bottom / this.#tilesize)|0;

    return {
      l: l, r: r, t: t, b: b,
      tl: this.#map[t][l] || null,
      tr: this.#map[t][r] || null,
      bl: this.#map[b][l] || null,
      br: this.#map[b][r] || null
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
    if(pos.tl == 1 || pos.bl == 1) {
      gameobject.left = pos.l * this.#tilesize;
      pos = this.#getTilePosition(gameobject);
    }
    if(pos.tr == 1 || pos.br == 1) {
      gameobject.right = pos.r * this.#tilesize;;
    }
  }

  #resolveY(gameobject) {
    let pos = this.#getTilePosition(gameobject);
    if(pos.tl == 1 || pos.tr == 1) {
      gameobject.top = (pos.t + 1) * this.#tilesize;
    }
    if(pos.bl == 1 || pos.br == 1) {
      gameobject.bottom = pos.b * this.#tilesize;;
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
