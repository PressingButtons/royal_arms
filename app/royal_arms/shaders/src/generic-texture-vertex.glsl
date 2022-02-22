attribute vec2 a_position;
attribute vec2 a_texture;

uniform mat4 u_ortho_matrix;
uniform mat4 u_transform_matrix;

varying vec2 v_texture;

void main( ) {
  vec4 position = u_ortho_matrix * (u_transform_matrix * vec4(a_position, 0, 1));
  gl_Position = position;
  v_texture = a_texture;
}
