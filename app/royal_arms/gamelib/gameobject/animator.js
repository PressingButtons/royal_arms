export default class Animator {

  #animations;
  #currentAnimation;
  #currentIndex;
  #currentTime;
  #host;

  constructor(host, animations = null) {
    this.#host = host;
    this.#animations = animations;
    this.#currentIndex = 0;
  }

  get current( ) {
    return Object.assign({index: this.#currentIndex, time: this.#currentTime}, this.#currentAnimation);
  }

  get currentIndex( ) {
    return this.#currentIndex;
  }

  #updateAnimation(animation, dt) {
    this.#currentTime += dt;
    let pair = animation.slice(this.#currentIndex, this.#currentIndex + 1);
    if(this.#currentTime >= pair[1]) {
      this.#currentIndex++;
      this.#currentTime = 0;
    }
    if(this.#currentIndex > (animation.length / 2) | 0)  {
      this.#currentIndex = 0;
      this.#currentTime = 0;
      if(this.onAnimationEnd) this.onAnimationEnd(this.#host);
    }
  }

  play(animation_name, start = 0) {
    const animation = this.#animations[animation_name];
    if(!animation) throw 'Animator.play - No such animation labeled: ' + animation_name;
    this.#currentAnimation = {name: animation_name, animation: animation};
    this.#currentIndex = start;
    this.#currentTime = 0;
  }

  goToAndStop(index) {
    this.currentAnimation = null;
    this.#currentTime = 0;
    this.#currentIndex = index;
  }

  update(dt) {
    if(this.#currentAnimation) this.#updateAnimation(this.#currentAnimation.animation, dt);
    else {
      this.#currentTime = 0;
      this.#currentIndex = 0;
    }
  }

  configure(animations) {
    this.#animations = animations;
  }

}
