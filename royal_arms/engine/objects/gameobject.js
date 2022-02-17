import State from '../statemachine/state.js';
import Vector from '../physics/vector.js'

const IDENTITY_MATRIX = glMatrix.mat4.create( );

const AutoId = (function( ) {
  let n = 0;
  return function( ) {
    this.id = n++;
  }
})( );

export default class GameObject extends State {

  #sprite;
  #transform = glMatrix.mat4.create( );
  #index;

  constructor(w, h, sprite, body) {
    super("go" + String(new AutoId( ).id).padStart(4, '0'), null);
    this.setPosition(0, 0);
    this.w = w;
    this.h = h;
    this.body = body || {x: 0, y: 0, w: w, h: h}
    this.velocity = new Vector( );
    this.#index = [0, 0];
    this.#sprite = sprite;
  }

  get left( ) {return this.x + this.body.x};
  set left(n) {this.x = n - this.body.x};

  get right( ) {return this.x + this.body.x + this.body.w};
  set right(n) {this.x = n - this.body.x - this.body.w};

  get top( ) {return this.y + this.body.y};
  set top(n) {this.y = n - this.body.y};

  get bottom( ) {return this.y + this.body.y + this.body.h};
  set bottom(n) {this.y = n - this.body.y - this.body.h};

  get sprite( ) {return this.#sprite};

  get center( ) {
    return {
      x: this.left + this.body.w / 2,
      y: this.top + this.body.h / 2,
    }
  }

  get dir( ){return this.#index[1]}
  set dir(n) {
    if(n > 0) this.#index[1] = 0;
    else this.#index[1] = 1;
  }

  get currentFrameIndex( ) {return this.#index}

  //private
  #transformWorld(world) {
    glMatrix.mat4.translate(this.#transform, this.#transform, [-this.w/2, -this.h/2, 0]);
    glMatrix.mat4.rotateZ(this.#transform, this.#transform, this.dir);
    glMatrix.mat4.translate(this.#transform, this.#transform, [this.w/2, this.h/2, 0]);
  }
  //public

  move(dx, dy) {
    if(dx instanceof Vector) {
      dy = dx.y;
      dx = dx.x;
    }
    this.x += dx;
    this.y += dy;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setVelocity(speed, dir) {
    this.velocity.setVelocity(speed, dir);
  }

  transform(world) {
    this.#transform.set(IDENTITY_MATRIX);
    //if(world) this.#transformWorld(world);
    glMatrix.mat4.translate(this.#transform, this.#transform, [this.x, this.y, 0]);
    return this.#transform;
  }

}
