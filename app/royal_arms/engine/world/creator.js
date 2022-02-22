import * as Loader from './loader.js';
import World from './world.js';

export default function create(type, sprites, native = true) {
  if(!native) return;
  return Loader.loadNative(type, sprites).then(createWorld);
}

function createWorld(data) {
  Object.assign(data.meta, {w: 380, h: 240});
  return new World(data);
}
