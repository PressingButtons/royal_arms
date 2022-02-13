export default class CollisionMap {

  #tilesize;
  #map;
  #tiles;

  constructor(tilesize) {
    this.#tilesize = tilesize;
  }

  #getPixel(bitmap, index) {
    return {
      r: bitmap[i], g: bitmap[i + 1], b: bitmap[i + 2], a: bitmap[i + 3],
      value: r << 24 + g << 16 + b << 8 + a
    };
  }

  #parseTiles(bitmap) {
    this.#tiles = {row: { }};
    const rows = bitmap.height / this.#tilesize;
    const cols = bitmap.width / this.#tilesize;
    for(let i = 0; i < bitmap.data.length; i += 4) {
      const row = Math.floor(i / rows);
      const col = i % cols;
      const pixel = #getPixel(bitmap.data, i);
      if(pixel.value > 0) {
        if(!this.#tiles[row]) this.#tiles[row] = { };
        this.#tiles[row][col] = pixel.value;
      }
    }
  }

  load(canvas) {
    const ctx = canvas.getContext('2d');
    this.#parseTiles(ctx.getImageData(0, 0, canvas.width, canvas.height));
  }

  tile(row, col) {
    if(!tiles[row] || !tiles[row][col]) return null;
    return tiles[row][col];
  }

}
