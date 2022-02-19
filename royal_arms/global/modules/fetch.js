export function json(url) {return fetch(url).then(res => res.json())};
export function text(url) {return fetch(url).then(res => res.text())};
export async function html(url) {
  const htmlText = await text(url);
  const div = Global.generate.element('div');
  div.innerHTML = htmlText;
  return div;
}
