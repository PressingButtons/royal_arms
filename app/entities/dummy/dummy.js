import Person from '../../system/objects/person.js';

const dummy_config = {

}

export default class Dummy extends Person {

  constructor( ) {
    super({
      sprite: System.Cache.sprites.dummy,
      w: 16, h: 48,
      stats: {walkSpd: 4, jumpPower: 5}
    })
  }

}
