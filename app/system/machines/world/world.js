import State from '../state.js'
import Run from './run.js';
import Stop from './stop.js';
import Camera from '../../objects/camera.js';

export default class World extends State {

  #config;
  #run;
  #stop;
  #onUpdate;
  #camera;
  #objects = [];
  #objectLayer;

  constructor(config) {
    super('world', null);
    this.#config = config;
    this.#camera = new Camera(384, 240)
    this.#initStates( );
  }

  get layers( ) {
    return this.#config.tilemap.layers;
  }

  get objects( ) {
    return this.#objects;
  }

  get camera( ) {
    return this.#camera;
  }

  get objectLayer( ) {
    return this.#config.meta.objectLayer || this.#config.tilemap.layers.length - 1;
  }

  #initStates( ) {
    this.#run = this.addState(new Run(this));
    this.#stop = this.addState(new Stop(this));
    this.addLink(this.#run, this.#stop, 'stop');
    this.addLink(this.#stop, this.#run, 'run');
  }

  stop( ) {
    this.dispatchEvent(new Event('stop'));
  }

  run(func) {
    if(func) this.#onUpdate = func;
    this.dispatchEvent(new Event('run'));
  }

  addObject(object) {
    this.#objects.push(object);
    return object;
  }

  onUpdate(dt) {
    if(this.#onUpdate) this.#onUpdate(dt);
    System.Graphics.drawWorld(this);
  }

}
