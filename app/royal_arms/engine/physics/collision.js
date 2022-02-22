export function AABB(a, b) {
  return (
    a.left < b.right &&
    a.right > b.left &&
    a.top < b.bottom &&
    a.bottom > b.top
  );
}

export function boxCollision(a, b) {
  if(!AABB(a, b)) return null;
  let x1, y1, x2, y2
  if(a.left < b.left) {
    x1 = b.left;
    x2 = a.right;
  } else {
    x1 = a.left;
    x2 = b.right;
  }
  if(a.top < b.top) {
    y1 = a.top;
    y2 = b.bottom;
  } else {
    y1 = b.top;
    y2 = a.bottom;
  }
  return {
    x: x1, y: y1, w: x2 - x1, h: y2 - y1
  }
}
