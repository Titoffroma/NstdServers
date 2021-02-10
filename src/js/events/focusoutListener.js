import { checkIfValid } from '../pages/loginModal';

export default function listenFocusout(event) {
  if (event.target.classList.contains('modal__input')) {
    checkIfValid(event);
  }
}
