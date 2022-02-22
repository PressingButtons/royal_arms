import WebGLUtils from '../../webgl-lib/webgl-lib.js';
import RenderEngine from '../../engine/render/render.js';
import SpriteLib from '../../engine/sprite/sprite.js';
import Recorder from '../../engine/modules/recorder.js'
import CollisionMap from '../../engine/modules/collisionmap.js'

let tileprogram;
let spritelib;
let webutils;
let render;
let cmap;
let recorder;

const transform = glMatrix.mat4.create( );
let ortho;

const sw = 384;
const sh = 240;

window.onload = event => {
  init( ).then(main);
}

async function init( ) {
  const canvas = document.getElementById('canvas');
  document.addEventListener('downloadrecording', exportRecording);
  canvas.width = sw;
  canvas.height = sh;
  webutils = new WebGLUtils(canvas.getContext('webgl', {premultipliedAlpha: false}));
  cmap = await loadImage('./assets/levels/sandbox0.webp');
  //tileprogram = await webutils.compile('./shaders/generic-texture.json');
  render = new RenderEngine(webutils);
  spritelib = new SpriteLib(webutils);
  render.setViewPort(0, 0, sw, sh);
  recorder = new Recorder(canvas);
  await render.init( );
}


function main( ) {
  const rs = 200;
  ortho = glMatrix.mat4.ortho(glMatrix.mat4.create(), 0, sw, sh, 0, 1, -1);

  webutils.createTexture('./assets/sprites/tiles.webp').then( async(texture) => {

    const map = await webutils.createTexture('./assets/levels/sandbox0.webp').then(texture => spritelib.layer(texture, 16));


    spritelib.create(texture, 16, 16).then(sprite => {

      const map_canvas = generateCanvas(cmap.width, cmap.height);
      map_canvas.ctx.drawImage(cmap, 0, 0);

      const collisionmap = new CollisionMap(map_canvas.canvas);

      console.log(collisionmap.tiles);
      console.log(sprite.sf);

      const index = new Float32Array([0, 0]);

      let left, right, up, down;

      document.addEventListener('keydown', event => {
        if(event.key.toLowerCase() == 'arrowleft') left = true;
        if(event.key.toLowerCase() == 'arrowright') right = true;
        if(event.key.toLowerCase() == 'arrowup') up = true;
        if(event.key.toLowerCase() == 'arrowdown') down = true;
      })

      document.addEventListener('keyup', event => {
        if(event.key == 'q') index[0] = index[0] < 20 ? index[0] + 1 : 20;
        if(event.key == 'w') index[0] = index[0] > 0 ?  index[0] - 1 : 0;
        if(event.key.toLowerCase() == 'arrowleft') left = false;
        if(event.key.toLowerCase() == 'arrowright') right = false;;
        if(event.key.toLowerCase() == 'arrowup') up = false;
        if(event.key.toLowerCase() == 'arrowdown') down = false;
        if(event.key.toLowerCase() == ' ')  {
          recorder.start( );
          console.log('recording started');
        }
        if(event.key.toLowerCase() == 'e') {
          console.log('recording ended');
          recorder.stop( );
        }
      })

      function draw( ) {
        render.clear(0, 0, 0 ,0);
        render.drawLayer(sprite, map, transform, ortho, index);
        render.drawSprite(sprite, transform, ortho, index);
      }

      function record( ) {

      }

      function move( ) {
        let xmove = 0;
        let ymove = 0;
        if(left) xmove -= 1;
        if(right) xmove += 1;
        if(up) ymove -= 1;
        if(down) ymove += 1;
        glMatrix.mat4.translate(transform, transform, [xmove, ymove, 0]);
      }

      function update( ) {
        move( );
        draw( );
        requestAnimationFrame(update);
      }

      requestAnimationFrame(update);

    });

  })

}

function exportRecording(event) {
  window.open(event.detail);
}
