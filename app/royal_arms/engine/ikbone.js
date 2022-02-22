class IKBone {

  #data = new Float32Array(8);
  #child;

  constructor(x, y, length, angle) {
    this.sx = x;
    this.sy = y;
    this.length = length;
    this.angle = angle;
    this.#child = null;
  }

  get sx( ) {return this.#data[0]};
  set sx(i) {this.#data[0] = i};

  get sy( ) {return this.#data[1]};
  set sy(i) {this.#data[1] = i};

  get ex( ) {return this.#data[2]};
  set ex(i) {this.#data[2] = i};

  get ey( ) {return this.#data[3]};
  set ey(i) {this.#data[3] = i};

  get angle( ) {return this.#data[4]};
  set angle(i) {this.#data[4] = i};

  get length( ) {return this.#data[5]};
  set length(i) {this.#data[5] = i};

  get dx( ) {return this.#data[6]};
  set dx(i) {this.#data[6] = i};

  get dy( ) {return this.#data[7]};
  set dy(i) {this.#data[7] = i};

  #calculateEndPoint( ) {
    this.ex = this.sx + this.length * Math.cos(this.angle);
    this.ey = this.sy + this.length * Math.sin(this.angle);
  }

  #getMagComponent(length, vec) {
    const coef = Math.sqrt(((length * length) / (vec[0] * vec[0] + vec[1] * vec[1])));
    return vec.map( x => x * coef);
  }

  follow(x, y) {
    this.dx = x - this.sx;
    this.dy = y - this.sy;
    this.angle = Math.atan2(this.dy, this.dx);
    //
    let vec = this.#getMagComponent(this.length, [this.dx, this.dy]);
    vec = vec.map(x => x * -1);
    this.sx = x + vec[0];
    this.sy = y + vec[1];
  }

  foster(bone) {
    if(bone instanceof IKBone) {
      this.#child = bone;
      bone.follow(this.sx, this.sy);
    }
  }

  update( ) {
    this.#calculateEndPoint( );
    if(this.#child) {
      this.#child.follow(this.sx, this.sy);
    }
  }

}

export default IKBone;
