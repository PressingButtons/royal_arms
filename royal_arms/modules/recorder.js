export default class Recorder {

  #src;
  #stream;
  #recorder;
  #chunks;

  constructor(src, options) {
    this.setSource(src, options);
  }

  get src( ) {return this.#src};
  get stream( ) {return this.#stream};

  #createFile( ) {
    const blob = new Blob(this.#chunks, {type: "video/mp4"});
    document.dispatchEvent(new CustomEvent('downloadrecording', {detail: URL.createObjectURL(blob)}));
  }

  #storeChunk(event) {
    this.#chunks.push(event.data);
    if(this.#chunks.length > 0) this.#createFile( );
  }

  start( ) {
    this.#chunks = [];
    this.#recorder.start( );
  }

  stop( ) {
    this.#recorder.stop( );
  }

  setSource(src, options) {
    if(!src.captureStream) throw 'Error "Recorder.constructor", invalid element passed to constructor';
    this.#src = src;
    this.#stream = src.captureStream( );
    this.#chunks = [];
    this.#recorder = new MediaRecorder(this.#stream, options);
    this.#recorder.ondataavailable = this.#storeChunk.bind(this);
  }

}
