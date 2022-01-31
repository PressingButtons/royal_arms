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

}
