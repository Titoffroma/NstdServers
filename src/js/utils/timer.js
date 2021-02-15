export default class CountdownTimer {
  constructor(specs) {
    this.selector = specs.selector;
    this.targetDate = specs.targetDate;
    this.startCountdown();
  }
  createTimer() {
    return new Promise((resolve, reject) => {
      const timerRef = document.querySelector(this.selector);
      timerRef && timerRef.children.length === 0
        ? resolve(timerRef)
        : reject('The timer cannot be found by ID');
    });
  }
  parseTimerHTML(timerRef) {
    timerRef.innerHTML =
      '<div class="field"><span class="value" data-value="days">11</span><span class="label">Days</span></div><div class="field"><span class="value" data-value="hours">11</span><span class="label">Hours</span></div><div class="field"><span class="value" data-value="mins">11</span><span class="label">Minutes</span></div><div class="field"><span class="value" data-value="secs">11</span><span class="label">Seconds</span></div>';
    const timerObj = {
      timerRef: timerRef,
      titleRef: document.querySelector('.new-year-timer'),
      valueRef: document.querySelectorAll('.value'),
      labelRef: document.querySelectorAll('.label'),
    };
    return timerObj;
  }
  startTimer({ timerRef, titleRef, valueRef, labelRef }) {
    const intervalSet = setInterval(() => {
      const time = Date.parse(this.targetDate) - Date.now();

      valueRef[0].textContent = Math.floor(time / (1000 * 60 * 60 * 24));
      valueRef[1].textContent = Math.floor(
        (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      valueRef[2].textContent = Math.floor(
        (time % (1000 * 60 * 60)) / (1000 * 60),
      );
      valueRef[3].textContent = Math.floor((time % (1000 * 60)) / 1000);

      labelRef[0].textContent = valueRef[0].textContent == 1 ? 'Day' : 'Days';
      labelRef[1].textContent = valueRef[1].textContent == 1 ? 'Hour' : 'Hours';
      labelRef[2].textContent =
        valueRef[2].textContent == 1 ? 'Minute' : 'Minutes';
      labelRef[3].textContent =
        valueRef[3].textContent == 1 ? 'Second' : 'Seconds';

      if (time == 0) {
        clearInterval(intervalSet);
        titleRef.textContent = 'HAPPY NEW YEAR!!!';
        titleRef.style.fontSize = '50px';
      }
    }, 1000);

    timerRef.addEventListener('DOMSubtreeModified', this.animateTimer);
  }
  animateTimer({ target }) {
    if (target.classList.contains('value')) {
      target.insertAdjacentHTML(
        'afterEnd',
        `<span class="value after">${target.textContent}</span>`,
      );
      setTimeout(() => {
        target.nextSibling.classList.add('trans');
      }, 200);
      setTimeout(() => {
        target.nextSibling.remove();
      }, 900);
    }
  }
  startCountdown() {
    return this.createTimer()
      .then(this.parseTimerHTML)
      .then(this.startTimer.bind(this))
      .catch(err => {
        console.warn(err);
      });
  }
}
