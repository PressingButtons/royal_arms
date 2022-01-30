import {image as loadImage} from '../modules/retriever.js';

class Scene2D extends EventTarget {

  static MAX_CAMERA_WIDTH = 380;
  static MAX_CAMERA_HEIGHT = 240;
  static CAMERA_RATIO = Scene2D.MAX_CAMERA_WIDTH / Scene2D.MAX_CAMERA_HEIGHT;

  camera = {x: 0, y: 0, w: 126, h: 100}
  size   = {w: 0, h: 0};
  layers;


  constructor( ) {
    super( );
  }

  #initLayers(layers) {

  }

  load(config) {
    this.size = config.size;
    this.camera.x = (this.size.w / 2) | 0;
    this.camera.y = (this.size.h / 2) | 0;
    const layerRequests = config.layers.map(x => loadImage(x));
    return Promise.all(layerRequests).then(this.#initLayers);
  }

}
