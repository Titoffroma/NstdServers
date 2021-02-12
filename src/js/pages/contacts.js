import img1 from '../../img/contacts-img.png';
import svg1 from '../../img/contact1.svg';
import svg2 from '../../img/contact2.svg';
import svg3 from '../../img/contact3.svg';

const svgs = [svg1, svg2, svg3];

function drawContactsImages() {
  const image = document.querySelector('.contacts__image');
  image.src = img1;
  const images = document.querySelectorAll('.contacts__center-image');
  images.forEach((svg, i) => {
    svg.src = svgs[i];
  });
}

export { drawContactsImages };
