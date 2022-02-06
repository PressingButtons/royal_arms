import IKBone from '../../../engine/ikbone.js';

let bones1 = new Array(8).fill(0).map( x => new IKBone(1, 0, 50, 0))
let bones2 = new Array(8).fill(0).map( x => new IKBone(1, 0, 50, 0))
let ctx;
let mousepos = {x: 0, y: 0}
let recording = false;
let stream, chunks = [], recorder;

export default function main( ) {
  //bone.foster(b2);
  ctx = document.getElementById('game').getContext('2d');
  ctx.canvas.addEventListener('mousemove', updateMousePos);
  requestAnimationFrame(update);
  stream = document.getElementById('game').captureStream( );
  recorder = new MediaRecorder(stream, {mimeType: "video/webm"});
  recorder.ondataavailable = storeChunk;
}

function update(timestamp) {
  clear( );
  for(let i = 0; i < bones1.length; i++ ) {
    const bone = bones1[i];
    if(i == 0) bone.follow(mousepos.x, mousepos.y);
    else bone.follow(bones1[i-1].sx, bones1[i-1].sy);
    bone.update( );
    drawBone(bone);
  }

  for(let i = 0; i < bones2.length; i++ ) {
    if(i == 0) bones2[i].follow(mousepos.x - 10, mousepos.y - 10);
    else bones2[i].follow(bones2[i-1].sx, bones2[i-1].sy);
    bones2[i].update( );
    drawBone(bones2[i]);
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
  ctx.lineWidth = 2;
  ctx.moveTo(bone.sx, bone.sy);
  ctx.lineTo(bone.ex, bone.ey);
  ctx.stroke( );

  ctx.beginPath( );
  ctx.fillStyle = 'white';
  ctx.arc(bone.sx, bone.sy, 10, 0, 2 * Math.PI);
  ctx.fill( );
  ctx.closePath( );
}

function updateMousePos(event) {
  const rect = event.target.getBoundingClientRect( );
  mousepos.x = event.clientX - rect.x;
  mousepos.y = event.clientY - rect.y;
}

function startRecording( ){
  recording = true;
  recorder.start( );
  console.log(stream, 'record start');
  console.log(recorder)
}

function storeChunk(event) {
  chunks.push(event.data);
  if(chunks.length > 0 ) {
    handleDownload( );
  }
}

function handleDownload( ) {
  let blob = new Blob(chunks, {type: "video/webm"});
  const url = URL.createObjectURL(blob);
  open(url)
  stream = null;
  recording = false;
  recorder.stop( );
  chunks = [];
}

document.addEventListener('keyup', event => {
  if(event.key == ' ') {
    if(!recording) startRecording( );
    else recorder.stop( );
  }
});
