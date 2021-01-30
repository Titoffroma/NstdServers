class Slider {
  constructor() {
    this.active = 0;
    this.timer = null;
    this.left = document.getElementById('slider_left');
    this.right = document.getElementById('slider_right');
    this.set = false;
  }
  get slider() {
    return document.getElementById('slider');
  }
  get slides() {
    return document.querySelectorAll('.hero-slider__slide');
  }
  start() {
    this.changeSlides();
    this.timer = setInterval(() => {
      if (this.slider && this.set) {
        this.changeSlides();
      }
    }, 5000);
  }
  end() {
    if (this.set) {
      clearInterval(this.timer);
    }
    this.set = false;
  }
  changeSlides() {
    if (!this.slider || this.slides.length <= 1) {
      return this.end();
    }
    this.set = true;
    this.slides.forEach((slide, index) => {
      if (slide.classList.contains('active')) {
        slide.classList.remove('active');
        this.active = index + 1;
        if (this.active === this.slides.length) this.active = 0;
      }
    });
    this.slides[this.active].classList.add('active');
  }
  changeSlidesOnEvent(event) {
    event.preventDefault();
    if (!this.slides.length) return;
    if (this.timer) {
      if (event.target === this.left || event.detail.dir === 'left') {
        if (this.active === 0) this.active = this.slides.length;
        this.active--;
      }
      if (event.target === this.right || event.detail.dir === 'right') {
        if (this.active === this.slides.length - 2) this.active = 0;
        this.active++;
      }
      this.end();
      this.start();
    }
  }
}

const slider = new Slider();
export default slider;

export { slider };
