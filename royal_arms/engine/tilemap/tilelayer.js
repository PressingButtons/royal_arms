const IDENTITY_MATRIX = glMatrix.mat4.create( );

export default class TileLayer {

  #src
  #transform = glMatrix.mat4.create( );

  constructor(sprite) {
    this.#src = sprite;
    this.x = 0;
    this.y = 0;
  }

  get transform( ) {
    this.resetTransform( );
    return glMatrix.mat4.translate(this.#transform, IDENTITY_MATRIX, [this.x, this.y, 0]);
  }

  get src( ) {
    return this.#src;
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }

  resetTransform( ) {
    this.#transform.set(IDENTITY_MATRIX);
  }


}
