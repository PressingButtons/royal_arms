import Engine from '../../engine/engine.js';

window.onload = event => {
  const canvas = document.getElementById('canvas');
  canvas.width = 384;
  canvas.height = 240;
  const engine = new Engine(canvas.getContext('webgl'));
  engine.init( ).then(( ) =>  engine.initTiles('./assets/sprites/tiles.webp', 16, 16).then(async(tiles) => {

    const world = await engine.createWorld("sandbox");
    let right, left, up, down, zi, zo;

    function readControls( ) {
      right = engine.controls.keyIsDown('d');
      left = engine.controls.keyIsDown('a');
      up = engine.controls.keyIsDown('w');
      down = engine.controls.keyIsDown('s');
      zi = engine.controls.keyIsDown('z');
      zo = engine.controls.keyIsDown('x');
    }

    function updateCamera( ) {
      let movex = 0, movey = 0, s = 0;
      if(right) movex += 1;
      if(left) movex -= 1;
      if(up) movey -= 1;
      if(down) movey += 1;
      if(zi) s += 0.01;
      if(zo) s -= 0.01;
      world.camera.x += movex;
      world.camera.y += movey;
      world.camera.scale = world.camera.scale + s;
    }

    function update(timestamp) {
      readControls( );
      updateCamera( );
      engine.drawWorld(world);
      requestAnimationFrame(update);
    }

    update( );

  }));
}
