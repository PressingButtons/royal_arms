export default async function (engine, dir, tilesize = 16) {

  let config = await fetchJSON('./assets/config.json');

  let sprites = { };

  for(const name in config) {
    let data = config[name];
    const url = dir + name + '.webp';
    if(data.type == 'img') sprites[name] = await loadCanvas(url).then(c => {return c.canvas});
    else if(data.type == 'sprite') sprites[name] = await loadSprite(url, engine, data)
    else if(data.type == 'layer') sprites[name] = await loadLayer(url, engine, tilesize);
  }

  return sprites;

}

function loadSprite(url, engine, data ) {
  return engine.utils.createTexture(url).then(texture => {
    let w = data ? data.w : null;
    let h = data ? data.h : null;
    return engine.sprite.create(texture, w, h);
  })
}

function loadLayer(url, engine, tilesize) {
  return engine.utils.createTexture(url).then(texture => {
    return engine.sprite.createLayer(texture, tilesize)
  })
}
