import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";

export default class Preloader extends EventEmitter {
   constructor() {
      super();
      this.experience = new Experience();
      this.scene = this.experience.scene;
      this.sizes = this.experience.sizes;
      this.resources = this.experience.resources;
      this.camera = this.experience.camera;
      this.world = this.experience.world;

      this.world.on('worldready', () => {
         this.setAssets();
         this.playIntro();
      });
   }

   setAssets() {
      this.component = this.experience.world.component.actualComponent;
      this.componentChildren = this.experience.world.component.componentChildren;
      //console.log(this.componentChildren);
   }
   intro() {
      this.timeline = new GSAP.timeline({
         onComplete: () => {
            this.emit("worldFinished");
         },
      });
      this.timeline.to(".preloader", {
         opacity: 0,
         delay: 1,
         onComplete: () => {
            document
               .querySelector(".preloader")
               .classList.add("hidden");
         },
      });
      for (let i = 1; i <= 7; i++) {
         this.timeline.to(this.componentChildren[`c_${i}`].scale, {
            x: 0.36,
            y: 0.36,
            z: 0.36,
            ease: 'back.out(2.5)',
            duration: 0.3,
         }).to(this.componentChildren[`cylinder_${i}`].scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'power1.out',
            duration: 0.3,
         }, '<0'
         ).to(this.componentChildren[`cylinder_${i}`].scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: 'power1.out',
            duration: 0.3,
         }, '<0')
      }
      const coins = ['coin', 'second_coin', 'third_coin'];

      for (let i = 1; i <= coins.length; i++) {
         const coinType = coins[i - 1];
         const coinCount = Object.keys(this.componentChildren).filter(key => key.startsWith(coinType)).length;

         for (let j = 1; j <= coinCount; j++) {
            const coinKey = `${coinType}_${j}`;
            const scaleValue = 1;

            const timelineObject = this.timeline.to(this.componentChildren[coinKey].scale, {
               x: scaleValue,
               y: scaleValue,
               z: scaleValue,
               ease: 'back.out(2.5)',
               duration: 0.1,
            });

            if (coinType === 'second_coin') {
               timelineObject.from(
                  this.componentChildren.cyrcle_graph.rotation,
                  {
                     z: Math.PI * 4,
                     ease: 'power1.out',
                     duration: 0.3,
                  },
                  '<0'
               ).to(
                  this.componentChildren.cyrcle_graph.scale,
                  {
                     x: -0.08,
                     y: -0.08,
                     z: -0.08,
                     ease: 'power1.out',
                     duration: 0.3,
                  },
                  '<0'
               ).to(
                  [
                     document.querySelectorAll('.header__block'),
                     document.querySelectorAll('.header__block_2'),
                     document.querySelectorAll('.footer__block'),
                     document.querySelectorAll('.footer__block_2'),
                     document.querySelectorAll('.footer__block_3'),
                     document.querySelectorAll('.text__block'),
                  ],
                  {
                     y: 0,
                     x: 0,
                     ease: 'power1.out',
                     duration: 0.3,
                  },
               );
            }
         }
      }
   }
   playIntro() {
      this.intro();
   }

   update() {
   }
}
