export async function image(url) {
  const image = new Image( );
  image.onload = event => {
    return Promise.resolve(image);
  }
  image.onerrer = event => {
    return Promise.reject(event);
  }
  image.src = url;
}

export async function canvas(url) {
  const img = await image(url);
  pane = await generate.canvas(image.width, image.height);
  pane.ctx.drawImage(image, 0, 0);
  return pane;
}
