function hiliteSelection(event) {
  for(const tile of document.querySelectorAll('#tiles canvas')) tile.classList.remove('selected');
  this.classList.add('selected');
}

function broadcastSelection(type, index) {
  document.dispatchEvent(new CustomEvent('tileselection', {detail: {type: type, index: index}}));
}

export function populateTiles(mapbuilder) {
  for(let i = 0; i < mapbuilder.tiles.length; i++ ) {
    const tile = mapbuilder.tiles[i];
    if(i == 0) {
      document.querySelector('#uTiles').append(tile);
      tile.addEventListener('click', function(event){broadcastSelection('utility', i)});
    }
    else if(i > 0 && i < 14) {
      document.querySelector('#cTiles').append(tile);
      tile.addEventListener('click', function(event) {broadcastSelection('collision', i)});
    }
    else {
      document.querySelector('#gTiles').append(tile);
      tile.addEventListener('click', function(event) {broadcastSelection('graphic', i)});
    }
    tile.addEventListener('click', hiliteSelection);
  }
}

export function loadLayer(layer) {
  const list = document.getElementById('layerlist');
  const div = createListEntry(layer);
  list.append(div)
}

const createListEntry = source => {
  const div = generateElement('div', {classes: ['layer container flex']});
  div.innerHTML = `
    <canvas></canvas>
    <div class="flex col">
      <p>Layer ${source.layer.index}</p>
      <p>${source.layer.map.length} x ${source.layer.map[0].length}</p>
    </div>
  `
  return div;
}
