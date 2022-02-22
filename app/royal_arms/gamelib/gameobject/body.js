 export default class GoBody {

   #data = new Int16Array(4);
   #gameobject;

   constructor(gameobject) {
     this.#gameobject = gameobject
   }

   get x( ) {return this.#data[0]};
   set x(n) {this.#data[0] = n};

   get y( ) {return this.#data[1]};
   set y(n) {this.#data[1] = n};

   get w( ) {return this.#data[2]};
   set w(n) {this.#data[2] = n};

   get h( ) {return this.#data[3]};
   set h(n) {this.#data[3] = n};

   get body( ) {
     return {x: this.x, y: this.y, w: this.w, h: this.h};
   }

   set body(values) {
     if(values instanceof Array) {
       this.#data.set(values);
     } else {
       if(values.x) this.x = values.x;
       if(values.y) this.y = values.y;
       if(values.w) this.w = values.w;
       if(values.h) this.h = values.h;
     }
   }

 }
