export default function(gl, data, usage) {
  usage = typeof usage === 'string' ? gl[usage.toUpperCase()] : usage;
  const buffer = gl.createBuffer( );
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, usage);
  return buffer;
}
