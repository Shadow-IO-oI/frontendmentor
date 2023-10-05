import gsap from 'gsap';


//! Removing data atribute on desktop screen
function removeSpollerAttribute() {
   var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
   var companyButtons = document.querySelectorAll('.spollers__title');

   if (screenWidth > 531.98) { // Adjust the width threshold as per your requirement
      companyButtons.forEach(function (button) {
         button.removeAttribute('data-spoller');
      });
   } else {
      companyButtons.forEach(function (button) {
         button.setAttribute('data-spoller', '');
      });
   }
}

// Call the function initially and on window resize
removeSpollerAttribute();
window.addEventListener('resize', removeSpollerAttribute);

document.addEventListener('DOMContentLoaded', function () {

   //! Button hover effect

   const button = document.querySelector('.button');
   const buttonSpanFirst = document.getElementById('first-button-span');
   const buttonSpanSecond = document.getElementById('second-button-span');
   const distance = 10;

   button.addEventListener('mousemove', (e) => {
      const { offsetX: x, offsetY: y } = e;
      const { offsetWidth: width, offsetHeight: height } = button;

      const xValue = Math.round((x / width) * distance - distance / 2);
      const yValue = Math.round((y / height) * distance - distance / 2);

      buttonSpanFirst.style.transform = `translate(${-xValue}px, ${yValue}px)`;
      buttonSpanSecond.style.transform = `translate(${xValue}px, ${-yValue}px)`;

      button.addEventListener('mouseleave', () => {
         buttonSpanFirst.style.transform = `translate(0)`;
         buttonSpanSecond.style.transform = `translate(0)`;
      });
   });


   //! Animations

   const scrollingText = document.querySelector('.scrolling-text');
   const spanContainer = scrollingText.querySelector('h1');
   const spans = spanContainer.querySelectorAll('span');

   // Clone the spans and append them to the spanContainer
   for (let i = 0; i < spans.length; i++) {
      const spanClone = spans[i].cloneNode(true);
      spanContainer.appendChild(spanClone);
   }

   // Calculate the total width of the cloned spans
   const totalWidth = spans.length * spans[0].offsetWidth;

   // Set the width of the spanContainer to the total width
   spanContainer.style.width = `${totalWidth}px`;

   // Animate the scrolling effect
   gsap.fromTo(
      scrollingText,
      {
         x: '0%',
         duration: 0.2,
      },
      {
         x: `-${totalWidth}px`,
         duration: 85,
         repeat: -1,
      }
   );

   const tl = gsap.timeline();


   tl.from(
      '.main-block',
      {
         opacity: 0,
         y: '10%',
         duration: 1.5,
      }
   ).from(".item-benefit_3", {
      opacity: 0,
      y: 40,
      duration: 0.5,
      scrollTrigger: {
         trigger: ".item-benefit_3",
         start: "top 0%",
         end: "bottom 20%",
         scrub: true,
      },
   }, 
   ).from(".item-benefit_2", {
      opacity: 0,
      y: 40,
      duration: 0.5,
      scrollTrigger: {
         trigger: ".item-benefit_2",
         start: "top 80%",
         end: "bottom 20%",
         scrub: true,
      }, 
   }, '<0.5'
   ).from(".item-benefit_1", {
      opacity: 0,
      y: 40,
      duration: 0.5,
      scrollTrigger: {
         trigger: ".item-benefit_1",
         start: "top 80%",
         end: "bottom 20%",
         scrub: true,
      },
   }, '<0.5'
   );
});

