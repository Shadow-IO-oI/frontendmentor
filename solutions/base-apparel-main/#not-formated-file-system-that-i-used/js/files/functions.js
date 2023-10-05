// Import the list of active modules
import { flsModules } from "./modules.js";

/* Check webp support and add a class of 'webp' or 'no-webp' to the HTML */
export function isWebp() {
// Check webp support
function testWebP(callback) {
let webP = new Image();
webP.onload = webP.onerror = function () {
callback(webP.height == 2);
};
webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
// Add a class of '_webp' or '_no-webp' to the HTML
testWebP(function (support) {
let className = support === true ? 'webp' : 'no-webp';
document.documentElement.classList.add(className);
});
}
//================================================================================================================================================================================================================================================================================================================
// Other useful functions ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================
// FLS (Full Logging System)
export function FLS(message) {
setTimeout(() => {
if (window.FLS) {
console.log(message);
}
}, 0);
}