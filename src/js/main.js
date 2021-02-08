import { addPreloader, delPreloader } from './utils/preloader.js';
import listenClicks from './events/clickListener';
import listenSwipes from './events/swipeListener';
import listenChange from './events/changeListener';
import listenResize from './events/resizeListener';
import listenFocusout from './events/focusoutListener';
import listenFocusin from './events/focusinListener';
import listenSubmit from './events/submitListener';
import { movePad } from './events/scrollListener';
const { newPad, initialPad } = addPreloader(null);
window.addEventListener('load', delPreloader.bind(null, newPad, initialPad));
var debounce = require('debounce');

const a = 'w_.@f.f';
console.log(
  /,|;|\s/.test(a) ||
    !/\w+[^\s]+\@\w+\.\w+$/.test(a) ||
    a.match(/\@/g).length > 1,
);

const rootRel = document.getElementById('root');

rootRel.addEventListener('scroll', debounce(movePad, 10));

document.addEventListener('click', listenClicks);
document.addEventListener('swiped', listenSwipes);
document.addEventListener('change', listenChange);
document.addEventListener('focusout', listenFocusout);
document.addEventListener('focusin', listenFocusin);
document.addEventListener('submit', listenSubmit);
window.addEventListener('resize', listenResize);
