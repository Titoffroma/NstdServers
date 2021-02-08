import loginModal from '../../templates/login-modal.hbs';
import localModal from '../localization/localLoginModal.json';
import { lang } from '../history/mainHistory';
import errorsLocal from '../localization/errors.json';

let errors = [];
let emailErrors = [];
let passwordErrors = [];

export default function renderModal() {
  const markup = loginModal(localModal[lang.name]);
  errors = [];
  emailErrors = [];
  passwordErrors = [];
  return markup;
}

function validate(evt) {
  if (evt.target === loginInput) {
    loginInput.addEventListener('blur', checkMail, { once: true });
  }
  if (evt.target === passwordInput) {
    passwordInput.addEventListener('blur', validatePassword, { once: true });
  }
  if (evt.target === loginBtn) return validateLogin(evt);
  if (evt.target === registerBtn) return validateRegistration(evt);

  function renderErrors(target) {
    target.nextElementSibling.textContent = emailErrors[0];
  }
}

function checkMail() {
  emailErrors = [];
  if (loginInput.value.length === 0) {
    errors.push('Введите адрес электронной почты');
    emailErrors.push('Введите адрес электронной почты');
  }

  if (
    /,|;|\s/.test(a) ||
    !/\w+[^\s]+\@\w+\.\w+$/.test(a) ||
    a.match(/\@/g).length > 1
  ) {
    errors.push('Адрес электронной почты был введен неправильно.');
    emailErrors.push('Адрес электронной почты был введен неправильно.');
  }

  const dog = loginInput.value.indexOf('@');
  if (dog == -1) {
    errors.push('Нет символа"@".');
    emailErrors.push('Нет символа"@".');
  }
  if (loginInput.value.indexOf('.') == -1) {
    errors.push('Нет символа"."');
    emailErrors.push('Нет символа"."');
  }
  if (dog < 1 || dog > loginInput.value.length - 5) {
    errors.push('Адрес электронной почты был введен неправильно.');
    emailErrors.push('Адрес электронной почты был введен неправильно.');
  }
  if (
    loginInput.value.charAt(dog - 1) == '.' ||
    loginInput.value.charAt(dog + 1) == '.'
  ) {
    errors.push('Адрес электронной почты был введен неправильно.');
    emailErrors.push('Адрес электронной почты был введен неправильно.');
  }
  renderErrors();
}

function validatePassword() {
  passwordErrors = [];
  const p = passwordInput.value;
  if (p.length <= 8) {
    errors.push('Ваш пароль должен состоять хотя бы из 8-ми символов');
    passwordErrors.push('Ваш пароль должен состоять хотя бы из 8-ми символов');
  }
  if (p.search(/[a-z]/i) < 0) {
    errors.push('Ваш пароль должен иметь хотя бы одну букву');
    passwordErrors.push('Ваш пароль должен иметь хотя бы одну букву');
  }
  if (p.search(/[0-9]/) < 0) {
    errors.push('Ваш пароль должен иметь хотя бы одну цифру');
    passwordErrors.push('Ваш пароль должен иметь хотя бы одну цифру');
  }
  renderErrors();
}
