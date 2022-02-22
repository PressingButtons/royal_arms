export default function createTexture(gl, urlOrImage, repeat = false) {

  function texturize(image, repeat = false) {
    const texture = gl.createTexture( );
    gl.bindTexture(gl.TEXTURE_2D, texture);
      // Set the parameters so we can render any size image.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    if(repeat) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    // Upload the image into the texture.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    return {texture: texture, width: image.width, height: image.height}
  }

  if(urlOrImage instanceof HTMLImageElement || urlOrImage instanceof HTMLCanvasElement) return Promise.resolve(texturize(urlOrImage, repeat));
  else return Utils.load.image(urlOrImage).then(image => {
    return texturize(image, repeat)
  });
}
