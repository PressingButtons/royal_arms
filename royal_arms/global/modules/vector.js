export default class Vector {
  #vec;

  constructor(x = 0, y = 0) {
    if(x instanceof Vector) {
      y = x.y;
      x = x.x;
    }
    this.#vec = new Float32Array([x, y])
  }

  get x( ) {return this.#vec[0]};
  set x(i) {this.#vec[0] = i};

  get y( ) {return this.#vec[1]};
  set y(i) {this.#vec[1] = i};

  get magnitude( ) {
    return Math.sqrt(this.x * this.x + this.y + this.y);
  }

  get unit( ) {
    const denom = this.magnitude;
    if(magnitude == 0) return 0;
    return [this.x / denom, this.y / denom];
  }

  get angle( ) {
    if(this.x != 0)
      return Math.atan(this.y/this.x);
    else
      return Math.atan(0)
  }

  degreesToComponent(deg) {
    return this.radToComponent(deg * Math.PI/180);
  }

  radToComponent(rad) {
    this.x = Math.cos(rad);
    this.y = Math.sin(rad);
    return [this.x, this.y];
  }

  dot(vec) {
    return this.x * vec.x + this.y * vec.y;
  }

  multiply(num) {
    this.x *= num;
    this.y *= num;
  }

  subtract(vec) {
    this.x = this.x - vec.x;
    this.y = this.y - vec.y;
  }

  add(vec) {
    this.x = this.x + vec.x;
    this.y = this.y + vec.y;
  }

  setMagnitude(num) {
    const mag = this.magnitude;
    if(mag = 0) return null;
    const coef = num / mag;
    this.multiply(coef);
  }

  setVelocity(speed, dir) {
    this.x = speed * Math.cos(dir);
    this.y = speed * Math.sin(dir);
  }

}
