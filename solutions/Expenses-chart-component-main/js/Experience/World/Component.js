import * as THREE from "three";

import Experience from "../Experience.js";

export default class Component {
   constructor() {
      this.experience = new Experience();
      this.scene = this.experience.scene;
      this.resources = this.experience.resources;
      this.time = this.experience.time;
      this.camera = this.experience.camera.orthographicCamera;
      this.raycaster = this.experience.raycaster;
      this.mouse = this.experience.mouse;
      this.sizes = this.experience.sizes;
      this.component = this.resources.items.component;
      this.actualComponent = this.component.scene;
      this.actualComponentChildren = this.component.scene.children;
      this.componentChildren = {};
      this.preloader = this.experience.preloader;


      this.setModel();

      this.preloader.on("worldFinished", () => {
         this.onMouseMove();
      });
      this.update();
      this.resize();
   }

   onMouseMove() {
      window.addEventListener("pointermove", (e) => {
         this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1;
         this.mouse.y = - (e.clientY / this.sizes.height) * 2 + 1;
         //console.log(this.mouse);

         this.raycaster.setFromCamera(this.mouse, this.camera);


         this.intersects = this.raycaster.intersectObjects(this.actualComponentChildren)

         for (const intersect of this.intersects) {
            for (let i = 1; i <= 7; i++) {
               const cubeSelector = `.text-blocks__cube_${i}`;
               const cubeElement = document.querySelector(cubeSelector);

               if (this.intersects.length > 0 && intersect.object.name === `c_${i}`) {
                  cubeElement.style.opacity = '1';
                  cubeElement.style.visibility = 'visible';
               } else {
                  cubeElement.style.opacity = '0';
                  cubeElement.style.visibility = 'hidden';
               }
            }

         }
      });
   }

   setModel() {
      this.actualComponent.children.forEach((child) => {
         child.castShadow = true;
         child.receiveShadow = true;

         if (child instanceof THREE.Group) {
            child.children.forEach((groupchild) => {
               console.log(groupchild.material);
               groupchild.castShadow = true;
               groupchild.receiveShadow = true;
            });
         }

         this.componentChildren[child.name.toLowerCase()] = child;
         
         child.scale.set(0,0,0);
      });

      const width = 0.5;
      const height = 0.7;
      const intensity = 1;
      const rectLight = new THREE.RectAreaLight(
         0xffffff,
         intensity,
         width,
         height
      );
      rectLight.position.set(7.68244, 7, 0.5);
      rectLight.rotation.x = -Math.PI / 2;
      rectLight.rotation.z = Math.PI / 4;
      this.actualComponent.add(rectLight);

      this.componentChildren["rectLight"] = rectLight;

      this.scene.add(this.actualComponent);
      this.actualComponent.position.y = -0.26;
   }

   resize() { }

   update() {

   }
}
