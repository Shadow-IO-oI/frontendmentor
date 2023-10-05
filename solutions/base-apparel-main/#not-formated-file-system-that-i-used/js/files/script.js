import * as flsForms from "./forms/forms.js";
import gsap from 'gsap';
import anime from 'animejs/lib/anime.es.js';

//====================================================================================================
//! E-mail 

const input = document.querySelector('.form__input');
function onFocus() {
   var errorDiv = document.querySelector(".form__error");
   if (errorDiv) {
      errorDiv.style.opacity = "0.6";
   } else {
      console.warn("Error div not found");
   }
}

function onBlur() {
   var errorDiv = document.querySelector(".form__error");
   if (errorDiv) {
      errorDiv.style.opacity = "1";
   } else {
      console.warn("Error div not found");
   }
}
input.addEventListener('focus', function () {
   onFocus();
});
input.addEventListener('blur', function () {
   onBlur();
});


// Get the form element
const form = document.querySelector('.form');

// Add an event listener for form submission
form.addEventListener('submit', function (event) {
   event.preventDefault(); // Prevent the form from submitting

   // Perform form validation
   const errors = flsForms.formValidate.getErrors(this);

   // If there are no validation errors, submit the form
   if (errors === 0) {
      // Submit the form here

      // Hide the form and show the confirmation message
      form.style.display = 'none';
      document.querySelector('.confirmation').style.display = 'block';
   }
});

//========================================================================================================================================================

//! Loading screen

var imagesToPreload = document.querySelectorAll('[data-preload] img');
var imagesLoaded = 0;

function preloadImages() {
   for (var i = 0; i < imagesToPreload.length; i++) {
      var img = new Image();
      img.onload = function () {
         imagesLoaded++;
         if (imagesLoaded == imagesToPreload.length) {
            // All images have been loaded
            // Hide the loading screen and show the images
            setTimeout(function () {
               gsap.to('#loading-screen', {
                  opacity: 0,
                  duration: 0.5,
                  onComplete: function () {
                     document.getElementById("loading-screen").style.display = "none";
                  }
               });
               gsap.to('.carousel', {
                  delay: 0.5,
                  opacity: 1,
                  duration: 1,
               });
            }, 1000); // Delay hiding the loading screen by 1 second
         }
      };
      img.src = imagesToPreload[i].src;
   }
}

// Call the preloadImages function when the page loads
window.onload = preloadImages;

//====================================================================================================

//! Loading-screen-fox

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 95;
const CANVAS_HEIGHT = canvas.height = 95;

const playerImage = new Image();
playerImage.src = 'img/loading-screen/fox.webp';
const spriteWidth = 95;
const spriteHeight = 95;
let gameFrame = 0;
let straggerFrames = 17;
if (window.innerWidth <= 768) {
   straggerFrames = 7;
}
const spriteAnimations = [];
const animationStates = [
   {
      name: 'idle',
      frames: 3,
   },
];

animationStates.forEach((state, index) => {
   let frames = {
      loc: [],
   }
   for (let j = 0; j < state.frames; j++) {
      let positionX = j * spriteWidth;
      let positionY = index * spriteHeight;
      frames.loc.push({ x: positionX, y: positionY });
   }
   spriteAnimations[state.name] = frames;
});


function animate() {
   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
   let position = Math.floor(gameFrame / straggerFrames) % spriteAnimations['idle'].loc.length;
   let frameX = spriteWidth * position;
   let frameY = spriteAnimations['idle'].loc[position].y;
   ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

   gameFrame++;
   requestAnimationFrame(animate);
};

animate();
//========================================================================================================================================================


//! Carousel
const carousel = document.querySelector('.carousel');
const container = document.querySelector('.carousel__container');
const IMGCONTAINER = document.querySelector('.carousel__images');
const imageBlocks = document.querySelectorAll('.carousel__image-block');
const images = document.querySelectorAll('.carousel__image-ibg');
let intervalIds = [];
let intervalId;

// Set initial state
imageBlocks.forEach((image) => {
   image.classList.remove('active');
});

let currentIndex = 0;
let time = 100;

function startCarousel() {
   // Set the active image for each block
   for (let i = 0; i < imageBlocks.length; i++) {
      images[currentIndex + i * images.length / imageBlocks.length].classList.add('active');
   }

   // Set interval to advance the carousel every 5 seconds
   intervalId = setInterval(() => {
      // Hide the current image in all blocks
      for (let i = 0; i < imageBlocks.length; i++) {
         images[currentIndex + i * images.length / imageBlocks.length].classList.remove('active');
      }

      // Advance to the next image in all blocks
      currentIndex = (currentIndex + 1) % (images.length / imageBlocks.length);

      // Show the next image in all blocks
      for (let i = 0; i < imageBlocks.length; i++) {
         images[currentIndex + i * images.length / imageBlocks.length].classList.add('active');
      }

      // Double the time interval every time the carousel completes a cycle
      if (currentIndex === 0) {
         time++;
      }
   }, time);
}

startCarousel();

function killCarousel() {
   // Stop the interval and reset the time variable
   clearInterval(intervalId);
   time = 5000;
}


//========================================================================================================================================================

//! Carousel Animations

gsap.set(
   '.carousel__images',
   {
      delay: 3,
      gridTemplateColumns: '1fr 1fr',
      columnGap: '20px',
   }
);
gsap.set(
   '.carousel__images',
   {
      delay: 4,
      gridTemplateRows: 'repeat(2, 1fr)',
      rowGap: '20px',
   }
);
gsap.set(
   '.carousel__images',
   {
      delay: 5,
      gridTemplateColumns: 'repeat(4, 1fr)',
   }
)
gsap.fromTo(
   '.carousel__images',
   {
      opacity: 1,
   },
   {
      delay: 5.5,
      opacity: 0,
      ease: "sine.out",
      duration: 3
   },
);
gsap.set(
   '.circle',
   {
      delay: 8.5,
      visibility: 'hidden',
      display: 'none',
      gridTemplateColumns: 'repeat(4, 1fr)',
   }
)
setTimeout(() => {
   killCarousel();
}, 7000);
// rest of animations
const tl = gsap.timeline();

tl.fromTo(
   '.circle',
   { scale: 0, opacity: 0 },
   {
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: "back.out(3)",
      delay: 6,
   }
).to(
   '.circle',
   {
      scale: 100,
      opacity: 0,
      duration: 2,
      ease: "expo.out",
   }
).from(
   '.main-block',
   {
      opacity: 0,
      duration: 2,
   }, '<0'
).from(
   ".logo__circle",
   { 
      scale: 0, 
      opacity: 0, 
      duration: 4.2,
      ease: 'Expo.easeOut',
      delay: .5
   }, '<0'
).from(
   '.contact-block',
   {
      opacity: 0,
      duration: 2,
   }, '<1'
).from(
   ".main-block__women",
   { 
      x: 10,
      y: 5,
      opacity: 0,
      duration: 4.2,
      ease: 'Expo.easeOut',
   }, '<1'
).from(
   '.contact-block__title > span',
   {
      opacity: 0,
      y: 5,
      duration: 2,
   }, '<1'
).from(
   '.contact-block__text',
   {
      y: 5,
      opacity: 0,
      duration: 1,
   }, '<1'
).fromTo(".form", {
   width: "105px",
   opacity: 0,
},{ 
   opacity: 1, 
   width: '100%', 
   duration: 4.5, 
   ease: "power4.out",
}, '<1');


   // Wrap every letter in a span
   var textWrapper2 = document.querySelector(".ml2");
   textWrapper2.innerHTML = textWrapper2.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
   );
   var textWrapper2 = document.querySelector(".ml3");
   textWrapper2.innerHTML = textWrapper2.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
   );

   anime.timeline().add({
      targets: ".ml2 .letter",
      translateY: [60, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 2000,
      delay: (el, i) => 50 + 60 * i + 8700,
   });
   anime.timeline().add({
      targets: ".ml3 .letter",
      translateY: [60, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 2000,
      delay: (el, i) => 250 + 60 * i + 8700,
   });
//========================================================================================================================================================
