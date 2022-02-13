export default class RenderEngine {

  #webutils;
  #tileShader;
  #spriteShader;
  #genericTexture;
  #currentShader;

  constructor(webutils) {
    this.#webutils = webutils;
    this.#webutils.gl.enable(this.#webutils.gl.BLEND);
    this.#webutils.gl.blendFunc(this.#webutils.gl.SRC_ALPHA, this.#webutils.gl.ONE_MINUS_SRC_ALPHA);
  }

  //private
  #selectShader(shader) {
    if(this.#currentShader != shader) {
      this.#currentShader = shader;
      this.#webutils.gl.useProgram(shader.program);
    }
    return shader;
  }

  //public
  async init( ) {
    this.#tileShader = await this.#webutils.compile('./shaders/tile.json');
    this.#genericTexture = await this.#webutils.compile('./shaders/generic-texture.json');
    this.#spriteShader = await this.#webutils.compile('./shaders/sprite.json');
  }

  setViewPort(x, y, w, h) {
    this.#webutils.gl.viewport(x, y, w, h);
  }

  clear(r, g, b, a) {
    this.#webutils.gl.clearColor(r, g, b, a);
    this.#webutils.gl.clear(this.#webutils.gl.COLOR_BUFFER_BIT);
  }

  drawLayer(atlas, map, transform, ortho) {
    const gl = this.#webutils.gl;
    const shader = this.#selectShader(this.#tileShader);
    gl.bindBuffer(gl.ARRAY_BUFFER, map.buffer);
    this.#webutils.enableVertexAttrib(shader.attributes.a_position, 2, gl.FLOAT, false, 4, 0);
    this.#webutils.enableVertexAttrib(shader.attributes.a_texture,  2, gl.Float, false, 4, 2);
    gl.uniformMatrix4fv(shader.uniforms.u_ortho_matrix, false, ortho);
    gl.uniformMatrix4fv(shader.uniforms.u_transform_matrix, false, transform);
    gl.uniform2fv(shader.uniforms.u_size, map.size);
    gl.uniform2fv(shader.uniforms.u_tile_factor, atlas.sf);
    gl.uniform2fv(shader.uniforms.u_map_factor, map.sf);
    gl.uniform1i(shader.uniforms.atlas, 0);
    gl.uniform1i(shader.uniforms.map, 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, atlas.texture);
    gl.activeTexture(gl.TEXTURE0 + 1);
    gl.bindTexture(gl.TEXTURE_2D, map.texture);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  drawGenericTexture(buffer, texture, transform, ortho) {
    const gl = this.#webutils.gl;
    const shader = this.#selectShader(this.#genericTexture);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    this.#webutils.enableVertexAttrib(shader.attributes.a_position, 2, gl.FLOAT, false, 4, 0);
    this.#webutils.enableVertexAttrib(shader.attributes.a_texture, 2, gl.FLOAT, false, 4, 2);
    gl.uniformMatrix4fv(shader.uniforms.u_transform_matrix, false, transform);
    gl.uniformMatrix4fv(shader.uniforms.u_ortho_matrix, false, ortho);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  drawSprite(sprite, transform, ortho, index) {
    const gl = this.#webutils.gl;
    const shader = this.#selectShader(this.#spriteShader);
    gl.bindBuffer(gl.ARRAY_BUFFER, sprite.buffer);
    this.#webutils.enableVertexAttrib(shader.attributes.a_position, 2, gl.FLOAT, false, 4, 0);
    this.#webutils.enableVertexAttrib(shader.attributes.a_texture, 2, gl.FLOAT, false, 4, 2);
    gl.uniformMatrix4fv(shader.uniforms.u_transform_matrix, false, transform);
    gl.uniformMatrix4fv(shader.uniforms.u_ortho_matrix, false, ortho);
    gl.uniform2fv(shader.uniforms.u_sprite_factor, sprite.sf);
    gl.uniform2fv(shader.uniforms.u_index, index);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sprite.texture);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  drawSpriteL(sprite, transform, ortho) {

  }

}
