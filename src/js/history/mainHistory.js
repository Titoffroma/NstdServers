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
addPreloader(document.body, true);
window.onload = () => {
  const path = location.pathname + location.search;
  decideRout(path, true);
};

window.onpopstate = () => {
  const previousLang = lang.name;
  // const pathNew = location.pathname.split('?lang=');
  // pathNew[1] = previousLang;
  // const path = pathNew.join('?lang=');
  const url = new URL(location.href);
  url.searchParams.set('lang', previousLang);
  const path = url.pathname + url.search;
  decideRout(path, true);
};

function decideRout(path, replace = false) {
  if (path.includes('server') || path === '/') path = `/?lang=${lang.name}`;
  let rout = routers.find(el => el.path === path);
  if (!rout) rout = routers[0];
  replace
    ? history.replaceState({ page: rout.page }, rout.title, path)
    : history.pushState({ page: rout.page }, rout.title, path);
  rout.component();
  preload(rout);
  rout && makeAccent(rout);
  startState = false;

  return rout;
}

export { lang, decideRout };
