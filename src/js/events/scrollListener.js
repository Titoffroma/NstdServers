let timer;

function movePad(event) {
  const head = document.querySelector('.header');
  const { height: headHeight } = window.getComputedStyle(head);
  const rails = document.getElementById('scroll-rail');
  const pad = document.getElementById('scroll-pad');
  rails.style.opacity = '0.8';
  clearTimeout(timer);
  timer = setTimeout(() => {
    rails.style.opacity = '0';
    pad.style.height = '0';
  }, 1000);

  const rootRel = document.getElementById('root');
  const rootCont = document.getElementById('root-content');
  const { y: Y } = rootRel.getBoundingClientRect();
  const { y } = rootCont.getBoundingClientRect();
  const parentHeight = rootRel.offsetHeight;
  const childHeight = rootCont.offsetHeight;
  pad.style.height =
    Math.round(parentHeight / (childHeight / parentHeight)) + 'px';
  const top = Array.from(headHeight.matchAll(/[0-9]/g)).join('');
  const scrollHeight = childHeight - parentHeight + Number(top);

  const pos = Y - y;
  const padPos = (parentHeight - top) / (scrollHeight / pos) + top;

  pad.style.top = padPos + 'px';
}

export { movePad };
