
let world;

export async function loadWorld(key) {
  world = await System.GameWorld.create(key);
  return world;
}

export function run(func) {
  if(world) world.run( );
}

export function stop( ) {
  if(world) world.stop( );
}


document.addEventListener('focus', run);
document.addEventListener('blur', stop);
