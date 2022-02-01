import IKBone from '../../../engine/ikbone.js';

let bones = new Array(8).fill(0).map( x => new IKBone(1, 0, 50, 0))
let ctx;
let mousepos = {x: 0, y: 0}

export default function main( ) {
  //bone.foster(b2);
  ctx = document.getElementById('game').getContext('2d');
  ctx.canvas.addEventListener('mousemove', updateMousePos);
  requestAnimationFrame(update);
}

function update(timestamp) {
  clear( );
  for(let i = 0; i < bones.length; i++ ) {
    const bone = bones[i];
    if(i == 0) bone.follow(mousepos.x, mousepos.y);
    else bone.follow(bones[i-1].sx, bones[i-1].sy);
    bone.update( );
    drawBone(bone);
  }
  requestAnimationFrame(update);
}

function clear(color = 'black') {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawBone(bone) {
  ctx.beginPath( );
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 4;
  ctx.moveTo(bone.sx, bone.sy);
  ctx.lineTo(bone.ex, bone.ey);
  ctx.stroke( );
}

function updateMousePos(event) {
  const rect = event.target.getBoundingClientRect( );
  mousepos.x = event.clientX - rect.x;
  mousepos.y = event.clientY - rect.y;
}
