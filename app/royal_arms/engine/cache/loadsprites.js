export default async function( ) {
  const detail = await Utils.fetch.json('./assets/config.json');
  const sprites = { };
  for(const name in detail) sprites[name] = await loadSprite(name, detail[name]);
  return sprites;
}

async function loadSprite(name, data) {
  const url = `./assets/sprites/${name}.webp`
  if(data.type == 'sprite')
    return GameLib.sprite.load(url, data.w, data.h);
  if(data.type == 'layer') {
    return GameLib.sprite.load(url, null, null, 16);
  } else {
    return GameLib.sprite.load(url);
  }
}
