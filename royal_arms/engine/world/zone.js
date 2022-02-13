export default class WorldZones {

  #objects;
  #zones = { };
  #width;

  constructor(width, slices) {
    this.#width = width;
    this.#initZones(width, slices);
  }

  #initZones(width, slices) {
    const length = width / slices;
    for(let i = 0; i < slices; i++) {
      this.#zones[i] = {
        x1: i * width,
        x2: i * width + width,
        objects: [ ]
      }
    }
  }

  #checkObject(object) {
    const zl = object.zones[0];
    const zr = object.zones[1];
    if(!this.#withinRange(zl, object.left)) delete this.#zones[zl][object.id];
    if(!this.#withinRange(zr, object.right)) delete this.#zones[zr][object.id];
  }

  #withinRange(zid, x) {
    const zone = this.#zones[zid];
    if(!zone) return false;
    if(x < zone.x1 || x > zone.x2) return false;
    return true;
  }

  addObject(object) {
    this.#checkObject(object);
    let zleft  = (object.left / this.#width)  | 0;
    let zright = (object.right / this.#width) | 0;
    object.zones = [zleft, zright];
    zones[zleft][object.id] = object;
    zones[zright][object.id] = object;
  }

}
