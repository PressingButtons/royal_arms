export default class {
  #sprite;
  #config;
  constructor(config) {
    this.#sprite = System.Cache.maps[config.sprite];
    this.#config = config;
    this.x = 0;
    this.y = 0;
  }

  get sprite( ) {return this.#sprite};

  get transform( ) {
    return glMatrix.mat4.fromTranslation(glMatrix.mat4.create( ), [this.x, this.y, 0]);
  }

}
