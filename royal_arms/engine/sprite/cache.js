export default function(engine) {

  const cache = { };

  function loadSprite(type) {
    type = type.toLowerCase();
    return engine.utils.createTexture(`./assets/sprites/${type}.webp`)
    .then(engine.spritelib.create).then(sprite => {cache[`${type}`] = sprite})
    .catch(err => {return err});
  };


  return {
    get cache( ) {return Object.assign({}, cache)},
    load: function(type) {
      return loadSprite(type);
    },
    release: function( ) {
      for(const i in cache) delete cache[i];
    },
    preload: function(...list) {
      list = [].concat.apply([], list);
      const promises = list.map(i => loadSprite(i));
      return Promise.all(promises);
    }
  }

}
