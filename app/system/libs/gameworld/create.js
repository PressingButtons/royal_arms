import World from '../../machines/world/world.js';
import WorldLayer from './layer.js';

export default function create(key) {
  return loadConfig(key).then(build)
}

function loadConfig(key) {
  return Utils.fetch.json(`./map/${key}.json`);
}

function build(config) {
  config.tilemap.layers = makeLayers(config.tilemap.layers);
  config.tilemap.collision = System.Cache.images[config.tilemap.collision];
  return new World(config);
}

function makeLayers(layers) {
  return layers.map(data => new WorldLayer(data));
}
