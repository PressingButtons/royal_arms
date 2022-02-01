let canvas, aspect;

export function setScreen(_canvas) {
  canvas = _canvas;
}

export function setResolution(w, h) {
  if(canvas) {
    canvas.width = w;
    canvas.height = h;
    aspect = w/h;
  }
}
