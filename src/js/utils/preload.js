import slider from '../pages/home';

function preload({ path }) {
  if (path !== '/') slider.end();
  const container = document.querySelectorAll('.container');
  let index = 100;
  container.length &&
    container.forEach(el => {
      el.classList.remove('present');
      setTimeout(() => el.classList.add('present'), (index += 100));
    });
}
export default preload;
