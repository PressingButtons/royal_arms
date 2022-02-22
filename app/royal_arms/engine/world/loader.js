export function loadNative (type, sprites) {
  return fetchJSON(`./levels/${type}.json`)
  .then(json => construct(json, sprites))
}

export function construct(json, sprites) {
  return {
    collision: sprites[json.tilemap.collision],
    layers: json.tilemap.layers.map(name => sprites[name]),
    meta: json.meta
  }
}
