class Slider {
  constructor() {
    this.active = 0;
    this.next = 1;
    this.timer = null;
    this.set = false;
    this.interval = 8000;
    this.forward = true;
  }
  get slider() {
    return document.getElementById('slider');
  }
  get slides() {
    return document.querySelectorAll('.hero-slider__slide');
  }
  get left() {
    return document.getElementById('slider_left');
  }
  get right() {
    return document.getElementById('slider_right');
  }
  get indicators() {
    return document.querySelector('.hero-slider__indicators').children;
  }
  start(evt) {
    if (this.timer) return;
    this.changeSlides(evt);
    this.timer = setInterval(() => {
      if (this.slider && this.set) {
        this.changeSlides();
      }
    }, this.interval);
  }
  end() {
    if (this.set) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.set = false;
  }
  changeSlides(evt) {
    if (!this.slider || this.slides.length <= 1) {
      return this.end();
    }
    this.set = true;
    const direction = this.forward ? 'right' : 'left';
    const other = this.forward ? 'left' : 'right';
    this.slides.forEach((slide, index) => {
      slide.classList.remove('active', 'left', 'right');
      slide.classList.add(direction);
      this.indicators[index].classList.remove('active');
    });
    if (this.forward) {
      this.active++;
      if (this.active === this.slides.length) this.active = 0;
      this.next = this.active + 1;
      if (this.next === this.slides.length) this.next = 0;
    } else {
      if (this.active === 0) this.active = this.slides.length;
      this.active--;
      this.next = this.active - 1;
      if (this.next === -1) this.next = this.slides.length - 1;
    }
    this.slides[this.next].classList.add(other);
    this.slides[this.next].classList.remove(direction);
    this.slides[this.active].classList.add('active');
    this.indicators[this.active].classList.add('active');
    this.forward = true;
    this.next = this.active + 1;
    if (this.next === this.slides.length) this.next = 0;
  }
  changeSlidesOnEvent(event) {
    event.preventDefault();
    if (!this.slides.length) return;
    if (this.timer) {
      if (event.target === this.left || event.detail.dir === 'left') {
        this.forward = false;
      }
      if (event.target === this.right || event.detail.dir === 'right') {
        this.forward = true;
      }
      this.end();
      this.start(true);
      if (event.type === 'click') {
        this.left.setAttribute('aria-pressed', `${!this.forward}`);
        this.right.setAttribute('aria-pressed', `${this.forward}`);
      }
    }
  }
}

const slider = new Slider();
export default slider;

export { slider };
