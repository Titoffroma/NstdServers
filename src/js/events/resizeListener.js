import { opts, starsResize } from '../utils/stars';
import { resizeServices } from '../utils/preload';

export default function listenResize(event) {
  if (opts.canvas) starsResize();
  if (document.querySelector('#services')) resizeServices();
}
