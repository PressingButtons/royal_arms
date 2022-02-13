window.generateElement = (type, properties = {}) => {
  const element = document.createElement(type);

  for(const attribute in properties.attributes) {
    element[attribute] = properties.attributes[attribute];
  }
  for(const styleName in properties.css) {
    element.style[styleName] = properties.css[styleName];
  }
  for(const className in properties.classes) {
    const list = properties.classes[className].split(' ');
    list.forEach(name => element.classList.add(name));
  }
  return element;
}

window.generateCanvas = (...parms) => {
  if(parms[0] instanceof HTMLCanvasElement) {
    if(parms[1] && parms[1] == 'webgl') {
      let gl = parms[0].getContext('webgl', (parms[2] || {}));
      return {canvas: parms[0], gl: gl};
    } {
      let ctx = parms[0].getContext('2d', (parms[2] || {}));
      return {canvas: parms[0], ctx: ctx}
    }
  } else {
    const canvas = generateElement('canvas', {attributes: {width: parms[0], height: parms[1]}});
    const ctx = parms[2] == 'gl' ? canvas.getContext('webgl', parms[3]) : canvas.getContext('2d', parms[3]);
    ctx.imageSmoothingEnabled = false;
    return {canvas: canvas, ctx: ctx};
  }
}

window.relativeMousePosition = function(event) {
  const rect = event.target.getBoundingClientRect( );
  return {
    x: event.clientX - rect.x,
    y: event.clientY - rect.y
  }
}

window.loadImage = function(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image( );
    image.onload = event => {
      resolve(image);
    }
    image.onerror = event => {
      reject(event);
    }
    image.src = url;
  });
}
