import Engine from '../../engine/engine.js';
import Recorder from '../../modules/recorder.js';

window.onload = event => {
  const canvas = document.getElementById('canvas');
  canvas.width = 384;
  canvas.height = 240;

  const engine = new Engine(canvas.getContext('webgl'));

  const recorder = new Recorder(canvas);
  document.addEventListener('downloadrecording', event => {
    window.open(event.detail);
  });

  engine.init( ).then(async function( ) {

    const world = await engine.createWorld("sandbox");

    let dummy = engine.spawn('dummy', world, {row: 14, col: 9});

    let right, left, up, down, zi, zo;

    let recording = false

    function readControls( ) {
      right = engine.controls.keyIsDown('d');
      left = engine.controls.keyIsDown('a');
      up = engine.controls.keyIsDown('w');
      down = engine.controls.keyIsDown('s');
      zi = engine.controls.keyIsDown('z');
      zo = engine.controls.keyIsDown('x');
      if(engine.controls.keyIsDown('r') && !recording) {
        console.log('record start');
        recorder.start( );
        recording = true;
      }
      if(engine.controls.keyIsDown('t') && recording) {
        console.log('record end');
        recorder.stop( );
        recording = false;
      }
    }

    function updateCamera( ) {
      let movex = 0, movey = 0, s = 0;
      if(right) {
        movex += 1;
        dummy.dir = 1;
      }
      if(left) {
        movex -= 1;
        dummy.dir = -1;
      }
      if(up) dummy.velocity.y = -0.25;
      if(down) movey += 1;
      if(zi) s += 0.01;
      if(zo) s -= 0.01;
      dummy.x += movex;
      dummy.y += movey;
    }

    function onUpdate(dt) {
      readControls( );
      updateCamera( );
    }

    engine.run(onUpdate);


    let last;

    function update(timestamp) {
      if(!last) last = timestamp;
      let now = performance.now( );
      const dt = now - last;
      readControls( );
      updateCamera( );
      world.update({dt: dt})
      engine.drawWorld(world);
      last = timestamp;
      requestAnimationFrame(update);
    }
    //requestAnimationFrame(update);
  });
}
