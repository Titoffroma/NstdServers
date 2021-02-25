import { lang } from '../history/mainHistory';
import errorsLocal from '../localization/errors.json';

export default function listenSubmit(event) {
  event.preventDefault();
  const form = event.target.closest('form');
  const errors = Array.from(form.querySelectorAll('.modal__message'));
  const inputs = Array.from(form.querySelectorAll('.modal__input'));
  const valid = inputs.filter(input => input.value);
  const filter = errors.filter(el => !el.textContent.length);
  if (valid.length === errors.length && filter.length === errors.length) {
    const message = errorsLocal[lang.name].submit;
    errors[0].classList.add('iserror');
    form.elements[0].classList.add('invalid');
    errors[0].textContent = message;
  }
}
