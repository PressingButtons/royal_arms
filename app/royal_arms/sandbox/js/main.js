import * as Engine from '../../engine/engine.js'

export default function main( ) {

  Webutils.gl.viewport(0, 0, 384, 240);

  resize(Webutils.gl.canvas);

  function onLoad(world) {

    const dummy = System.spawn('dummy', world);

    const inputs = System.Inputs;

    let left, right, up, down;

    function directionals( ) {
      left = inputs.keyIsDown('a');
      right = inputs.keyIsDown('d');
      down = inputs.keyIsDown('s');
      up = inputs.keyIsDown('w');
    }

    function moveDummy( ) {
      let mx = 0, my = 0;
      if(left) mx -= 1;
      if(right) mx += 1;
      if(up) my -= 1;
      if(down) my += 1;
      if(dummy) dummy.move(mx, my);
    }

    function update( ) {
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
