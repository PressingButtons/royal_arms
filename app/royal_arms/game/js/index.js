import main from './drivers/test01.js';
import * as Screen from './modules/screen.js';

window.onload = event => {
  Screen.setScreen(document.getElementById('game'));
  Screen.setResolution(720, 480);
  main( );
}
