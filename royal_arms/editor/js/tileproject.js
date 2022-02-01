const TileProject = function(width, height, tilesize, background = null) {
  this.background = background
  this.layers = [];
  this.width = width;
  this.height = height;
  this.rows = (height/tilesize) | 0
  this.cols = (width/tilesize) | 0
  this.addLayer( );
  this.tilesize = tilesize;
  document.addEventListener('plottile', this.handlePlot.bind(this));
}

TileProject.prototype.addLayer = function( ) {
  const layer = {
    canvas: generateCanvas(this.width, this.height),
    map: new Array(this.rows).fill(new Array(this.cols).fill(0))
  }
  this.layers.push(layer)
  document.dispatchEvent(new CustomEvent('newlayer', {detail: { layer: layer, index: this.layers.length - 1}}));
}

TileProject.prototype.load = function(config) {
  this.background = config.background;
  this.rows = config.rows;
  this.cols = config.cols;
  this.width = config.width;
  this.height = config.height;
  this.layers = config.layers.map(x => generateCanvas(x));
}

TileProject.prototype.export = function( ) {
  return {
    rows: this.rows,
    cols: this.cols,
    width: this.width,
    height: this.height,
    layers: this.layers.map(x => x.map),
    background: this.background,
  }
}

TileProject.prototype.plot = function(layerIndex, row, col, value) {
  this.layers[layerIndex].map[row][col] = value;
}

TileProject.prototype.drawTile = function(event) {
  const tile = event.detail.value.tile;
  const ctx  = event.detail.data.layer.canvas.ctx;
  const x = event.detail.pos.col * this.tilesize;
  const y = event.detail.pos.row * this.tilesize;
  ctx.clearRect(x, y, this.tilesize, this.tilesize);
  ctx.drawImage(tile, x, y);
}

TileProject.prototype.handlePlot = function(event) {
  if(event.detail.value) {
    const pos = event.detail.pos;
    const map = event.detail.data.layer.map;
    map[pos.row][pos.col] = event.detail.value.value;
    this.drawTile(event);
  }
}



export default TileProject
