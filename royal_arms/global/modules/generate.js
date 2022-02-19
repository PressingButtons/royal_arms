export function element(type, properties = { }) {
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

export function canvas(width, height, context, options = { }) {
  const canvas = generateElement('canvas', {width: width, height: height});
  if(context == 'webgl') return {canvas: canvas, gl: canvas.getContext(context, options)}
  else return {canvas: canvas, ctx: canvas.getContext('2d', options)};
}
