import loadSprites from './loadsprites.js';

export default function(engine) {

  let sprites;

  function releaseSprites( ) {
    for(const i in sprites) delete sprites[i];
  }

  async function preload( ) {
    sprites = await loadSprites( );
  }

  return {
    get sprites( ) {return Object.assign({}, sprites)},
    preload: preload,
    releaseSprites: releaseSprites,
  }

}
