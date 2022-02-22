export default function preload( ) {
  return new Promise(async function(resolve, reject) {
    const config = await Utils.fetch.json('./graphics/$config.json');
    const graphics = await loadGraphics(config);
    const pkg = {graphics: graphics}
    resolve(pkg);
  });
}

function loadGraphics(config) {
  return new Promise(async function(resolve, reject) {
    const sprites = await loadSprites(config.sprites);
    const images = await loadImages(config.images);
    const maps = await loadMaps(config.maps);
    resolve({sprites: sprites, images: images, maps: maps});
  });
}


function loadImages(config) {
  const images = { };
  return new Promise(async function(resolve, reject) {
    for(const key of config) {
      images[key] = await Utils.load.image(`./graphics/${key}.webp`);
    }
    resolve(images);
  });
}

function loadMaps(config) {
  const maps = { };
  return new Promise(async function(resolve, reject) {
    for(const key of config) {
      maps[key] = await System.sprite.load(key, "tilemap");
    }
    resolve(maps);
  });
}

function loadSprites(config) {
  const sprites = { };
  return new Promise(async function(resolve, reject) {
    for(const key in config)
      sprites[key] = await System.sprite.load(key, config[key]);
    resolve(sprites);
  });

}
