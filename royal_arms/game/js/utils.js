window.generateElement = (type, properties = {}) => {
  const element = document.createElement(type);

  for(const attribute in properties.attributes) {
    element[attribute] = properties.attributes[attribute];
  }
  for(const styleName in properties.css) {
    element.style[styleName] = properties.css[styleName];
  }
  for(const className of properties.classes) {
    element.classList.add(className);
  }
}

window.generateCanvas = (width, height, context='2d', options = {}) => {
  const canvas = generateElement('canvas', {attributes: {width: width, height: height}});
  const ctx = context == 'gl' ? canvas.getContext('webgl', options) : canvas.getContext('2d', options);
  ctx.imageSmoothingEnabled = false;
  return {canvas: canvas, context: ctx};
}
