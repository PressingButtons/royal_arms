export default function(engine) {

  const loadSprite = { };

  loadSprite.dummy = ( ) => {
    return engine.utils.createTexture('./assets/sprites/dummy.webp')
    .then()
  }

  return {
    create: function(type) {return loadSprite[type.toLowerCase( )]( )}
  }

}
