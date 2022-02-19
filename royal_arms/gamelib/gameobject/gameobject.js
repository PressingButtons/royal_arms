import State from '../state.js';
import Animator from './animator.js';
import GoBody from './body.js';

const AutoId = (function( ) {
  let n = 0;
  return function( ) {this.id = n++};
})( );

export default class GameObject extends State {

  #sprite;
  #transform = glMatrix.mat4.create( );
  #index;
  #animator;
  #frameData = {};
  #w;
  #h;
  #dir;

  constructor(config) {
    super("go" + String(new AutoId( ).id).padStart(4, '0'), null);
    this.body = new GoBody(this);
    this.body = config.body;
    this.setPosition(0, 0);
    this.#w = config.w;
    this.#h = config.h;
    this.velocity = new Vector();
    this.#dir = 0 ;
    this.#animator = new Animator(this);
    this.#index = [this.currentIndex, this.dir];
    this.#sprite = config.sprite;
    this.#frameData = config.frameData;
  }

  get w( ) {return this.#w};
  get h( ) {return this.#h};

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

  get dir( ){return this.#dir}
  set dir(n) {
    if(n > 0) this.#dir = 0;
    else this.#dir = 1;
  }

  get currentFrameData( ) {
    return this.#animator.current;
  }

  //private
  #readFrame( ) {
    const frame = this.#frameData(this.#animator.current.index);
    if(!frame || !frame.body) return;
    this.body.x = frame.body.x || 0;
    this.body.x = frame.body.y || 0;
    this.body.w = frame.body.w || this.w;
    this.body.h = frame.body.h || this.h;

  }

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

  onUpdate(config) {
    this.#animator.update(config.dt);
    this.#readFrame( );
  }

}
