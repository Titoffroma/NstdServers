import renderHeader from '../../templates/header.hbs';
import localDataHeader from '../localization/localHeader.json';
import localDataHome from '../localization/localHome.json';
import localDataAboutUs from '../localization/localAboutUs.json';
import { lang } from './mainHistory';
import renderHome from '../../templates/Home.hbs';
import renderAboutUs from '../../templates/about-us.hbs';
import { slider } from '../utils/slider';
import { swiper } from '../utils/swiper';
import { drawImages, renderIndicators } from '../pages/home';

function updateHeader() {
  document.getElementById('id_nav_list').innerHTML = renderHeader(
    localDataHeader[lang.name],
  );
}

const rootRef = document.getElementById('root-content');

function fun1() {
  updateHeader();
  rootRef.innerHTML = renderHome(localDataHome[lang.name]);
  renderIndicators();
  drawImages();
  slider.start();
  swiper.start();
}

function fun2() {
  updateHeader();
  rootRef.innerHTML = renderAboutUs(localDataAboutUs[lang.name]);
}

function fun3() {
  updateHeader();
  rootRef.innerHTML = '';
}

function fun4() {
  updateHeader();
  rootRef.innerHTML = '';
}

function fun5() {
  updateHeader();
  rootRef.innerHTML = '';
}

function fun6() {
  updateHeader();
  rootRef.innerHTML = '';
}

export { fun1, fun2, fun3, fun4, fun5, fun6 };
