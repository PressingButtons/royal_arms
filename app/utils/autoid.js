export default function( ) {
  let id = 0;
  return {
    get next( ) {
      return (id++).toString();
    }
  }

}
