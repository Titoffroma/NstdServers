import renderHeader from '../../templates/header.hbs';
import localDataHeader from '../localization/localHeader.json';
import localDataHome from '../localization/localHome.json';
import localDataAboutUs from '../localization/localAboutUs.json';
import localDataPartners from '../localization/localPartners.json';
import localDataContacts from '../localization/localContacts.json';
import localDataCalc from '../localization/localCalc.json';
import { lang } from './mainHistory';
import renderHome from '../../templates/Home.hbs';
import renderAboutUs from '../../templates/about-us.hbs';
import renderPartners from '../../templates/for-partners.hbs';
import renderContacts from '../../templates/contacts.hbs';
import renderCalc from '../../templates/calc.hbs';
import { slider } from '../utils/slider';
import { swiper } from '../utils/swiper';
import { drawImages, renderIndicators } from '../pages/home';
const makeLinks = () => import('../pages/aboutUs');
import { drawPartnersImages } from '../pages/forPartners';
import { drawContactsImages } from '../pages/contacts';
import { renderCalculator } from '../pages/calc';
import { stars, starsResize } from '../utils/stars';

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

async function fun2() {
  updateHeader();
  rootRef.innerHTML = renderAboutUs(localDataAboutUs[lang.name]);
  const module = await makeLinks();
  module.default();
  module.drawAboutUsImages();
}

function fun3() {
  updateHeader();
  rootRef.innerHTML = renderCalc(localDataCalc[lang.name]);
  renderCalculator();
}

function fun4() {
  updateHeader();
  rootRef.innerHTML = renderPartners(localDataPartners[lang.name]);
  setTimeout(() => {
    stars.clearStars();
    stars.setup();
  }, 1200);

  // drawPartnersImages();
}

function fun5() {
  updateHeader();
  rootRef.innerHTML = renderContacts(localDataContacts[lang.name]);
  drawContactsImages();
}

function fun6() {
  updateHeader();
  rootRef.innerHTML = '';
}

export { fun1, fun2, fun3, fun4, fun5, fun6 };
