import Gun from '../engine/gun/gun.js';

class SlugPistol extends Gun {

  constructor( ) {
    super({
      spawnPosition: {x: 0, y: 0},
      ammunition: 4,
      interval: 1500,
      reloadTime: 800,
      reloadUnit: 1,
      recoil: 20,
      bpf: 1,
      bulletConstructor: SlugBullet
    });
  }

}
