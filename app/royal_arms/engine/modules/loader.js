export function loadWorldConfig(type) {
  const jsonURL = `./assets/levels/${type}.json`;
  return fetchJSON(jsonURL).then(async (config) => {
    config.tilemap.collision = await loadCanvas(config.tilemap.collision).then( x => x.canvas);
    config.tilemap.layers = await Promise.all(config.tilemap.layers.map(x => loadImage(x)));
    Object.assign(config.meta, {w: 384, h: 240});
    return config;
  })
}
