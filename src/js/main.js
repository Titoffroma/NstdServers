import { addPreloader } from './utils/preloader.js';
import { load, save } from './utils/storage';
import routers from './history/routers';
import renderCard from '../templates/card.hbs';
import { render } from './pages/pages';
import listenClicks from './events/clickListener';
import listenSwipes from './events/swipeListener';
import listenChange from './events/changeListener';
import { movePad } from './events/scrollListener';
var debounce = require('debounce');

const rootRel = document.getElementById('root');

rootRel.addEventListener('scroll', debounce(movePad, 10));

document.addEventListener('click', listenClicks);
document.addEventListener('swiped', listenSwipes);
document.addEventListener('change', listenChange);
