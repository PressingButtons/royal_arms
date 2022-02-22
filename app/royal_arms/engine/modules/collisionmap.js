export default class CollisionMap {

  #tiles;
  #w;
  #h
  #length;

  constructor(canvas) {
    if(canvas) this.load(canvas);
  }

  get width( ) {return this.#w};
  get height( ) {return this.#h};
  get length( ) {return this.#length};
  get tiles( ) {return Object.assign({}, this.#tiles)};

  #getPixel(bitmap, i) {
    return {
      r: bitmap[i], g: bitmap[i + 1], b: bitmap[i + 2], a: bitmap[i + 3],
      get value( ) {
        return (this.r << 24) + (this.g << 16) + (this.b << 8) + (this.a)
      },
    };
  }

  #parseTiles(bitmap) {
    this.#tiles = { };
    for(let i = 0; i < bitmap.data.length; i += 4) {
      const index = (i/4);
      const row = Math.floor(index/bitmap.width);
      const col = index % bitmap.width;
      const pixel = this.#getPixel(bitmap.data, i);;
      if(pixel.value > 0) {
        if(!this.#tiles[row]) this.#tiles[row] = { };
        this.#tiles[row][col] = [pixel.r, pixel.g];
      }
    }
  }

  load(canvas) {
    const ctx = canvas.getContext('2d');
    this.#parseTiles(ctx.getImageData(0, 0, canvas.width, canvas.height));
    this.#w = canvas.width;
    this.#h = canvas.height;
    this.#length = canvas.width * canvas.height;
  }

  getTileByIndex(row, col) {
    if(!tiles[row] || !tiles[row][col]) return null;
    return tiles[row][col];
  }

  getTileByPosition(x, y, tilesize) {
    const row = (y/tilesize) | 0;
    const col = (x/tilesize) | 0;
    return getTileByIndex(row, col);
  }

}
