import slider from '../pages/home';

export default function listenSwipes(event) {
  console.log(event.target); // element that was swiped
  console.log(event.detail.dir); // swipe direction
  if (event.target.closest('#slider')) slider.changeSlidesOnEvent(event);
}
