const IDENTITY_MATRIX = glMatrix.mat4.create( );
export default class Camera {

  #w;
  #h;
  #scale = 1;
  #transform = IDENTITY_MATRIX.slice( );
  #ortho = IDENTITY_MATRIX.slice( );

  constructor(width, height) {
    this.#w = width;
    this.#h = height;
    this.#ortho = glMatrix.mat4.ortho(glMatrix.mat4.create( ), 0, width, height, 0, 1, -1);
    this.position(0, 0);
  }

  get scale( ) {return this.#scale};
  set scale(num) {
    if(isNaN(num)) return;
    this.#scale = num;
  }

  get transform( ) {
    this.#transform.set(IDENTITY_MATRIX);
    glMatrix.mat4.translate(this.#transform, this.#transform, [this.x, this.y, 0]);
    glMatrix.mat4.scale(this.#transform, this.#transform, [this.#scale, this.#scale, 1]);
    return this.#transform
  }

  get ortho( ) { return this.#ortho; }

  position(x, y) {
    this.x = x;
    this.y = y;
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }

}
