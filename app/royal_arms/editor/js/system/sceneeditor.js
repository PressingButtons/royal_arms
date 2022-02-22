export default class SceneEditor {

  #rows;
  #cols;
  #tilesize;
  #layers;

  constructor(rows, cols, tilesize) {
    this.#rows = rows;
    this.#cols = cols;
    this.#tilesize = tilesize;

  }

  #addBlankLayer( ) {
    const layer = new Array(this.#rows).fill(new Array(this.#cols).fill(0));
    for(const row in layer) {
      for(const col in layer[row]) {
        const s = this.#tilesize;
        const x = col * s;
        const y = row * s;
        layer[row][col] = new SceneTile(x, y, s);
      }
    }
  }

  #getLayerVertex(layer) {
    const position = new Float32Array(layer.length * layer[0].length * 12);
    const texture  = new Float32Array(layer.length * layer[0].length * 12);
    for(const row in layer) {
      for(const col in layer[row]) {
        const tile =
        position.set()
      }
    }
  }

  addLayer(config) {
    if(config) {}
    else this.#addBlankLayer( );
  }

  getVertices( ) {
    return this.#layers.map(this.#getLayerVertex);
  }

}

class SceneTile {

  #position = new Float32Array(12);
  #texture = new Float32Array(12);
  #tilesize;

  constructor(x, y, s) {
    this.#tilesize = s;
    this.#position.set([x, y, x+s, y, x, y+s, x, y+s, x+s, y+s, x+s, y]);
  }

  get vertices( ) {
    return {
      position: this.#position,
      texture: this.#texture
    }
  }

  setTextureCoordinate(x, y) {
    const s = this.#tilesize
    this.#texture.set([x, y, x+s, y, x, y+s, x, y+s, x+s, y+s, x+s, y]);
  }

}
