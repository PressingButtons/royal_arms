const Sprite2D = function( ) {

  let image, frames, width, height, frameWidth, frameHeight;

  const load = (img, fW, fH) => {
    image = img;
    frameWidth = fW;
    frameHeight = fH;
    frames = cacheFrames(img, fW, fH);
  }

  const getFrame = (num) => {
    return frames[num] || null;
  }

  return {
    load: load,
    get width( ) {return width},
    get height( ) {return height},
    get frameHeight( ) {return frameHeight},
    get frameWidth( ) {return frameWidth},
    get src( ) {return image},
    frame: getFrame
  }

}

const cacheFrames = (image, fW, fH) => {
  let frames = [];
  const rows = (image.height/fH) | 0;
  const cols = (image.rows/fW) | 0;
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      const frame = document.createElement('canvas');
      frame.width = fW;
      frame.height = fH;
      frame.getContext('2d').imageSmoothingEnabled = false;
      let x = j * fW, y = i * fH;
      frame.getContext('2d').drawImage(image, x, y, fW, fH, 0, 0, fW, fH);
      frames.push(frame);
    }
  }
  return frames;
}
