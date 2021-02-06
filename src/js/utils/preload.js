import slider from '../utils/slider';
import routers from '../history/routers';

const observer = new IntersectionObserver(startCircle, {
  threshold: 0.1,
});

const serviceObserver = new IntersectionObserver(getHeight, {
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
  const services = document.querySelector('.services__main');
  services ? serviceObserver.observe(services) : serviceObserver.disconnect();
  if (location.hash) {
    const target = document.querySelector(location.hash);
    const { y: alt } = target.getBoundingClientRect();
    setTimeout(() => {
      target &&
        target.scrollIntoView({
          behavior: 'smooth',
        });
    }, 750);
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

function getHeight(entries, observer) {
  const services = document.querySelector('.services__main');
  const active = document.querySelector('.services__tab-list.active');
  entries.forEach(entry => {
    setTimeout(() => {
      services.style.height = active.scrollHeight + 'px';
    }, 250);
  });
}

export default preload;
