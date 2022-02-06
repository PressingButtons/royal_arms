export default function TilePhysics(tilemap, object, dt) {
  const topLeft  = [object.body.left, object.body.top];
  const topRight = [object.body.right, object.body.top];
  const botLeft  = [object.body.left, object.body.bottom];
  const botRight = [object.body.right, object.body.bottom];

  const vec = [object.centerX + object.velocityX * dt, object.centerY + object.velocityY * dt];
  const slope = vec[1] / vec[2];

  converMagnitude(vec, tilesize);

}

function getCorners(object) {

}

function nextTile(point, vector, tilesize) {
  const v0 = new Vector(point);
  const v1 = new Vecotr(vector);
  v1.setMagnitude(tilesize);
  v0.add(v1);
  return [Math.floor(v0.x / tilesize), Math.floor(v0.y / tilesize)];
}
