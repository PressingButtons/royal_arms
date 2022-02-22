import SlugBullet from '../../objects/slugbullet.js';

const c = { };

const spawn = (type, options) => {
  let cons = getConstructor(type);
  if(!cons) throw `Invalid type [${type}]`;
  let result = new cons(options);
  result.setPosition(options.x, options.y);
  return result;
}

export function create(type, x, y, options) {
  let config = {x: x, y: y};
  config = Object.assign(config, options);
  return spawn(type, config) || null;
}

const getConstructor = type => {
  switch(type) {
    case 'slugbullet': return SlugBullet;
  }
  return null;
}
