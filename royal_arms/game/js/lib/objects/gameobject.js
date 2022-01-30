class GameObject extends EventTarget {

  x = 0;
  y = 0;

  constructor(sprite) {
    super( );
    this.sprite = sprite;
  }

  move(velocity, dt) {
    this.x += velocity.x * dt;
    this.y += velocity.y * dt;
  }

}
