import { decideRout } from '../history/mainHistory';
import myModal from '../utils/modalClass';
import slider from '../utils/slider';
import openMenu from '../pages/burger';
import { lang } from '../history/mainHistory';
import { changeLangPath } from './changeListener';
import { load, save, remove } from '../utils/storage';

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
  if (event.target.hasAttribute('data-lang')) {
    const previousLang = lang.name;
    save('Lang', event.target.dataset.lang);
    const newLang = event.target.dataset.lang;
    const path = changeLangPath(previousLang, newLang);
    decideRout(path, true);
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
  if (path.split('/').reverse()[0] === lang.name) path = '/';
  const target = document.querySelector(`[href='${path}']`);
  if (target) {
    target.classList.add('coloured');
    target.setAttribute('disabled', '');
  }
}

function clearAccent() {
  const accent = document.querySelector('.coloured');
  if (!accent) return;
  accent.classList.remove('coloured');
  accent.removeAttribute('disabled');
}

export { makeAccent };
