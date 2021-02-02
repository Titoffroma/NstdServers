const measureAndFixScroll = function () {
  const cont = document.body;
  const bodyOverflow = getComputedStyle(cont).overflowY;
  if (bodyOverflow === 'hidden') return;
  const scrollDiv = document.createElement('div');
  scrollDiv.className = 'scrollbar-measure';
  cont.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  cont.removeChild(scrollDiv);
  const { newPad, contRightPadRaw } = fixPad(cont, scrollbarWidth);
  cont.style.paddingRight = newPad
  const header = document.querySelector('.header');
  if (getComputedStyle(header).position === 'fixed') {
    header.style.paddingRight = newPad;
  }

  return contRightPadRaw;
};

const addPreloader = (parent, option) => {
  const markup =
    '<div class="preloader-backdrop" id="id_preloader-bacdrop"><div class="preloader"></div></div>';
  if (parent) {
    parent.insertAdjacentHTML('afterbegin', markup);
  }
  delPreloader(option);
};

const delPreloader = option => {
  const preloader = document.getElementById('id_preloader-bacdrop');
  preloader.classList.add('faiding');
  const initialPad = !option ? measureAndFixScroll() : option;
  if (!option) {
    document.body.style.overflow = 'hidden';
    preloader.style.position = 'absolute';
  }
  setTimeout(() => {
    preloader.remove();
    if (option) return;
    document.body.style.overflowY = 'auto';
    document.body.style.paddingRight = initialPad;
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
