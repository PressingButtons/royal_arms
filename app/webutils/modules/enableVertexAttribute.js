export default function(gl, attribute, size, type, normalized, stride, offset) {
  gl.enableVertexAttribArray(attribute);
  const length = getLength(type);
  gl.vertexAttribPointer(attribute, size, type, normalized, stride * length, offset * length)
}

function getLength(type) {
  switch(type) {
    case 5126: return Float32Array.BYTES_PER_ELEMENT;
  }
}
