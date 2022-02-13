export default class WebGLUtils {

  #gl

  constructor(gl) {
    this.#gl = gl;
  }

  get gl( ) {return this.#gl}

  // Private Methods
  #compileShaderProgram(vertex, fragment, attributes, uniforms) {
    return new Promise(function(resolve, reject) {
      try {
        const vertexShader = this.#createShader(vertex, this.#gl.VERTEX_SHADER);
        const fragmentShader = this.#createShader(fragment, this.#gl.FRAGMENT_SHADER);
        resolve(this.#linkPrograms(vertexShader, fragmentShader));
      } catch(err) {
        reject(err);
      }
    }.bind(this));
  }

  #createShader(source, type) {
    const shader = this.#gl.createShader(type);
    this.#gl.shaderSource(shader, source);
    this.#gl.compileShader(shader);
    if(!this.gl.getShaderParameter(shader, this.#gl.COMPILE_STATUS)) {
      throw `Error, could not compile shader [${type}].\n\n${this.#gl.getShaderInfoLog(shader)}`;
    }
    return shader;
  }

  #linkPrograms(vertexShader, fragmentShader) {
    const program = this.#gl.createProgram( );
    this.#gl.attachShader(program, vertexShader);
    this.#gl.attachShader(program, fragmentShader);
    this.#gl.linkProgram(program);
    if(this.#gl.getProgramParameter(program, this.#gl.LINK_STATUS)) return program;
    const err = this.#gl.getProgramInfoLog(program);
    this.#gl.deleteProgram(program);
    console.log(err)
    throw err;
  }
  // Public Methods

  createTexture(image) {
    const gl = this.#gl;
    const texture = gl.createTexture( );
    gl.bindTexture(gl.TEXTURE_2D, texture);
      // Set the parameters so we can render any size image.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    // Upload the image into the texture.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    return {texture: texture, width: image.width, height: image.height}
  }

  compileProgram(vertex, fragment) {
    return this.#compileShaderProgram(vertex, fragment).catch(err => console.log(err))
  }

}
