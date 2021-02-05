import indicators from '../../templates/swipe-indicators.hbs';

import img1 from '../../img/benefit1.svg';
import img2 from '../../img/benefit2.svg';
import img3 from '../../img/benefit3.svg';
import img4 from '../../img/benefit4.svg';
import img5 from '../../img/benefit5.svg';
import img6 from '../../img/benefit6.svg';
import img7 from '../../img/benefit7.svg';
import img8 from '../../img/benefit8.svg';

import png1 from '../../img/service1.png';
import png2 from '../../img/service2.png';
import png3 from '../../img/service3.png';
import png4 from '../../img/service4.png';
import png5 from '../../img/service5.png';
import png6 from '../../img/service6.png';
import png7 from '../../img/service7.png';
import png8 from '../../img/service8.png';

const imgs = [img1, img2, img3, img4, img5, img6, img7, img8];

const pngs = [png1, png2, png3, png4, png5, png6, png7, png8];

function drawBenefits() {
  let images = document.querySelectorAll('#advantages .cardset__image');
  images.forEach((image, index) => {
    image.src = `${imgs[index]}`;
  });
  images = document.querySelectorAll('#services .cardset__pic');
  images.forEach((image, index) => {
    image.src = `${pngs[index]}`;
  });
}

function renderIndicators() {
  const slide1 = document.getElementById('slider');
  const slide2 = document.getElementById('advantages');
  let arr = Array.from(slide1.querySelectorAll('.hero-slider__slide'));
  let markup = indicators(arr);
  slide1.insertAdjacentHTML('beforeend', markup);
  arr = Array.from(slide2.querySelectorAll('.cardset__list-item')).map(el => {
    return { class: 'benefit' };
  });
  arr.length = Math.ceil(arr.length / 2);
  markup = indicators(arr);
  slide2.insertAdjacentHTML('beforeend', markup);
}

export { drawBenefits, renderIndicators };
