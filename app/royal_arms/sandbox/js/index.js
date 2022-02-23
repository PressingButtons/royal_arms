import main from './main.js';

window.onload = event => {
  initWebutils(document.getElementById('canvas').getContext('webgl'));
  System.init( ).then(setRecorder).then(main);
}

function setRecorder( ) {
  const recorder = new System.Recorder(document.getElementById('canvas'));
  let recording = false;
  document.addEventListener('keyup', event => {
    if(event.key == 'r') {
      recording = recording ? false : true;
      if(recording) {
        recorder.start( );
        console.log('recording start')
      }
      else {
        recorder.stop( );
        console.log('recording stopped');
      }
    }
  });
  document.addEventListener('downloadrecording', onDownload);
}

function onDownload(event) {
  window.open(event.detail);
}
