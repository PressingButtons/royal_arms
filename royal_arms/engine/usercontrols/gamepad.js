const gamepads = {length: 0};

function compareAxes(gamepad, pollpad) {
  for(let i = 0; i < pollpad.axes.length; i++) {
    if(gamepad.axes[i] == pollpad.axes[i].value) continue;
    gamepad.axes[i] = pollpad.axes[i].value
    broadcastEvent('gamepadaxeschange', {value: pollpad.axes[i].value, index: i});
  }
}

function compareButtons(gamepad, pollpad) {
  for(let i = 0; i < pollpad.buttons.length; i++) {
    if(gamepad.buttons[i] == pollpad.buttons[i].value) continue;
    gamepad.buttons[i] = pollpad.buttons[i].value;
    broadcastEvent('gamepadbuttonchange', {value: pollpad.buttons[i].value, index: i});
  }
}

function comparePad(gampad, pollpad) {
  compareButtons(gamepad, pollpad);
  compareAxes(gamepad, pollpad);
}

function connectGamepad(gamepad) {
  gamepad[gamepad.index] = snapshot(gamepad);
  gamepads.length ++;
  broadcastEvent('gamepad_connected', {id: gamepad.id, index: gamepad.index});
}

function disconnectGamepad(i) {
  delete gamepads[i];
  gamepads.length --;
  broadcastEvent('gamepad_disconnected', {index: i});
}

function pollGamepads( ) {
  const poll = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  for(let i = 0; i < poll.length; i++) refreshGamepad(poll[i]);
  for(let j = 0; j < gamepads.length; j++) validateGamepads(i, poll);
}

function recordAxes(axes, gamepad) {
  for(let i = 0; i < gamepad.axes.length; i++) {
    axes[i] = gamepad.axes[i];
  }
}

function recordButtons(buttons, gamepad) {
  for(let i = 0; gamepad.buttons.length; i++) {
    buttons[i] = gamepad.buttons[i].value;
  }
}

function refreshGamepad(gamepad) {
  if(!gamepads[gamepad.index]) connectGamepad(gamepad);
}

function snapshot(gamepad) {
  gamepad[gamepad.index] = {id: gamepad.id, index: gamepad.index, buttons: {}, axes: {}};
  recordButtons(gamepad[gamepad.id].buttons, gamepad);
  recordAxes(gamepad[gamepad.id].axes, gamepad);
}

function validateGamepads(index, poll) {
  if(!poll[i]) disconnectGamepad(i);
  else comparePad(gamepads[i], poll[i]);
}

export function update( ) {
  pollGamepads( )
}

export function gamepads( ) {
  return Object.assign({}, gamepads);
}
