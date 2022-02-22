import Cache from './modules/cache.js';
import Vector from './modules/vector.js';
import * as Sprite from './libs/sprite/spritelib.js';
import State from './machines/state.js';
import * as GameWorld from './libs/gameworld/lib.js'
import * as Graphics from './libs/graphics/graphicslib.js';
import Inputs from './libs/inputs/inputlib.js';
import Spawn from './routines/spawn.js';

const _TILESIZE = 16;
const _cache = new Cache( );

window.System = { };

function init( ) {
  delete System['init']; //remove initialization property
  return new Promise(async function(resolve, reject) {
    await initProperty('Cache', _cache);
    await initProperty('Graphics', Graphics);
    expandSystem( );
    resolve( );
  });
}

function initProperty(name, object) {
  return object.init( ).then(( ) => {
    Object.defineProperty(System, name, {value: object});
  })
}

function expandSystem( ) {
  Object.defineProperties(System, {
    GameWorld: {value: GameWorld},
    Inputs: {value: Inputs()},
    spawn: {value: Spawn},
    Vector: {value: Vector}
  })
}

Object.defineProperties(window.System, {
  TILESIZE : {value: _TILESIZE},
  init: {value: init, configurable: true},
  sprite: {value: Sprite},
  State: {value: State},
});
