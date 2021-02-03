import slider from '../utils/slider';
import routers from '../history/routers';
import { each } from 'jquery';

const observer = new IntersectionObserver(startCircle, {
  threshold: 0.1,
});

function preload({ path }) {
  slider.end();
  if (path === routers[0].path) slider.start();
  const container = document.querySelectorAll('.container');
  const logo = document.querySelectorAll('.logo__image');
  logo.forEach(el => el.classList.remove('in'));

  const circle = document.querySelector('#statistics');
  circle ? observer.observe(circle) : observer.disconnect();
  if (location.hash) {
    const target = document.querySelector(location.hash);
    console.log(location.hash, target);
    setTimeout(() => {
      target &&
        target.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
          behavior: 'smooth',
        });
    }, 250);
  }
  let index = 100;
  container.length &&
    container.forEach(el => {
      el.classList.remove('present');
      setTimeout(() => el.classList.add('present'), (index += 100));
    });
  setTimeout(
    () => logo.length && logo.forEach(el => el.classList.add('in')),
    1000,
  );
}

function startCircle(entries, observer) {
  console.log(entries);
  const circle = document.querySelector('#statistics');
  const speed = document.querySelector('#speed');
  let timer = null;
  entries.forEach(entry => {
    let count = 1;
    if (entry.isIntersecting) {
      circle.classList.add('hover');
      clearInterval(timer);
      const timer = setInterval(() => {
        count += 5.5;
        if (count === 100) {
          count = 99.9;
          clearInterval(timer);
        }
        speed.textContent = count.toFixed(1) + ' %';
      }, 100);
    } else {
      circle.classList.remove('hover');
      speed.textContent = '0 %';
    }
  });
}

export default preload;
