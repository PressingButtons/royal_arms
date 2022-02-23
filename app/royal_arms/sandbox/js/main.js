import * as Engine from '../../engine/engine.js'

export default function main( ) {

  Webutils.gl.viewport(0, 0, 384, 240);

  resize(Webutils.gl.canvas);

  function onLoad(world) {

    const dummy = System.spawn('hadsha', world);

    const inputs = System.Inputs;

    let left, right, up, down;

    function adjustCamera( ) {
      let s = 0, mx = 0, my = 0
      if(inputs.keyIsDown('z')) s += 0.01;
      if(inputs.keyIsDown('x')) s -= 0.01;
      if(inputs.keyIsDown('arrowup')) my -= 1;
      if(inputs.keyIsDown('arrowdown')) my += 1;
      if(inputs.keyIsDown('arrowleft')) mx -= 1;
      if(inputs.keyIsDown('arrowright')) mx += 1;
      world.camera.scale += s;
      world.camera.move(mx, my);
    }

    function directionals( ) {
      left = inputs.keyIsDown('a');
      right = inputs.keyIsDown('d');
      down = inputs.keyIsDown('s');
      up = inputs.keyIsDown('w');
    }

    function moveDummy( ) {
      let mx = 0, my = 0;
      if(left) {
        mx -= 1;
        dummy.dir = 1;
        dummy.animate('walk');
      }
      if(right) {
        mx += 1;
        dummy.dir = 0;
        dummy.animate('walk');
      }
      if(up) my -= 1;
      if(down) my += 1;
      if(dummy) {
        dummy.move(mx, my);
        if(mx == 0) dummy.animate('idle');
      }
    }

    function update( ) {
      adjustCamera( );
      directionals( );
      moveDummy( );
    }

    world.run(update);
  }

  Engine.loadWorld('sandbox').then(onLoad);
}

function resize(canvas) {
  canvas.width = 384;
  canvas.height = 240;
}
