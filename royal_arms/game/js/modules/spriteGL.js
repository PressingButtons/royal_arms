const SpriteGL = function(gl) {

  let texture;
  let frames;
  let width;
  let height;
  let frameWidth;
  let frameHeight;

  const load = (image, fH, fW) => {
    texture = cacheTexture(image);
    frames  = cacheFrames(image.width, image.height, fW, fH);
    width   = image.width;
    height  = image.height;
    frameWidth = fW;
    frameHeight = fH;
  }

  const getFrame = (index) => {
    return frames[index] || null;
  }

  return {
    load: load,
    get width( ) {return width},
    get height( ) {return height},
    get frameHeight( ) {return frameHeight},
    get frameWidth( ) {return frameWidth},
    get texture( ) {return texture},
    frame: getFrame
  }

}


//outside methods
const cacheTexture = (gl, image) => {
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Set the parameters so we can render any size image.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  // Upload the image into the texture.
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  return texture;
}

const cacheFrames = (iW, iH, fW, fH) => {
  let frames = [];
  const rows = (iH/fH) | 0;
  const cols = (iW/fW) | 0;
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      //time to make some triangles
      let x1 = j * fW,
          y1 = i * fH,
          x2 = x1 + fW,
          y2 = y1 + fH;
      frames.push(new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y2,
        x2, y1
      ]));
    }
  }
  return frames;
}

export default SpriteGL;
