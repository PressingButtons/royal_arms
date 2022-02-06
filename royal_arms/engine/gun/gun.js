import Machine from '../statemachine/machine.js';

class Gun extends Machine {

  #ammunition;
  #clipSize;
  #machine;

  constructor(config) {
    super( );
    this.#clipSize = this.#ammunition = config.ammunition;
    this.#bulletConfig = config.bullet;
    this.switchState(this.#states.nuetral);
  }

  #defineStates(config) {
    this.#defineState(GunNuetral);
    this.#defineState(GunFire, config);
    this.#defineState(GunReload, config);
  }

  get ammo( ) {return ammunition}

  reload(num = -1) {
    if(this.currentState.reload)
      this.currentState.reload(num);
  }

  shoot( ) {
    if(this.currentState.shoot)
      this.currentState.shoot( );
  }

}
