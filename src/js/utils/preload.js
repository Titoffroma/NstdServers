import slider from '../utils/slider';
import routers from '../history/routers';
const rootEl = document.getElementById('root');

const observer = new IntersectionObserver(startCircle, {
  threshold: 0.1,
});

const serviceObserver = new IntersectionObserver(getHeight, {
  threshold: 0.1,
});

const aboutObserver = new IntersectionObserver(
  entries =>
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('present'), 250);
      }
    }),
  {
    threshold: 0.1,
  },
);

function preload({ path }) {
  const container = document.querySelectorAll('.container');
  const logo = document.querySelectorAll('.logo__image');
  slider.end();
  if (path === routers[0].path) slider.start();
  logo.forEach(el => el.classList.remove('in'));
  const circle = document.querySelector('#statistics');
  circle ? observer.observe(circle) : observer.disconnect();
  const services = document.querySelector('.services__main');
  services ? serviceObserver.observe(services) : serviceObserver.disconnect();
  container.forEach(el => {
    aboutObserver.observe(el);
    el.classList.remove('present');
  });
  if (location.hash) {
    const target = document.querySelector(location.hash);
    const { y: alt } = target.getBoundingClientRect();
    setTimeout(() => {
      target &&
        target.scrollIntoView({
          behavior: 'smooth',
        });
    }, 750);
  } else {
    rootEl.scrollTo({
      top: 0,
      behavoir: 'smooth',
    });
  }
  setTimeout(
    () => logo.length && logo.forEach(el => el.classList.add('in')),
    1000,
  );
}

function startCircle(entries) {
  const circle = document.querySelector('#statistics');
  const speed = document.querySelector('#speed');
  let timer = null;
  entries.forEach(entry => {
    let count = 1;
    if (entry.isIntersecting) {
      circle.classList.add('hover');
      clearInterval(timer);
      timer = setInterval(() => {
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

function getHeight(entries) {
  entries.forEach(entry => {
    resizeServices();
  });
}

function resizeServices() {
  const services = document.querySelector('.services__main');
  const active = document.querySelector('.services__tab-list.active');
  setTimeout(() => {
    services.style.height = active.scrollHeight + 'px';
  }, 250);
}
export { resizeServices };
export default preload;
