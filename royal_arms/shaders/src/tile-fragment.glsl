precision mediump float;

varying vec2 v_texture;
varying vec2 v_position;

uniform sampler2D atlas;
uniform sampler2D map;

uniform vec2 u_tile_factor;


void main( ) {
  vec2 index = floor(texture2D(map, v_texture).xy * 256.0);
  vec2 start = index * u_tile_factor;
  vec2 tile_offset = (mod(floor(v_position), 16.0) / 16.0) * u_tile_factor;
  vec2 pos = start + tile_offset;
  gl_FragColor = texture2D(atlas, pos);
  if(index.x == 0.0) gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
}
