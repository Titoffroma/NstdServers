import renderCard from '../../templates/card.hbs';
import renderHome from '../../templates/Home.hbs';
import { slider } from '../utils/slider';
import { swiper, swiper1 } from '../utils/swiper';
import pages from '../pages/pages';
import { drawBenefits, renderIndicators } from '../pages/home';

const nav = {
  get navRefs() {
    return document.querySelectorAll('.navigation__rout--hover');
  },
};

function fun1() {
  root.insertAdjacentHTML('beforeend', renderHome(pages[1]));
  drawBenefits();
  renderIndicators();
  slider.start();
  swiper.start();
  swiper1.start();
}

function fun2() {
  root.innerHTML = renderCard(pages[2]);
}

function fun3() {
  root.innerHTML = renderCard(pages[3]);
}

function fun4() {
  root.innerHTML = renderCard(pages[4]);
}

function fun5() {
  root.innerHTML = renderCard(pages[5]);
}

function fun6() {
  root.innerHTML = renderCard(pages[1]);
}

export { fun1, fun2, fun3, fun4, fun5, fun6 };
