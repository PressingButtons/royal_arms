precision mediump float;

varying vec2 v_texture;

uniform sampler2D imageTexture;

void main( ) {
  gl_FragColor = texture2D(imageTexture, v_texture);
}
