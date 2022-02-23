import Animator from '../modules/animator.js';

const autoid = new Utils.AutoId( );

export default class GameObject extends EventTarget {

  #id;
  #config;
  #animator;
  #dir = 0;
  #position = new Int16Array(2);

  constructor(config) {
    super( );
    this.#id= "go" + autoid.next.padStart(4, '0');
    this.#config = config;
    this.#animator = new Animator(this, config.animations);
  }

  get index( ) {
    return [this.#animator.currentFrame, this.#dir]
  }

  get dir( ) {return this.#dir}
  set dir(n) {this.#dir = n > 0 ? 1 : 0}

  get sprite( ) {return this.#config.sprite};

  get currentFrameData( ) {return this.#animator.current};

  get x( ) {return this.#position[0]};
  set x(n) {this.#position[0] = n};

  get y( ) {return this.#position[1]};
  set y(n) {this.#position[1] = n};

  get w( ) {return this.#config.w};
  get h( ) {return this.#config.h};

  get left( ) {return this.x};
  set left(n) {this.x = n};

  get right( ) {return this.x + this.w};
  set right(n) {this.x = n - this.w};

  get top( ) {return this.y};
  set top(n) {this.y = n};

  get bottom( ) {return this.y + this.h};
  set bottom(n) {this.y = n - this.h};

  get center( ) {
    return {
      x: this.left + this.w / 2,
      y: this.top + this.h / 2
    }
  }

  set center(n) {
    let x = n.x || n[0] || null;
    let y = n.y || n[1] || null;
    if(x == null || y == null) return;
    this.x = x - this.w/2,
    this.y = y - this.h/2
  }

  get transform( ) {
    return glMatrix.mat4.fromTranslation(glMatrix.mat4.create(), [this.x, this.y, 0]);
  }

  #update(config) {
    this.onUpdate(config);
    this.#animator.update(config.dt);
  }

  get update( ) {return this.#update}

  //methods
  animate(name, index = 0) {
    if(!this.#config.animations[name]) return;
    this.#animator.play(name, index);
  }

  move(...parms) {
    let dx, dy;
    if(parms[0] instanceof System.Vector) {
      dx = parms[0].x;
      dy = parms[0].y;
    } else {
      dx = parseInt(parms[0]);
      dy = parseInt(parms[1]);
    }
    if(isNaN(dx) || isNaN(dy)) return;
    this.x += dx;
    this.y += dy;
  }

  setPosition(x, y) {
    this.x = parseInt(x) || this.x;
    this.y = parseInt(y) || this.y;
  }

  onUpdate(config) {

  }
}
