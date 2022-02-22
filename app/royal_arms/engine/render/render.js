export default class RenderEngine {

  #utils;
  #tileShader;
  #spriteShader;
  #genericTexture;
  #currentShader;

  constructor(webutils) {
    this.#utils = webutils;
    this.#utils.gl.enable(this.#utils.gl.BLEND);
    this.#utils.gl.blendFunc(this.#utils.gl.SRC_ALPHA, this.#utils.gl.ONE_MINUS_SRC_ALPHA);
  }

  //private
  #selectShader(shader) {
    if(this.#currentShader != shader) {
      this.#currentShader = shader;
      this.#utils.gl.useProgram(shader.program);
    }
    return shader;
  }

  //public
  async init( ) {
    this.#tileShader = await this.#utils.compile('./shaders/tile.json');
    this.#genericTexture = await this.#utils.compile('./shaders/generic-texture.json');
    this.#spriteShader = await this.#utils.compile('./shaders/sprite.json');
  }

  setViewPort(x, y, w, h) {
    this.#utils.gl.viewport(x, y, w, h);
  }

  clear(r, g, b, a) {
    this.#utils.gl.clearColor(r, g, b, a);
    this.#utils.gl.clear(this.#utils.gl.COLOR_BUFFER_BIT);
  }

  drawEntity(e, world) {
    this.drawSprite(e.sprite, e.currentFrameIndex, e.transform(world), world.camera);
  }

  drawLayer(atlas, layer, camera) {
    const gl = this.#utils.gl;
    const shader = this.#selectShader(this.#tileShader);
    gl.bindBuffer(gl.ARRAY_BUFFER, layer.src.buffer);
    this.#utils.enableVertexAttrib(shader.attributes.a_position, 2, gl.FLOAT, false, 4, 0);
    this.#utils.enableVertexAttrib(shader.attributes.a_texture,  2, gl.Float, false, 4, 2);
    gl.uniformMatrix4fv(shader.uniforms.u_camera_ortho, false, camera.ortho);
    gl.uniformMatrix4fv(shader.uniforms.u_camera_transform, false, camera.transform);
    gl.uniformMatrix4fv(shader.uniforms.u_layer_transform, false, layer.transform);
    gl.uniform2fv(shader.uniforms.u_tile_factor, atlas.sf);
    gl.uniform1i(shader.uniforms.atlas, 0);
    gl.uniform1i(shader.uniforms.map, 1);
    this.#utils.activateTexture(0, atlas.texture);
    this.#utils.activateTexture(1, layer.src.texture);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  drawGenericTexture(buffer, texture, transform, ortho) {
    const gl = this.#utils.gl;
    const shader = this.#selectShader(this.#genericTexture);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    this.#utils.enableVertexAttrib(shader.attributes.a_position, 2, gl.FLOAT, false, 4, 0);
    this.#utils.enableVertexAttrib(shader.attributes.a_texture, 2, gl.FLOAT, false, 4, 2);
    gl.uniformMatrix4fv(shader.uniforms.u_transform_matrix, false, transform);
    gl.uniformMatrix4fv(shader.uniforms.u_ortho_matrix, false, ortho);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  drawSprite(sprite, spriteIndex, spriteTransform, camera) {
    const gl = this.#utils.gl;
    const shader = this.#selectShader(this.#spriteShader);
    gl.bindBuffer(gl.ARRAY_BUFFER, sprite.buffer);
    this.#utils.enableVertexAttrib(shader.attributes.a_position, 2, gl.FLOAT, false, 4, 0);
    this.#utils.enableVertexAttrib(shader.attributes.a_texture, 2, gl.FLOAT, false, 4, 2);
    gl.uniformMatrix4fv(shader.uniforms.u_sprite_transform, false, spriteTransform);
    gl.uniformMatrix4fv(shader.uniforms.u_camera_transform, false, camera.transform);
    gl.uniformMatrix4fv(shader.uniforms.u_camera_ortho, false, camera.ortho);
    gl.uniform2fv(shader.uniforms.u_sprite_factor, sprite.sf);
    gl.uniform2fv(shader.uniforms.u_index, spriteIndex);
    this.#utils.activateTexture(0, sprite.texture);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  drawSpriteO(sprite, transform, ortho, index) {
    const gl = this.#utils.gl;
    const shader = this.#selectShader(this.#spriteShader);
    gl.bindBuffer(gl.ARRAY_BUFFER, sprite.buffer);
    this.#utils.enableVertexAttrib(shader.attributes.a_position, 2, gl.FLOAT, false, 4, 0);
    this.#utils.enableVertexAttrib(shader.attributes.a_texture, 2, gl.FLOAT, false, 4, 2);
    gl.uniformMatrix4fv(shader.uniforms.u_transform_matrix, false, transform);
    gl.uniformMatrix4fv(shader.uniforms.u_ortho_matrix, false, ortho);
    gl.uniform2fv(shader.uniforms.u_sprite_factor, sprite.sf);
    gl.uniform2fv(shader.uniforms.u_index, index);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sprite.texture);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  drawWorld(world, atlas) {
    const renderInfo = world.renderList( );
    let entitiesDrawn = false;
    for(let i = 0; i < renderInfo.tilemap.layers.length; i++) {
      const layer = renderInfo.tilemap.layers[i];
      this.drawLayer(atlas, layer, world.camera);
      if(i == renderInfo.e_index) {
        entitiesDrawn = true;
        for(const entity of renderInfo.entities) this.drawEntity(entity, world);
      }
      if(!entitiesDrawn)
        for(const entity of renderInfo.entities) this.drawEntity(entity, world);
    }
  }

}
