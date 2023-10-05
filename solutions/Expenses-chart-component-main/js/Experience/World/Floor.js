import * as THREE from "three";
import Experience from "../Experience.js";

export default class Floor {
   constructor() {
      this.experience = new Experience();
      this.scene = this.experience.scene;

      this.setFloor();
      this.setWall();
   }

   setFloor() {
      this.geometry = new THREE.PlaneGeometry(100, 100);
      this.material = new THREE.MeshPhysicalMaterial({
         color: 0xeaafe1,
         side: THREE.BackSide,
         emissive: 0xff00ff
      });
      this.plane = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.plane);
      this.plane.rotation.x = Math.PI / 2;
      this.plane.position.y = -0.3;
      this.plane.receiveShadow = true;
   }
   setWall(){
      this.geometry = new THREE.PlaneGeometry(100, 100);
      this.material = new THREE.MeshStandardMaterial({
         color: 0xeaafe1,
         side: THREE.BackSide,
         emissive: 0xff00ff
      });
      this.plane = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.plane);
      this.plane.rotation.y =-Math.PI / 1;
      this.plane.position.z = -8;
      this.plane.position.y = 50;
      this.plane.receiveShadow = true;
   }

   resize() { }

   update() { }
}
