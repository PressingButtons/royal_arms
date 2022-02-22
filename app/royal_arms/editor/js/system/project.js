export default class Project {

  #layers;
  #rows;
  #cols
  #w;
  #h;
  #collisionMap;
  #tilesize;

  constructor(config) {
    this.#w = config.w;
    this.#h = config.h;
    this.#rows = config.rows || (config.h / config.tilesize) | 0;
    this.#cols = config.cols || (config.w / config.tilesize) | 0;
    this.#tilesize = config.tilesize;
    this.#collisionMap = config.collisionMap || this.#createLayer( ).map;
    this.#layers = config.layers || [];
  }

  get width( ) {return this.#w};
  get height( ) {return this.#h};

  #createLayer( ) {
    const map = new Array(this.#rows).fill(new Array(this.#cols).fill(0));
    const tint = {r: 0, g: 0, b: 0, a: 0};
    return {map: map, tint: tint}
  }

  #swapLayer(a, b) {
    const layerA = this.#layers[a];
    const layerB = this.#layers[b];
    if(!layerA || !layerB) throw `Cannot swap layers, indexes invalid (${a},${b})`;
    this.#layers.splice(a, 1, layerB);
    this.#layers.splice(b, 1, layerA);
  }

  addLayer(index) {
    return this.#layers.splice(index, 0, this.#createLayer( ));
  }

  removeLayer(index) {
    this.#layers.splice(index, 1);
  }

  plotTile(details) {
    const layer = this.#layers[details.index];
    if(!layer) throw `Error - cannot plot in invalid layer (${details.index})`;
    const row = layer[details.row];
    if(!row) throw `Error - cannot plot on invalid row (${details.row})`;
    const col = row[details.col];
    if(!col) throw `Error - cannot plot on invalid col (${details.col})`;
    col = details.value;
  }

  plotCollision(details) {
    const row = this.#collisionMap[details.row];
    if(!row) throw `Error - cannot plot on invalid row (${details.row})`;
    const col = row[details.col];
    if(!col) throw `Error - cannot plot on invalid col (${details.col})`;
    col = details.value;
  }

  exportData( ) {
    return {
      w: this.#w,
      h: this.#h,
      rows: this.#rows,
      cols: this.#cols,
      tilesize: this.#tilesize,
      collisionMap: this.#collisionMap,
      layes: this.#layers
    }
  }

}
