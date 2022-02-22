export default class Camera {

  #w;
  #h;
  #ortho;

  constructor(w, h) {
    this.#w = w;
    this.#h = h;
    this.scale = 1;
    this.position(0, 0);
    this.#ortho = glMatrix.mat4.ortho(glMatrix.mat4.create(), 0, w, h, 0, 1, -1);
  }

  get transform( ) {
    return glMatrix.mat4.fromRotationTranslationScale(
      glMatrix.mat4.create(), [0,0,0,0], [this.x, this.y, 0], [this.scale, this.scale, 1]
    );
  }

  get ortho( ) {return this.#ortho};

  position(x, y) {
    this.x = x;
    this.y = y;
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }

}
