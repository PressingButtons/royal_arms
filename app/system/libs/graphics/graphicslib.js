let gl;
let tiles
let tileShader;
let spriteShader;
let currentShader;

export async function init( ) {
  gl = Webutils.gl;
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  tiles = System.Cache.sprites.tiles;
  tileShader = await Webutils.compile('./shaders/tile.json');
  spriteShader = await Webutils.compile('./shaders/sprite.json');
}

export function drawWorld(world) {
  clear(0.1, 0.12, 0.18, 1);
  for(let i = 0; i < world.layers.length; i++) {
    drawLayer(selectShader(tileShader), world, i);
    if(world.objectLayer == i) {
      for(const object of world.objects) drawGameObject(selectShader(spriteShader), object, world.camera);
    }
  }
}

//
function clear(r = 0, g = 0, b = 0, a = 1) {
  gl.clearColor(r, g, b, a);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function selectShader(shader) {
  if(currentShader != shader) {
    currentShader = shader;
    gl.useProgram(shader.program);
  }
  return currentShader;
}

//drawing methods
export function drawLayer(shader, world, i) {
  const layer = world.layers[i];
  gl.bindBuffer(gl.ARRAY_BUFFER, layer.sprite.buffer);
  Webutils.enableVertexAttribute(shader.attributes.a_position, 2, gl.FLOAT, false, 4, 0);
  Webutils.enableVertexAttribute(shader.attributes.a_texture, 2, gl.FLOAT, false, 4, 2);
  gl.uniformMatrix4fv(shader.uniforms.u_camera_ortho, false, world.camera.ortho);
  gl.uniformMatrix4fv(shader.uniforms.u_camera_transform, false, world.camera.transform);
  gl.uniformMatrix4fv(shader.uniforms.u_layer_transform, false, layer.transform);
  gl.uniform2fv(shader.uniforms.u_inverse, tiles.inverse);
  gl.uniform1i(shader.uniforms.atlas, 0);
  gl.uniform1i(shader.uniforms.map, 1);
  Webutils.activateTexture(0, tiles.textureData.texture);
  Webutils.activateTexture(1, layer.sprite.textureData.texture);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

export function drawGameObject(shader, object, camera) {
  drawSprite(shader, object.sprite, object.index, object.transform, camera);
}


export function drawSprite(shader, sprite, i, spriteTransform, camera) {
  gl.bindBuffer(gl.ARRAY_BUFFER, sprite.buffer);
  Webutils.enableVertexAttribute(shader.attributes.a_position, 2, gl.FLOAT, false, 4, 0);
  Webutils.enableVertexAttribute(shader.attributes.a_texture, 2, gl.FLOAT, false, 4, 2);
  gl.uniformMatrix4fv(shader.uniforms.u_camera_ortho, false, camera.ortho);
  gl.uniformMatrix4fv(shader.uniforms.u_camera_transform, false, camera.transform);
  gl.uniformMatrix4fv(shader.uniforms.u_sprite_transform, false, spriteTransform);
  gl.uniform2fv(shader.uniforms.u_inverse, sprite.inverse);
  gl.uniform2fv(shader.uniforms.u_index, i);
  Webutils.activateTexture(0, sprite.textureData.texture);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
