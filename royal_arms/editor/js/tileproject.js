const TileProject = function(width, height, tilesize, background = null) {
  this.background = background
  this.layers = [];
  this.width = width;
  this.height = height;
  this.rows = (height/tilesize) | 0
  this.cols = (width/tilesize) | 0
  this.addLayer( );
  document.addEventListener('plottile', this.handlePlot);
}

TileProject.prototype.addLayer = function( ) {
  const layer = {
    canvas: generateCanvas(this.width, this.height),
    map: new Array(this.rows).fill(new Array(this.cols).fill(0))
  }
  this.layers.push(layer)
  document.dispatchEvent(new CustomEvent('newlayer', {detail: {layer: layer, index: layer.length - 1}}));
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

TileProject.prototype.handlePlot = function(event) {
  console.log(event.detail);
}

export default TileProject
