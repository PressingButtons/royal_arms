import GameObject from './gameobject/gameobject.js';
import State from './state.js';

Object.defineProperties(window.GameLib, {
  GameObject: {value: GameObject},
  State: {value: State}
});
