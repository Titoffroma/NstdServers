import { addPreloader, delPreloader } from './utils/preloader.js';
import listenClicks from './events/clickListener';
import listenSwipes from './events/swipeListener';
import listenChange from './events/changeListener';
import listenResize from './events/resizeListener';
import { movePad } from './events/scrollListener';
const { newPad, initialPad } = addPreloader(null);
window.addEventListener('load', delPreloader.bind(null, newPad, initialPad));
var debounce = require('debounce');

const rootRel = document.getElementById('root');

rootRel.addEventListener('scroll', debounce(movePad, 10));

document.addEventListener('click', listenClicks);
document.addEventListener('swiped', listenSwipes);
document.addEventListener('change', listenChange);
window.addEventListener('resize', listenResize);
