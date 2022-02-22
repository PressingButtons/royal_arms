import preload from '../routines/preload.js';

let init = false;

const sprites = { };
const maps = { };
const images = { };

function Cache( ) {
  Object.defineProperties(this, {
    sprites: {value: sprites},
    images: {value: images},
    maps: {value: maps}
  })
}

Cache.prototype.init = function( ) {
  if(init) reject( );
  init = true;
  return preload( ).then(setCache);
}

function setCache(assets) {
  for(const key in assets.graphics.sprites)
    Object.defineProperty(sprites, key, {value: assets.graphics.sprites[key]});
  for(const key in assets.graphics.images)
    Object.defineProperty(images, key, {value: assets.graphics.images[key]});
  for(const key in assets.graphics.maps)
    Object.defineProperty(maps, key, {value: assets.graphics.maps[key]});
}


export default Cache;
