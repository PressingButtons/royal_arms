export default class MapBuilder {

  #tiles;
  #tilesize;

  constructor(tilesize) {
    this.#tilesize = tilesize;
  }

  get tiles( ) {return this.#tiles.slice( )}

  #sliceTiles(atlas) {
    const rows = (atlas.height / this.#tilesize) | 0;
    const cols = (atlas.width / this.#tilesize) | 0;
    for(let i = 0; i < rows; i++) {
      for(let j = 0; j < cols; j++ ) {
        const ts = this.#tilesize;
        const pane = generateCanvas(ts, ts);
        const x = j * ts;
        const y = i * ts;
        pane.ctx.drawImage(atlas, x, y, ts, ts, 0, 0, ts, ts);
        this.#tiles.push(pane.canvas);
      }
    }
  }

  loadTiles( ) {
    this.#tiles = [ ];
    return loadImage("../../assets/sprites/tiles.png")
    .then(this.#sliceTiles.bind(this))
    .catch(err => {throw err})
  }

  build(tilemap) {
    return tilemap.map.map(this.createLayer);
  }

  createLayer(design) {
    if(this.#tiles.length == 0) throw 'Error - MapBuilder tiles empty, initialize tiles!';
    const pane = generateCanvas(design[0].length * this.#tilesize, design.length * this.#tilesize);
    for(const row in design) {
      for(const col in design[row]) {
        const x = col * this.#tilesize;
        const y = row * this.#tilesize;
        const tile = this.#tiles[design[row][col]];
        if(!tile) continue;
        pane.ctx.drawImage(tile, x, y);
      }
    }
    return pane;
  }

}
