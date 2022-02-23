import Person from '../../system/objects/person.js';

const hadsha_config = {
  w: 16, h: 48,
  stats: {walkSpd: 4, jumpPower: 5},
  animations: {
    idle: [0, 0],
    walk: [9, 125, 10, 125, 11, 125, 12, 125]
  }
}

export default class Hadsha extends Person {

  constructor( ) {
    super(Object.assign(hadsha_config, {sprite: System.Cache.sprites.hadsha}));
  }

}
