export function json(url) {
  return fetch(url).then(res => res.json());
}

export function text(url) {
  return fetch(url).then(res => res.text());
}

export function html(url) {
  return text(url).then(text => {
    const div = document.createElement('div');
    div.innerHTML = text;
    return div;
  })
}

export function directory(url, filter) {
  return html(url).then(div => {
    const query = filter ? 'a.' + filter : 'a';
    return [...div.querySelectorAll(query)].map(x => x.pathname);
  })
}
