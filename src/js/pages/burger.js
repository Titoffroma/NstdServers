import getModal from '../../templates/burger-modal.hbs';

export default function openMenu({ target }) {
  const expanded = target.getAttribute('aria-expanded') === 'true' || false;
  target.setAttribute('aria-expanded', !expanded);
  Array.from(target.children).map(el => el.classList.toggle('closed'));
  const markupSet = [];
  const navs = Array.from(document.getElementById('id_nav').children);
  navs.map((el, index) => {
    if (index) {
      console.log(el);
      const a = el.children[0];
      const id = a.id.trim();
      const text = a.textContent.trim();
      let className = '';
      const href = a.getAttribute('href').trim();
      if (a.classList.contains('coloured')) className = 'disabled';
      markupSet.push({ id, text, href, className });
    }
  });
  console.log(markupSet);
  return getModal(markupSet);
}
