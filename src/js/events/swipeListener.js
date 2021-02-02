import slider from '../utils/slider';
import { swiper, swiper1 } from '../utils/swiper';

export default function listenSwipes(event) {
  if (event.target.closest('#slider')) slider.changeSlidesOnEvent(event);
  if (event.target.closest('#advantages-slider')) swiper.desideEvent(event);
  if (event.target.closest('#services-slider')) swiper1.desideEvent(event);
}
