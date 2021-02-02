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

function fun2() {}

function fun3() {}

function fun4() {}

function fun5() {}

function fun6() {}

export { fun1, fun2, fun3, fun4, fun5, fun6 };
