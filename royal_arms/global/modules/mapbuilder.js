import Sprite2D from '../modules/sprite2D.js';

class MapBuilder extends EventTarget {

  static TILESIZE = 16;

  sprite = new Sprite2D( );
  #tiles;

  constructor(tiles) {
    super( );
    this.#tiles = tiles;
  }

  #drawLayer(map) {
    const pane = generateCanvas(config.w, config.h);
    for(const row in map) {
      for(const col in map[row]) {
        const value = map[row][col];
        pane.ctx.drawImage(sprite.frame(value), col * MapBuilder.TILESIZE, row * MapBuilder.TILESIZE);
      }
    }
    return pane.canvas;
  }

  build(config) {
    layers = config.layers.map(x => drawLayer(x));
    return layers;
  }
}
