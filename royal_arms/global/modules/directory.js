export async function list(dir, searchKey) {
  const queryHTML = Global.fetch.html(dir);
  const listing = parseQuery(queryHTML, searchKey);
  return convertToRelative(dir, listing);
}

function parseQuery(html, searchKey) {
  const key = searchKey ? 'a.' + searchKey : 'a';
  return [...html.querySelectorAll(key)].map( x => x.pathname);
}


function convertToRelative(dir, listing) {
  for(const ent of listing) {
    console.log(listing.indexOf(dir.slice(1)));
  }
  return listing;
}
