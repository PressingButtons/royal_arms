import StampTool from './tools/stamp/stampmachine.js';

export default function(container, tilesize) {

  const main = container.querySelector('#main');
  const plot = container.querySelector('#plot');
  const cam  = container.querySelector('#cameraRect');
  const listener = container.querySelector('#listener');
  const stamp = new StampTool(listener);

  let currentTile, currentLayer;

  plot.width = 16;
  plot.height = 16;

  function handleMouseMove(event) {
    const pos = relativeMousePosition(event);
    moveCursor(pos);
    stamp.update(pos);
  }

  function handleStamp(event) {
    document.dispatchEvent(new CustomEvent('plottile', {detail: {
      value: currentTile,
      layer: currentLayer
    }}))
  }

  function loadProject(project) {
    resize(project.width, project.height);
  }

  function moveCursor(pos) {
    const x = ((pos.x / tilesize) | 0) * tilesize;
    const y = ((pos.y / tilesize) | 0) * tilesize;
    plot.style.top = y + 'px';
    plot.style.left = x + 'px';
  }

  listener.onmousemove = handleMouseMove;

  const resize = (w, h) => {
    main.width = w
    main.height = h;
  }

  document.addEventListener('selecttile', event => {
    currentTile = event.detail;
    plot.getContext('2d').globalAlpha = 0.4;
    plot.getContext('2d').clearRect(0, 0, tilesize, tilesize);
    plot.getContext('2d').drawImage(currentTile.tile, 0, 0);
  });

  const selectLayer = event => {
    currentLayer = event.detail;
  }


  document.addEventListener('newlayer', selectLayer);
  document.addEventListener('selectlayer', selectLayer);
  document.addEventListener('stamp', handleStamp);

  return {
    loadProject: loadProject
  }

}
