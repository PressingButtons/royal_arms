export function load(type) {
  return utils.fetch.json(`./map/${type}.json`)
  .then(createTilemap)
}

function createTilemap(config) {
  const cmap = new CollisionMap(config);
  const
}
