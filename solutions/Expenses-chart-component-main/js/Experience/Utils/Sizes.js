import { EventEmitter } from "events";

export default class Sizes extends EventEmitter {
   constructor() {
      super();
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;
      this.pixrelRatio = Math.min(window.devicePixelRatio, 2);
      this.frustrum = 5;
      if(this.widht < 968.98){
         this.device = 'mobile';
      } else {
         this.device = 'desktop';
      }

      window.addEventListener('resize', () => {
         this.width = window.innerWidth;
         this.height = window.innerHeight;
         this.aspect = this.width / this.height;
         this.pixrelRatio = Math.min(window.devicePixelRatio, 2);
         this.emit('resize');
      })
   }
}
