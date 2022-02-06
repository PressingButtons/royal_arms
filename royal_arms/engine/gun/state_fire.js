import State from '../statemachine/state.js';

class GunFire extends State {

  #fireInterval;
  #countdown;
  #bulletPosition;
  #bulletConstructor;
  #recoilAmount;
  #recoil;
  #bulletsPerFire;

  constructor(machine, options) {
    call('nuetral', machine);
    this.#bulletConstructor = options.bulletConstructor;
    this.#bulletPosition = options.bulletPosition;
    this.#bulletsPerFire = options.bpf;
  }

  enterState(config) {
    this.#countdown = this.#fireInterval;
    const bullet = new bulletConstructor( );
    bullet.aim(this.machine.aim);
    this.machine.scene.addObject(bullet);
  }

  update(config) {
    this.#countdown = config.dt;
    if(this.#countdown < = 0) this.machine.switchState('nuetral');
  }

  exitState(config) {

  }

}
