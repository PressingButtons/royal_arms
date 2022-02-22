import compileShader from './modules/shadercompiler.js';
import createTexture from './modules/createtexture.js';
import createBuffer from './modules/createbuffer.js';
import enableVA from './modules/enableVertexAttribute.js';
import activateTexture from './modules/activatetexture.js';

window.initWebutils = function(gl) {

  window.Webutils = {
    get gl( ) {return gl},
  };

  return Object.defineProperties(window.Webutils, {
    activateTexture: {
      value: function(i, texture) {
        return activateTexture(gl, i, texture)
      }
    },
    compile: {
      value: function(url) {
        return compileShader(gl, url);
      }
    },
    createTexture: {
      value: function(url) {
        return createTexture(gl, url);
      }
    },
    createBuffer: {
      value: function(data, usage = gl.STATIC_DRAW) {
        return createBuffer(gl, data, usage);
      }
    },
    enableVertexAttribute: {
      value: function(attribute, size, type = gl.FLOAT, normalized = false, stride = 0, offset = 0 ) {
        enableVA(gl, attribute, size, type, normalized, stride, offset);
      }
    }
  })

}
