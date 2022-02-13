precision mediump float;

attribute vec2 a_position;
attribute vec2 a_texture;

uniform mat4 u_ortho_matrix;
uniform mat4 u_transform_matrix;
uniform mat4 u_map_trans_matrix;
uniform vec2 u_size;

varying vec2 v_texture;
varying vec2 v_position;

void main( ) {
  v_texture = a_texture;
  v_position = a_position;
  vec4 position = u_ortho_matrix * u_transform_matrix * vec4(a_position, 0, 1);
  gl_Position = position;
}
