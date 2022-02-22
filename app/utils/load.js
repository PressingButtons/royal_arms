export function image(url) {
  return new Promise(function(resolve, reject) {
    const img = new Image( )
    img.onload = event => {resolve(img)};
    img.onerror = event => {reject(event)};
    img.src = url;
  });
}
