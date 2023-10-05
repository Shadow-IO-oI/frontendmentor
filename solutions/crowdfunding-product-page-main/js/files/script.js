//!Logo
window.addEventListener('DOMContentLoaded', function () {
   var logoLink = document.querySelector('.header__logo');
   var logoImg = logoLink.querySelector('img');
   var screenWidth = window.innerWidth || document.documentElement.clientWidth;

   function changeLogo() {
      if (screenWidth <= 767.98) {
         logoImg.src = "img/logo_2.svg";
         logoImg.alt = "logo_2";
      } else {
         logoImg.src = "img/logo.svg";
         logoImg.alt = "logo";
      }
   }

   //` Initial call to set the logo based on the current screen width
   changeLogo();

   // `Call the changeLogo() function whenever the window is resized
   window.addEventListener('resize', function () {
      screenWidth = window.innerWidth || document.documentElement.clientWidth;
      changeLogo();
   });
});

//!Bookmark

const bookmark = document.querySelector(".progress-bottom__bookmark-button");

bookmark.addEventListener('click', () => {
   bookmark.classList.toggle('_active');
});

//! Dark Theme
window.addEventListener('load', windowLoad);
//~windowLoad
function windowLoad() {
   //`HTML
   const htmlBlock = document.documentElement;

   //`Obtain Saved Theme
   const saveUserTheme = localStorage.getItem('user-theme');

   //`Work with settings
   let userTheme;
   if (window.matchMedia) {
      userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
   }
   window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", e => {
      !saveUserTheme ? changeTheme() : null;
   });

   //`Change Theme on Click
   const themeButton = document.querySelector(".switch input");
   if (themeButton) {
      themeButton.addEventListener('click', function (e) {
         changeTheme(true);
      });
   }

   //`Add Theme Class Function
   function setThemeClass() {
      if (saveUserTheme) {
         htmlBlock.classList.add(saveUserTheme)
      } else {
         htmlBlock.classList.add(userTheme);
      }
   }

   //`Add Theme Class 
   setThemeClass();

   //`Change Theme Function
   function changeTheme(saveTheme = false) {
      let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
      let newTheme;

      if (currentTheme === 'light') {
         newTheme = 'dark';
      } else if (currentTheme === 'dark') {
         newTheme = 'light';
      }
      htmlBlock.classList.remove(currentTheme);
      htmlBlock.classList.add(newTheme);
      saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
   }
}
