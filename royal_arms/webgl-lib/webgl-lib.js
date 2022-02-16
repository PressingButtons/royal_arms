import compileShader from './modules/shadercompiler.js';
import createTexture from './modules/createtexture.js';
import createBuffer from './modules/createbuffer.js';
import enableVA from './modules/enableVertexAttribute.js';
import activateTexture from './modules/activatetexture.js';

export default (function(gl) {

  function _createBuffer(data, usage = gl.STATIC_DRAW) {
    usage = typeof usage === 'string' ? gl[usage.toUpperCase()] : usage;
    return createBuffer(gl, data, usage);
  }

  return {
    get gl( ) {return gl},
    activateTexture: function(i, texture) {return activateTexture(gl, i, texture)},
    compile: function(url) {return compileShader(gl, url)},
    createTexture: function(url) {return createTexture(gl, url)},
    createBuffer: _createBuffer,
    enableVertexAttrib: function(attribute, size, type = gl.FLOAT, normalized = false, stride = 0, offset = 0) {
      enableVA(gl, attribute, size, type, normalized, stride, offset);
    }
  }

});
