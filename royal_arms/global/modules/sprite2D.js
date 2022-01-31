export default function Sprite2D ( ) {

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
    get frameCount( ) {return frames.length},
    frame: getFrame
  }

}

const cacheFrames = (image, fW, fH) => {
  let frames = [];
  const rows = (image.height/fH) | 0;
  const cols = (image.width/fW) | 0;
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      const frame = generateCanvas(fW, fH);
      let x = j * fW, y = i * fH;
      frame.ctx.drawImage(image, x, y, fW, fH, 0, 0, fW, fH);
      frames.push(frame.canvas);
    }
  }
  return frames;
}
