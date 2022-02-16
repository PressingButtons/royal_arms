const keys = { };

export function init( ) {
  document.addEventListener('keydown', keyboardListener);
  document.addEventListener('keyup', keyboardListener);
}

export function keyIsDown(key) {
  return keys[key] === true;
}

function keyboardListener(event) {
  let key = event.key.toLowerCase( );
  keys[key] = event.type == 'keydown' ? true : false;
}
