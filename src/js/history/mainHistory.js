import { load, save, remove } from '../utils/storage';
import routers from './routers';
import { makeAccent } from '../events/clickListener';
import preload from '../utils/preload';
import {
  measureAndFixScroll,
  addPreloader,
  delPreloader,
} from '../utils/preloader';
import { changeLangPath } from '../events/changeListener';

let auth = true;
let startState = true;

const lang = {
  get name() {
    const lang = load('Lang');
    return lang || 'ru';
  },
};
const { newPad, initialPad } = addPreloader(null);

window.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname + location.search + location.hash;
  console.log(location.hash);
  decideRout(path, location.hash, true);
});

window.onload = () => {
  delPreloader(newPad, initialPad);
};

window.onpopstate = () => {
  const previousLang = lang.name;
  const url = new URL(location.href);
  url.searchParams.set('lang', previousLang);
  const path = url.pathname + url.search;
  decideRout(path, url.hash, true);
};

function decideRout(path, hash, replace = false) {
  let rout = routers.find(el => el.path === path);
  if (!rout) rout = routers[0];
  replace
    ? history.replaceState({ page: rout.page }, rout.title, path)
    : history.pushState({ page: rout.page }, rout.title, path);
  rout.component();
  preload(rout, hash);
  rout && makeAccent(rout);
  startState = false;

  return rout;
}

export { lang, decideRout };
