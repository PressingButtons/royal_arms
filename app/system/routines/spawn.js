import Dummy from '../../entities/dummy/dummy.js'

export default function spawn(objectType, world) {
  let object;
  switch(objectType) {
    case 'dummy': object = new Dummy( ); break;
  }
  if(world) return world.addObject(object);
  return object;
}
