import slider from '../utils/slider';
import routers from '../history/routers';
const rootEl = document.getElementById('root');

const observer = new IntersectionObserver(startCircle, {
  threshold: 0.1,
});

// const serviceObserver = new IntersectionObserver(getHeight, {
//   threshold: 0.1,
// });

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

function preload({ path }, hash) {
  const container = document.querySelectorAll('.container');
  const logo = document.querySelectorAll('.logo__image');
  slider.end();
  if (path === routers[0].path) slider.start();
  logo.forEach(el => el.classList.remove('in'));
  const circle = document.querySelector('#statistics');
  circle ? observer.observe(circle) : observer.disconnect();
  const services = document.querySelector('.services__main');
  services && resizeServices();
  container.forEach(el => {
    el.classList.remove('present');
    aboutObserver.observe(el);
  });
  if (hash) {
    rootEl.style.opacity = '0';
    const target = document.querySelector(hash);
    setTimeout(() => {
      rootEl.style.opacity = '1';
      rootEl.scrollTo({
        top: Math.round(target.offsetTop),
      });
    }, 1000);
  } else {
    rootEl.scrollTo({
      top: 0,
      behavoir: 'smooth',
    });
  }
  setTimeout(
    () => logo.length && logo.forEach(el => el.classList.add('in')),
    500,
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

// function getHeight(entries) {
//   entries.forEach(entry => {
//     resizeServices();
//   });
// }

function resizeServices() {
  let timerOne;
  clearTimeout(timerOne);

  let acc = 1;
  const deviceWidth = window.innerWidth;
  if (deviceWidth >= 1280) {
    acc = 3;
  } else if (deviceWidth >= 768) {
    acc = 2;
  }

  const services = document.querySelector('.services__main');
  const active = document.querySelector('.services__tab-list.active');
  const table = document.querySelector('.services__table');
  const tabs = document.querySelector('.services__tabs');
  const child = active.children[0];
  const childrenAmount = active.children.length;
  table.style.width = '100%';

  timerOne = setTimeout(() => {
    services.style.height =
      active.scrollHeight <= 350
        ? Number(active.scrollHeight) + 40 + 'px'
        : Number(active.scrollHeight) + 'px';
    if (childrenAmount < acc) {
      Array.from(active.children).map(
        el => (el.style.width = el.scrollWidth + 'px'),
      );
      // active.scrollWidth / childrenAmount - 10 * childrenAmount - 10 + 'px';
      table.style.width =
        child.scrollWidth * childrenAmount +
        tabs.scrollWidth +
        40 +
        childrenAmount * 10 -
        10 +
        'px';
      // services.style.width =
      //   childWidth * childrenAmount + 40 + childrenAmount * 10 - 10 + 'px';
    }
  }, 500);
}
export { resizeServices };
export default preload;
