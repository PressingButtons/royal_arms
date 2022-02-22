precision mediump float;

varying vec2 v_texture;

uniform sampler2D imageTexture;
uniform vec2 u_inverse;
uniform vec2 u_index;

void main( ) {
  vec2 pos = (v_texture * u_inverse) + (u_index * u_inverse);
  gl_FragColor = texture2D(imageTexture, pos);
}
