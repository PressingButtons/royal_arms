import main from './main.js';

window.onload = event => {
  initWebutils(document.getElementById('canvas').getContext('webgl'));
  System.init( ).then(main);
}
