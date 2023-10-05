# Frontend Mentor - Results summary component solution

This is a solution to the [Results summary component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/results-summary-component-CE_K6s0maV).

## Overview

Hi, it's a edited code written by [@ANS0025](https://www.frontendmentor.io/profile/ANS0025). 

Fixed things:

- transition button that has gradient color?
- way to fill the screen when viewing in mobile
- The mobile layout gets destroyed when width of screen is below 300px. 


## The way I fixed it

- To fix the button, I created a pseudo-element and positioned it absolutely, relative to the button to cover only the button. I set the width and height of the pseudo-element to cover the whole button and added a border-radius: inherit; to round the borders. Then, I changed the opacity for the pseudo-element to 0 and added a transition. On button hover, I set the opacity to 1. Additionally, I wrapped the text inside the button with a span element and set its position to relative and z-index to 2. This ensures that the text appears on top of the pseudo-element and is clickable.

- To fill the screen when viewing on mobile, I added additional blocks that contain the content. I created three blocks: main-block, main-block__container, and main-block__body. I positioned main-block to center by adding flex styles to the page. For main-block__container, I added customization styles. In main-block__body, I placed all of the content and made it grid. Instead of using exact height and width for main-block, I used percentage and paddings in result-container. At max-width: 46rem, I changed page width and height from vw, vh to %. I set main-block properties width: 100%; height: 100%; to cover the whole screen. Finally, I changed paddings in result-container to 5px.

### Links

- Solution URL: [O_o](https://github.com/Shadow-IO-oI/result-summary-by--ANS0025)
- Live Site URL: [^_^](https://result-summary-by-ans-0025.vercel.app)


## Author
- Frontend Mentor - [@ANS0025](https://www.frontendmentor.io/profile/ANS0025)

## Editted by 
- Frontend Mentor - [@Shadow-IO-oI](https://www.frontendmentor.io/profile/Shadow-IO-oI)


### Lucky Fox

![](./fox.jpg)

