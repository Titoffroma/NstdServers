import routers from './routers';
import { makeAccent } from '../events/clickListener';
import preload from '../utils/preload';
import {
  measureAndFixScroll,
  addPreloader,
  delPreloader,
} from '../utils/preloader';

let auth = true;
let startState = true;

window.onload = () => {
  addPreloader(document.body, true);
  decideRout(location.pathname, true);
};

window.onpopstate = () => {
  const state = decideRout(location.pathname, true);
};

function decideRout(path, replace = false) {
  if (path.includes('server')) path = '/';
  let rout = routers.find(el => el.path === path);
  if (rout && !startState) {
    replace
      ? history.replaceState({ page: rout.page }, rout.title, path)
      : history.pushState({ page: rout.page }, rout.title, path);
  }
  if (!rout) rout = routers[0];
  rout.component();
  preload(rout);
  rout && makeAccent(rout);
  startState = false;
  return rout;
}

export { decideRout };
