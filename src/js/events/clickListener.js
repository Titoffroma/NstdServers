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
  if (event.target.hasAttribute('data-service')) {
    let timer = null;
    let ind = 0;
    const serviceLists = Array.from(
      document.querySelector('.services__main').children,
    );
    const services = Array.from(
      document.querySelector('.services__tabs').children,
    );
    const index = Number(event.target.dataset.service);
    services.forEach((el, i) => {
      if (el.classList.contains('current')) ind = i;
      el.classList.remove('current');
      if (i === index) el.classList.add('current');
    });
    if (index === ind) return;

    serviceLists.forEach((el, i) => {
      el.classList.remove('active');
      if (i === index) {
        el.classList.add('active');
      }
    });

    clearInterval(timer);
    const service = document.querySelector('.services__main');
    const active = document.querySelector('.services__tab-list.active');
    const { height } = window.getComputedStyle(service);
    const oldHeight = Number(Array.from(height.matchAll(/[0-9]/g)).join(''));
    const newHeight = active.scrollHeight;
    if (oldHeight === newHeight) return;
    const step = (oldHeight - newHeight) / 5;
    let acc = oldHeight;
    let count = 0;
    setTimeout(() => {
      timer = setInterval(() => {
        acc -= step;
        service.style.height = acc + 'px';
        count++;
        if (count === 5) clearInterval(timer);
      }, 50);
    }, 50);
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
