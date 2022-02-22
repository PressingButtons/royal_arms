export default class Updater extends System.State {


  constructor( ) {
    super('updater', null);
  }

  enterState( ) {

  }

  run(func) {
    if(funcc) this.onUpdate = func;
    this.switchState('run');
  }

  stop( ) {
    this.switchState('stop');
  }

}
