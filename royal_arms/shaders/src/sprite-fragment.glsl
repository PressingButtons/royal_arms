precision mediump float;

varying vec2 v_texture;

uniform sampler2D imageTexture;
uniform vec2 u_sprite_factor;
uniform vec2 u_index;

void main( ) {
  vec2 pos = (v_texture * u_sprite_factor) + (u_index * u_sprite_factor);
  gl_FragColor = texture2D(imageTexture, pos);
}
