import Dummy from './dummy/dummy.js';

export default function(type, sprite) {
  let object = null;
  switch(type.toLowerCase()) {
    case 'dummy': object = new Dummy(sprite.dummy); break;
  }
  return object;
}
