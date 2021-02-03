import slider from '../utils/slider';
import routers from '../history/routers';

function preload({ path }) {
  slider.end();
  if (path === routers[0].path) slider.start();
  const container = document.querySelectorAll('.container');
  let index = 100;
  container.length &&
    container.forEach(el => {
      el.classList.remove('present');
      setTimeout(() => el.classList.add('present'), (index += 100));
    });
}
export default preload;
