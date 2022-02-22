let index = 0;

function autoId( ) {
  return 'world' + index.padStart('0', 3);
}


export default class World extends GameLib.State {

  #engine;

  constructor( ) {
    super(autoId( ), null);
  }

}
