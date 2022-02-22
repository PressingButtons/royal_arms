precision mediump float;

attribute vec2 a_position;
attribute vec2 a_texture;

uniform mat4 u_camera_transform;
uniform mat4 u_camera_ortho;
uniform mat4 u_layer_transform;

varying vec2 v_texture;
varying vec2 v_position;

void main( ) {
  v_texture = a_texture;
  v_position = a_position;
  vec4 position = u_camera_ortho * u_camera_transform * u_layer_transform * vec4(a_position, 0, 1);
  gl_Position = position;
}
