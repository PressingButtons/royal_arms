import GameObject from '../../../engine/objects/gameobject.js';
import * as Collision from '../../../engine/physics/collision.js';
import Vector from '../../../engine/physics/vector.js';
import World from '../../../engine/world/world.js'

export default function main( ) {

  const world = new World( );

  const angleVector = new Vector( );

  const box = new GameObject(100, 100);
  const player = new GameObject(70, 40);
  const ctx = document.getElementById('game').getContext('2d');
  const bullets = [];
  const bulletConfig = {
    1: {
      w: 10,
      h: 10,
      speed: 20
    }
  }

  let bulletType = 0, lastStep;

  box.setPosition(400, 300);
  player.setPosition(50, 320);

  function update(timestamp) {
    if(!lastStep) lastStep = timestamp;
    const dt = timestamp - lastStep;
    clear( );
    drawObject(box);
    drawObject(player);
    for(const bullet of bullets) {
      bullet.update({dt: dt, gravity: 6})
      bullet.move(bullet.velocity);
      if(bullet.left > 1000 || Collision.AABB(bullet, box)) {
        bullets.splice(bullets.indexOf(bullet), 1);
        continue;
      }
      drawObject(bullet);
    }
    lastStep = timestamp;
    requestAnimationFrame(update);
  }

  function clear( ) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  function drawObject(object) {
    ctx.fillStyle = object.color || 'white';
    ctx.fillRect(object.left, object.top, object.body.w, object.body.h);
  }

  function fireBullet( ) {
    //const bullet = spawnBullet(bulletConfig[bulletType]);
    const bullet = world.spawn('slugbullet', player.right, player.top, {radians: angleVector.angle});
    if(bullet) {
      bullet.color = '#FF0';
      bullets.push(bullet);
    }
  }

  function keyListener(event) {
    if(event.key == ' ') fireBullet( );
    else if(!isNaN(event.key)) bulletType = event.key;
  }

  function spawnBullet(config) {
    if(!config) return;
    const bullet = new GameObject(config.w, config.h);
    bullet.setVelocity(config.speed, 0);
    bullet.setPosition(player.right, player.top);
    bullet.color = 'yellow';
    bullet.lifetime = 1500;
    return bullet;
  }

  function handleMouseMove(event) {
    const rect = event.target.getBoundingClientRect( );
    angleVector.x = event.clientX - rect.x - player.right;
    angleVector.y = event.clientY - rect.y - player.top;
  }

  document.addEventListener('keyup', keyListener);
  ctx.canvas.addEventListener('mousemove', handleMouseMove);

  requestAnimationFrame(update);

}
