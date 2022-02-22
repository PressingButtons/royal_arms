export default class RenderEngine {

  #tile_shader;
  #gl;

  constructor(gl, tile_program) {
    this.#gl = gl;
    this.#initTileShader(tile_program);
  }

  #initTileShader(tile_program) {
    this.#tile_shader = {
      program: tile_program,
      attributes: {
        position: getAttribLocation(tile_program, 'position');
      },
      uniforms: {

      }
    }
  }

  drawTileLayer(layer, tilesheet, gl = this.#gl) {
    gl.bindBuffer(gl.ARRAY_BUFFER, layer.quad);
    gl.enableVerte

  }

}
