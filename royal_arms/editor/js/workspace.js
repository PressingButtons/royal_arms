import StampTool from './tools/stamp/stampmachine.js';

export default function(container, tilesize) {

  const main = container.querySelector('#main');
  const plot = container.querySelector('#plot');
  const cam  = container.querySelector('#cameraRect');
  const layers = container.querySelector('#canvasLayers');
  const listener = container.querySelector('#listener');
  const stamp = new StampTool(listener);

  let currentTile, currentLayer;

  plot.width = 16;
  plot.height = 16;

  function convertToTilePosition(pos) {
    const row = (pos.y / tilesize) | 0;
    const col = (pos.x / tilesize) | 0;
    return {row: row, col: col};
  }

  function handleMouse(event) {
    const pos = relativeMousePosition(event);
    const tilepos = convertToTilePosition(pos);
    if(event.type == 'mousedown') handleMouseDown(event, pos, tilepos);
    if(event.type =='mousemove')  handleMouseMove(event, pos, tilepos);
  }

  function handleMouseDown(event, pos, tilepos) {
    stamp.update(tilepos);
  }

  function handleMouseMove(event, pos, tilepos) {
    moveCursor(pos);
    stamp.update(tilepos);
  }

  function handleNewLayer(event) {
    selectLayer(event);
    layers.append(event.detail.layer.canvas.canvas);
  }

  function handleStamp(event) {
    document.dispatchEvent(new CustomEvent('plottile', {detail: {
      value: currentTile,
      data: currentLayer,
      pos: event.detail
    }}))
  }

  function loadProject(project) {
    resize(project.width, project.height);
  }

  function moveCursor(pos) {
    const col = ((pos.x / tilesize) | 0);
    const row = ((pos.y / tilesize) | 0);

    stamp.update({row: row, col: col});
    plot.style.top = row * tilesize + 'px';
    plot.style.left = col * tilesize + 'px';
  }

  function updateStamp(pos) {
    const col = (pos.x / tilesize) | 0;
    const row = (pos.y / tilesize) | 0;
  }

  listener.onmousemove = handleMouse;
  listener.onmousedown = handleMouse;

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


  document.addEventListener('newlayer', handleNewLayer);
  document.addEventListener('selectlayer', selectLayer);
  document.addEventListener('stamp', handleStamp);

  return {
    loadProject: loadProject
  }

}
