import Dummy from '../../entities/dummy/dummy.js';
import Hadsha from '../../entities/hadsha/hadsha.js';

export default function spawn(objectType, world) {
  let object;
  switch(objectType) {
    case 'dummy': object = new Dummy( ); break;
    case 'hadsha': object = new Hadsha( ); break;
  }
  if(world) return world.addObject(object);
  return object;
}
