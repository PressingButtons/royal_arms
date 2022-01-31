export function json(url) {
  return fetch(url).then(response => response.json());
}

export function text(url) {
  return fetch(url).then(resposne => response.json());
}

export function image(url) {
  return new Promise(function(resolve, reject) {
    try {
      const image = new Image( );
      image.onload = function(event) {
        resolve(image);
      }
      image.src = url;
    } catch(err) {
      reject(err);
    }
  });
}
