export function loadImage(url) {
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
