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

function comparePad(gamepad, pollpad) {
  compareButtons(gamepad, pollpad);
  compareAxes(gamepad, pollpad);
}

function connectGamepad(gamepad) {
  snapshot(gamepad);
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
  for(let j = 0; j < gamepads.length; j++) validateGamepads(j, poll);
}

function recordAxes(axes, gamepad) {
  for(let i = 0; i < gamepad.axes.length; i++) {
    axes[i] = gamepad.axes[i];
  }
}

function recordButtons(buttons, gamepad) {
  for(let i = 0; i < gamepad.buttons.length; i++) {
    buttons[i] = gamepad.buttons[i].value;
  }
}

function refreshGamepad(gamepad) {
  if(!gamepads[gamepad.index]) connectGamepad(gamepad);
}

function snapshot(gamepad) {
  gamepads[gamepad.index] = {id: gamepad.id, index: gamepad.index, buttons: {}, axes: {}};
  recordButtons(gamepads[gamepad.index].buttons, gamepad);
  recordAxes(gamepads[gamepad.index].axes, gamepad);
}

function validateGamepads(i, poll) {
  if(!poll[i]) disconnectGamepad(i);
  else comparePad(gamepads[i], poll[i]);
}

export function update( ) {
  pollGamepads( )
}

export function pads( ) {
  return Object.assign({}, gamepads);
}
