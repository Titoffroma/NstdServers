import preloader from '../../templates/preloader.hbs';
import { stars } from './stars';

const measureAndFixScroll = function () {
  const cont = document.getElementById('root');
  const bodyOverflow = getComputedStyle(cont).overflowY;
  if (bodyOverflow === 'hidden') return;
  const scrollDiv = document.createElement('div');
  scrollDiv.className = 'scrollbar-measure';
  cont.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  cont.removeChild(scrollDiv);
  const { newPad, contRightPadRaw } = fixPad(cont, scrollbarWidth);
  cont.style.paddingRight = newPad;
  // const rail = document.getElementById('scroll-rail');
  // rail.style.width = newPad;
  setTimeout(() => {
    document.body.style.marginRight = `-${newPad}`;
  }, 2000);

  // const header = document.querySelector('.header');
  // if (getComputedStyle(header).position === 'fixed') {
  //   header.style.paddingRight = newPad;
  // }

  return contRightPadRaw;
};

const addPreloader = (parent, option) => {
  const markup = preloader();
  if (parent) {
    parent.insertAdjacentHTML('afterbegin', markup);
    stars.setup();
  }
  delPreloader(option);
};

const delPreloader = option => {
  const preloader = document.getElementById('id_preloader_backdrop');
  preloader.classList.add('faiding');
  const initialPad = !option ? measureAndFixScroll() : option;
  const rootEl = document.getElementById('root');
  if (!option) {
    rootEl.style.overflowY = 'hidden';
    preloader.style.position = 'fixed';
    rootEl.style.paddingRight = initialPad;
  }
  setTimeout(() => {
    stars.clearStars();
    preloader.remove();
    if (option) return;
    rootEl.style.overflowY = 'auto';
    rootEl.style.paddingRight = initialPad;
  }, 2000);
};

function fixPad(el, width) {
  const contRightPadRaw = getComputedStyle(el).paddingRight;

  const contRightPad = contRightPadRaw
    .split('')
    .filter(el => !el.search(/[0-9]/))
    .join('');
  const newPad = `${-(-contRightPad - width)}px`;
  return { contRightPadRaw, newPad };
}

export { measureAndFixScroll, addPreloader, delPreloader };
