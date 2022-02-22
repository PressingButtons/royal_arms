import * as Keyboard from './keyboard.js';
import * as Gamepad from './gamepad.js';

let pid = 0;

export default function( ) {

  Keyboard.init( );

  function pollGamepads( ) {
    pid = requestAnimationFrame(updateGamepads);
  }

  function stopPollingGamepads( ) {
    cancelAnimationFrame(pid);
  }

  //pollGamepads( );

  return {
    keyIsDown(key) {return Keyboard.keyIsDown(key)},
    pollGamepads: pollGamepads,
    stopPollingGamepads: stopPollingGamepads
  }

}


function updateGamepads( ) {
  Gamepad.update( );
  pid = requestAnimationFrame(updateGamepads);
}
