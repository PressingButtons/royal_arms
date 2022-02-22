import Workspace from "./workspace.js";
//import TileProject from "./tileproject.js";
import Project from "./system/project.js";
import MapBuilder from '../../engine/modules/mapbuilder.js';
import * as ui from './ui.js'
import * as retriever from '../../global/modules/retriever.js';
import Sprite2D from '../../global/modules/sprite2D.js';

const TILESIZE = 16;
const STAGE_W = 1040;
const STAGE_H = 432;

window.onload = event => {
  //const sprite = new Sprite2D( );
  const workspace = new Workspace(document.querySelector('#workspace > .container'), TILESIZE);
  const mapbuilder = new MapBuilder(TILESIZE);
  let project;

  function init(html) {
    document.querySelector('#interface').innerHTML = html;
    //retriever.image('../../assets/sprites/tiles.png').then(main);
    mapbuilder.loadTiles( ).then(main);
  }
  ///

  const main = ( ) => {
    document.addEventListener('newlayer', handleNewLayer);
    document.addEventListener('tileselection', handleTileSelection);
    //sprite.load(tilesheet, TILESIZE, TILESIZE);
    ui.populateTiles(mapbuilder);
    project = new Project({w: STAGE_W, h: STAGE_H, tilesize: TILESIZE});
    workspace.loadProject(project);
  }

  function handleTileSelection(event) {
    const tile = mapbuilder.tiles[event.detail.index];
    workspace.setCurrentTile(event.detail.type, event.detail.index, tile);
  }

  function handleNewLayer(event) {
    ui.loadLayer(event.detail);
  }


  //exec =========================================================================
  retriever.text('./ui.html').then(init);
}
