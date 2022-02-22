import GameObject from './gameobject.js';
import Vector from '../modules/vector.js';
import PMovement from '../machines/pmovement/machine.js';

export default class RigidBody extends GameObject {

  #vector;

  constructor(config) {
    super(config);
    this.#vector = new Vector( );
    this.body = config.body || {x: 0, y: 0, w: config.w, h: config.h};
  }

  get left( ) {return this.x + this.body.x};
  set left(n) {this.x = n - this.body.x};

  get right( ) {return this.x + this.body. x + this.body.w};
  set right(n) {this.x = n - this.body.x - this.body.w};

  get top( ) {return this.y + this.body.y};
  set top(n) {this.y = n - this.body.y};

  get bottom( ) {return this.y + this.body.y + this.body.h};
  set bottom(n) {this.y = n - this.body.y - this.body.h};

  get center( ) {
    return {
      x: this.left + this.body.w / 2,
      y: this.top + this.body.h / 2
    }
  }

  set center(n) {
    let x = n.x || n[0] || null;
    let y = n.y || n[1] || null;
    if(x == null || y == null) return;
    this.x = x - this.body.x - this.body.w/2;
    this.y = y - this.body.y - this.body.h/2;
  }

}
