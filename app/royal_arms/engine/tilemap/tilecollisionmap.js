export default class TileCollisionMap {

  #tiles;

  constructor(canvas) {
    this.#parseTiles(canvas);
  }

  #parseTiles(canvas) {
    this.#tiles = { };
    const bitmap = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < bitmap.data.length; i += 4) {
      const index = (i / 4);
      const row = (index / bitmap.width) | 0;
      const col = (index % bitmap.width);
      const pixel = this.#getPixel(bitmap.data, i);
      if(pixel.value > 0) this.#setValue(row, col, pixel);
    }
  }

  #getPixel(data, i) {
    return {
      r: data[i+0],
      g: data[i+1],
      b: data[i+2],
      a: data[i+3],
      get value( ) {return (this.r << 24) + (this.g << 16) + (this.b << 8) + this.a}
    }
  }

  #setValue (row, col, pixel) {
    if(!this.#tiles[row]) this.#tiles[row] = { };
    this.#tiles[row][col] = [pixel.r, pixel.g];
  }

  getTileByIndex(row, col) {
    if(!this.#tiles[row] || !this.#tiles[row][col]) return null;
    return this.#tiles[row][col].join('.');
  }

  getTileByPosition(x, y, tilesize) {
    const row = (y / tilesize) | 0;
    const col = (x / tilesize) | 0;
    return getTileByIndex(row, col);
  }

}
