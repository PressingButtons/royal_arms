import preloadsprites from './preloadsprites.js';

export default function(engine) {

  let sprites;

  async function loadSprites( ) {
    sprites = await preloadsprites(engine, './assets/sprites/');
    return;
  }

  function releaseSprites( ) {
    for(const i in sprites) delete sprites[i];
  }

  async function preload( ) {
    await loadSprites( );
  }

  return {
    get sprites( ) {return Object.assign({}, sprites)},
    preload: preload,
    releaseSprites: releaseSprites,
  }

}
