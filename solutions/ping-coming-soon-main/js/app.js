import { gsap } from "gsap";

const tl = gsap.timeline({
   duration: 1.5,
});
const paths = document.querySelectorAll(".line");
paths.forEach((path) => {
   const length = path.getTotalLength();
   gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
   });
});

tl.fromTo(
   ['.main-block__logo', '.main-block__title', '.main-block__text'],
   {
      y: '-10%',
      opacity: 0,
   },
   {
      y: 0,
      opacity: 1,
   },
).fromTo(
   ['.form__input'],
   {
      flex: '0 0 0%',
      opacity: 0,
   },
   {
      flex: '1 1 auto',
      opacity: 1,
   },
).fromTo(
   ['.form__button'],
   {
      opacity: 0,
   },
   {
      opacity: 1,
   },
).fromTo(
   '#tab',
   {
      y: '10%',
      opacity: 0,
   },
   {
      y: 0,
      opacity: 1,
   },
).staggerFromTo(
   '.circle',
   1,
   {
      y: '-105%',
      opacity: 0,
   },
   {
      y: 0,
      opacity: 1,
      ease: "bounce.out"
   },
   0.2
).fromTo(
   '#screen',
   {
      y: '-100%',
      opacity: 0,
   },
   {
      y: 0,
      opacity: 1,
   }, '<0.5'
).fromTo(
   '#green-rect',
   {
      x: '5%',
      opacity: 0,
   },
   {
      x: 0,
      opacity: 1,
   },
).staggerFromTo(
   '.cross',
   1,
   {
      y: '-100%',
      opacity: 0,
   },
   {
      y: 0,
      opacity: 1,
      ease: "bounce.out"
   },
   0.02,
).fromTo(
   '#sidebar',
   {
      x: '-5%',
      opacity: 0,
   },
   {
      x: 0,
      opacity: 1,
   }, "<0.5"
).fromTo(
   ['.sidebar-text-block', '#arrow'],
   {
      x: '-10%',
      opacity: 0,
   },
   {
      x: 0,
      opacity: 1,
   }, "<0.5"
).fromTo(
   '#arrow',
   { rotateZ: '180deg', transformOrigin: 'center' },
   { rotateZ: '0deg', transformOrigin: 'center' }, "<0.5"
).fromTo(
   '.text-block',
   {
      y: 5,
      opacity: 0,
   },
   {
      y: 0,
      opacity: 1,
   }, "<0.5"
).fromTo(
   '.rect',
   {
      y: 5,
      opacity: 0,
   },
   {
      y: 0,
      opacity: 1,
   }, "<0.5"
).fromTo(
   '#check-mark',
   {
      y: '-10',
      opacity: 0,
   },
   {
      duration: 1.5,
      y: 0,
      opacity: 1,
      ease: "elastic.out(1, 0.3)"
   }
).to(
   paths,
   {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power1.inOut",
   }, '<'
).to(
   '#image0_129_93',
   {
      duration: 0.5,
      keyframes: [
         { transform: "translate(100%, -10%)" },
         { transform: "translate(50%, 0%)" },
         { transform: "translate(50%, -10%)" },
         { transform: "translate(20%, 0%)" },
         { transform: "translate(20%, -10%)" },
         { transform: "translate(0, 0)" },
      ],
   },
).fromTo(
   '.footer__copy',
   {
      y: 10,
      opacity: 0,
   },
   {
      y: 0,
      opacity: 1,
   }, '<0.5'
).staggerFromTo(
   '.footer__item',
   1,
   {
      y: '-100%',
      opacity: 0,
   },
   {
      y: 0,
      opacity: 1,
      ease: "bounce.out"
   },
   0.2,
)
