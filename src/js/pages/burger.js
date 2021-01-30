export default function openMenu({ target }) {
  const expanded = target.getAttribute('aria-expanded') === 'true' || false;
  target.setAttribute('aria-expanded', !expanded);
  Array.from(target.children).map(el => el.classList.toggle('closed'));
  const nav = document.getElementById('id_nav');
  nav.classList.toggle('open');
  return 1;
}
