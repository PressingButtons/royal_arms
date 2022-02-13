import StampTool from './tools/stamp/stamp.js';

export default function(container, tilesize) {

  const main = container.querySelector('#main');
  const plot = container.querySelector('#plot');
  const cam  = container.querySelector('#cameraRect');
  const layers = container.querySelector('#canvasLayers');
  const listener = container.querySelector('#listener');
  const stamp = new StampTool(listener);

  let currentTile, currentLayer, collisionLayer;
  let zoomValue = 1;

  plot.width = 16;
  plot.height = 16;

  function convertToTilePosition(pos) {
    const row = (pos.y / tilesize) | 0;
    const col = (pos.x / tilesize) | 0;
    return {row: row, col: col};
  }

  function handleMouse(event) {
    const pos = relativeMousePosition(event);
    pos.x /= zoomValue;
    pos.y /= zoomValue;
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
      tile: currentTile,
      layer: currentLayer,
      pos: event.detail
    }}))
  }

  function handleZoom(event) {
    if(event.type == 'wheel') {
      event.preventDefault( );
      if(event.deltaY < 0) zoomValue += 0.01;
      else zoomValue -= 0.01
    } else {
      if(event.key.toLowerCase() == 'z') zoomValue = 1;
    }
    container.style.transform = `scale(${zoomValue})`
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

  function setCurrentTile(type, value, graphic) {
    currentTile = {type: type, value: value, graphic: graphic};
    updateStampGraphic(graphic);
  }

  function updateStampGraphic(graphic) {
    plot.getContext('2d').globalAlpha = 0.4;
    plot.getContext('2d').clearRect(0, 0, tilesize, tilesize);
    plot.getContext('2d').drawImage(graphic, 0, 0);
  }

  listener.onmousemove = handleMouse;
  listener.onmousedown = handleMouse;

  const resize = (w, h) => {
    main.width = w
    main.height = h;
  }

  const selectLayer = event => {
    currentLayer = event.detail;
  }


  document.addEventListener('newlayer', handleNewLayer);
  document.addEventListener('selectlayer', selectLayer);
  document.addEventListener('stamp', handleStamp);
  container.addEventListener('wheel', handleZoom);
  document.addEventListener('keyup', handleZoom);

  return {
    loadProject: loadProject,
    setCurrentTile: setCurrentTile,
  }

}
