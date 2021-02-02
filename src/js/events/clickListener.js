import { decideRout } from '../history/mainHistory';
import myModal from '../utils/modalClass';
import slider from '../utils/slider';
import openMenu from '../pages/burger';

export default function listenClicks(event) {
  if (event.target.id.includes('id_rout')) {
    event.preventDefault();
    render(event);
  }
  if (event.target.hasAttribute('data-modal')) {
    event.preventDefault();
    myModal.openModal(event);
  }
  if (event.target.hasAttribute('data-slide')) {
    slider.changeSlidesOnEvent(event);
  }
  if (event.target.hasAttribute('data-burger')) {
    event.preventDefault();
    openMenu(event);
  }
}

function render(e) {
  if (e.target.hasAttribute('disabled')) return;
  if (e.target.hasAttribute('data-id')) clearAccent();
  const path = e.target.getAttribute('href');
  decideRout(path);
  if (document.getElementById('id_nav').classList.contains('open'))
    document.getElementById('burger-menu').click();
}

function makeAccent({ path }) {
  clearAccent();
  const cardItems = document.querySelectorAll('.nav-bar__item');
  // setTimeout(
  //   () => cardItems[cardItems.length - 1].classList.add('current'),
  //   100,
  // );
  // cardItems.forEach(el => {
  //   el.classList.remove('current');
  // });
  const target = document.querySelector(`[href='${path}']`);
  // target
  //   .closest('ul')
  //   .querySelectorAll('a')
  //   .forEach(el => el.removeAttribute('disabled'));
  target.classList.add('coloured');
  target.setAttribute('disabled', '');
  // if (target.getAttribute('id') === 'id_rout_1') {
  //   document.querySelector('#id_rout_00').click();
  //   return;
  // }
}

function clearAccent() {
  const accent = document.querySelector('.coloured');
  if (!accent) return;
  accent.classList.remove('coloured');
  accent.removeAttribute('disabled');
}

export { makeAccent };