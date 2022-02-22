import GameObject from './gameobject/gameobject.js';
import * as SpriteLib from './sprite/spritelib.js';

export default class GameLib {

  constructor( ) {

  }

  get GameObject( ) {return GameObject}
  get sprite( ) {return SpriteLib}


  init( ) {
    SpriteLib.init(GameSystem.utils);
  }

}
