export function broadcast(type, config = null, target = document) {
  target.dispatchEvent(new CustomEvent(type, {detail: config}));
}
