export function populateSprites(sprite) {
  const container = document.getElementById('tiles');
  for(let i = 0; i < sprite.frameCount; i++ ) {
    const frame = sprite.frame(i);
    container.append(frame);
    frame.addEventListener('click', ev => {
      document.querySelectorAll('#tiles canvas').forEach(tile => tile.classList.remove('selected'));
      frame.classList.add('selected');
      document.dispatchEvent(new CustomEvent('selecttile', {detail: {value: i, tile: frame}}));
    })
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
