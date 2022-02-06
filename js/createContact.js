import { svgDelete, svgPhone, svgFb, svgVk, svgMail, svgOther } from "./svg.js";
import { contactTooltip } from "./createTooltip.js";


export const createContactItem = () => {
  const contact = document.createElement('div');
  const contactType = document.createElement('div');
  const contactName = document.createElement('button');
  const contactList = document.createElement('ul');
  const contactPhone = document.createElement('li');
  const contactVk = document.createElement('li');
  const contactFb = document.createElement('li');
  const contactEmail = document.createElement('li');
  const contactOther = document.createElement('li');
  const contactInput = document.createElement('input');
  const contactDelete = document.createElement('button');
  const contactDeleteTooltip = document.createElement('span');

  contact.classList.add('contact');
  contactDeleteTooltip.classList.add('contact__tooltip', 'site-tooltip');
  contactType.classList.add('contact__type');
  contactName.classList.add('contact__name');
  contactList.classList.add('contact__list', 'list-reset');
  contactPhone.classList.add('contact__item');
  contactVk.classList.add('contact__item');
  contactFb.classList.add('contact__item');
  contactOther.classList.add('contact__item');
  contactEmail.classList.add('contact__item');
  contactInput.classList.add('contact__input');
  contactDelete.classList.add('contact__delete');

  contactName.textContent = 'Телефон';
  contactDeleteTooltip.textContent = 'Удалить контакт';
  contactPhone.textContent = 'Телефон';
  contactVk.textContent = 'VK';
  contactEmail.textContent = 'Email';
  contactFb.textContent = 'Facebook';
  contactOther.textContent = 'Другое';
  contactInput.placeholder = 'Введите данные контакта';
  contactInput.type = 'text';
  contactDelete.innerHTML = svgDelete;


  contactDelete.append(contactDeleteTooltip);
  contact.append(contactType, contactInput, contactDelete);
  contactType.append(contactName, contactList);
  contactList.append(contactPhone, contactEmail, contactVk, contactFb, contactOther);


  //удалить контакт по клику на крестик
  contactDelete.addEventListener('click', (e) => {
    e.preventDefault();
    contact.remove();
    document.querySelector('.popup__btn-contact').classList.add('popup__btn-contact--active');
  });

  //выбираем тип контакта
  contactName.addEventListener('click', (e) => {
    e.preventDefault();
    contactList.classList.toggle('contact__list--active');
    contactName.classList.toggle('contact__list--active');
  })

  contactType.addEventListener('mouseleave', () => {
    contactList.classList.remove('contact__list--active');
    contactName.classList.remove('contact__list--active');
  })

  const setType = (type) => {
    type.addEventListener('click', () => {
      contactName.textContent = type.textContent;
      contactList.classList.remove('contact__list--active');
      contactName.classList.remove('contact__list--active');
    });
  }

  const typesArray = [contactVk, contactOther, contactPhone, contactEmail, contactFb];

  for (const type of typesArray) {
    setType(type);
  }

  return {
    contact,
    contactName,
    contactInput,
    contactDelete
  }
}

export const createContactLink = (type, value, link, svg, item) => {
  const setTooltip = contactTooltip(type, value);
  
  link = document.createElement('a');
  link.classList.add('contacts__link');
  link.innerHTML = svg; 

  if (type === 'Email') {
    link.href = `mailto: ${value.trim()}`
  } else if (type === 'Телефон') {
    link.href = `tel: ${value.trim()}`;
    setTooltip.tooltipValue.style.color = 'var(--main-color)';
    setTooltip.tooltipValue.style.textDecoration = 'none';
  } else {
    link.href = `${value.trim()}`
  }

  link.append(setTooltip.tooltip);
  item.append(link);
}

export const createContactElementByType = (type, value, item) => {
  switch (type) {
    case 'Телефон':
      let phone;
      createContactLink(type, value, phone, svgPhone, item);
      break;
    case 'Facebook':
      let fb;
      createContactLink(type, value, fb, svgFb, item);
      break;
    case 'VK':
      let vk;
      createContactLink(type, value, vk, svgVk, item);
      break;
    case 'Другое':
      let other;
      createContactLink(type, value, other, svgOther, item);
      break;
    case 'Email':
      let email;
      createContactLink(type, value, email, svgMail, item);
      break;
  }
}