import loginModal from '../../templates/login-modal.hbs';
import localModal from '../localization/localLoginModal.json';
import { lang } from '../history/mainHistory';
import errorsLocal from '../localization/errors.json';

function renderModal() {
  const markup = loginModal(localModal[lang.name]);
  return markup;
}

let message = '';
let index = 0;

function checkIfValid(event) {
  const input = event.target;
  const value = event.target.value;
  const errorType = event.target.type;
  const error = event.target.nextElementSibling.children[0];
  error.textContent = '';
  input.classList.remove('valid', 'invalid');
  if (!value.length) return addError();
  if (errorType === 'email') {
    if (
      /,|;|\s/.test(value) ||
      !/\w+[^\s]+\@\w+\.\w+$/.test(value) ||
      value.match(/\@/g).length > 1
    )
      index = 1;
  }
  if (errorType === 'password') {
    if (value.length < 8) index = 1;
    else if (!/\p{Lu}/u.test(value)) index = 2;
    else if (!/\d/.test(value)) index = 3;
    else if (!/[!@#\$%\^&\*)(.,_\-+"`~=\\\|;:'"/\?]/.test(value)) index = 4;
  }
  if (index) addError();
  else input.classList.add('valid');

  function addError() {
    message = errorsLocal[lang.name][errorType][index];
    error.classList.add('iserror');
    input.classList.add('invalid');
    error.textContent = message;
    index = 0;
  }
}

export { renderModal, checkIfValid };
