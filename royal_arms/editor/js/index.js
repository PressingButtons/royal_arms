import Workspace from "./workspace.js";
import TileProject from "./tileproject.js";
import * as ui from './ui.js'
import * as retriever from '../../global/modules/retriever.js';
import Sprite2D from '../../global/modules/sprite2D.js';

const TILESIZE = 16;

window.onload = event => {
  const sprite = new Sprite2D( );
  const workspace = new Workspace(document.querySelector('#workspace > .container'), TILESIZE);
  let project;

  function init(html) {
    document.querySelector('#interface').innerHTML = html;
    retriever.image('../../assets/sprites/tiles.png').then(main);
  }
  ///

  const main = tilesheet => {
    document.addEventListener('newlayer', handleNewLayer);
    sprite.load(tilesheet, TILESIZE, TILESIZE);
    ui.populateSprites(sprite);
    project = new TileProject(480, 364, TILESIZE);
    workspace.loadProject(project);
  }

  function handleNewLayer(event) {
    ui.loadLayer(event.detail);
  }


  //exec =========================================================================
  retriever.text('./ui.html').then(init);
}
