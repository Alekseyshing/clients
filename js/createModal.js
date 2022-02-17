import { createContactItem } from "./createContact.js";
import { svgSaveSpinner } from "./svg.js";



//Модальное окно
export function createModal() {
  // Объект структуры модального окна  
  const modalWindowStructure = {
    type: 'new', // Может принимать значения new, change

    headTitle: function (title, button) {
      switch (this.type) {
        case 'new':
          title = 'Новый клиент';
          button = 'Отменить';
          break;
        case 'change':
          title = 'Изменить данные';
          button = 'Удалить клиента';

          break;
      }
      return {
        title,
        button
      }
    }
  }

  const popup = document.createElement('div');
  const popupBody = document.createElement('div');
  const popupContent = document.createElement('div');
  const popupClose = document.createElement('a');
  const popupForm = document.createElement('form');
  const popupFormMain = document.createElement('div');
  const popupHeader = document.createElement('h2');
  const labelSurname = document.createElement('label');
  const inputSurname = document.createElement('input');
  const labelName = document.createElement('label');
  const inputName = document.createElement('input');
  const labelMidname = document.createElement('label');
  const inputMidname = document.createElement('input');
  const contactsBlock = document.createElement('div');
  const popupAddContact = document.createElement('button');
  const popupAddContactSpan = document.createElement('span');
  const popupAddContactImg = document.createElement('img');
  const saveBtn = document.createElement('button');
  const resetBtn = document.createElement('button');

  const errorBlock = document.createElement('p');
  const unacceptabbleLetter = document.createElement('span');
  const writeName = document.createElement('span');
  const writeSurname = document.createElement('span');
  const writeLastname = document.createElement('span');
  const requiredValue = document.createElement('span');
  const requiredContacts = document.createElement('span');
  const savePopupSpinner = document.createElement('span');

  savePopupSpinner.classList.add('popup__spinner');
  errorBlock.classList.add('popup__error');
  unacceptabbleLetter.id = 'unacceptabbleLetter';
  writeName.id = 'writeName';
  writeSurname.id = 'writeSurname';
  writeLastname.id = 'writeLastname';
  requiredValue.id = 'requiredValue';
  requiredContacts.id = 'requiredContacts';

  popup.classList.add('popup');
  popup.id = 'popup';
  popupBody.classList.add('popup__body');
  popupContent.classList.add('popup__content');
  popupClose.classList.add('popup__close');
  popupForm.classList.add('popup__form');
  popupForm.id = 'popup__form';
  popupFormMain.classList.add('popup__form-main');
  popupHeader.classList.add('popup__title');
  popupHeader.innerHTML = modalWindowStructure.headTitle().title;
  labelSurname.classList.add('popup__label', 'popup__label--placeholder');
  labelSurname.setAttribute('for', 'floatingSurname');
  labelSurname.innerHTML = 'Фамилия*';
  labelName.classList.add('popup__label', 'popup__label--placeholder');
  labelName.setAttribute('for', 'floatingName');
  labelName.innerHTML = 'Имя*';
  labelMidname.classList.add('popup__label', 'popup__label--placeholder');
  labelMidname.setAttribute('for', 'floatingLastName');
  labelMidname.innerHTML = 'Отчество';
  savePopupSpinner.innerHTML =  svgSaveSpinner;

  inputSurname.classList.add('popup__input', 'popup__input-surname');
  inputSurname.id = 'floatingSurname';
  inputSurname.name = 'floatingSurname';
  inputSurname.type = 'text';

  inputName.classList.add('popup__input', 'popup__input-name');
  inputName.id = 'floatingName';
  inputName.name = 'floatingName';
  inputName.type = 'text';


  inputMidname.classList.add('popup__input', 'popup__input-middlename');
  inputMidname.id = 'floatingLastName';
  inputMidname.name = 'floatingLastName';
  inputMidname.type = 'text';

  contactsBlock.classList.add('modal__contact');
  popupAddContact.classList.add('popup__btn-add', 'popup__btn-contact', 'popup__btn-contact--active');
  popupAddContact.classList.add('popup__btn-text');
  popupAddContact.type = 'button';
  popupAddContact.id = 'add-new';
  popupAddContact.innerHTML = 'Добавить контакт';
  popupAddContactSpan.classList.add('popup__btn-img');
  popupAddContactImg.src = './img/add_circle_outline.svg';
  popupAddContactImg.alt = 'добавить контакт';
  saveBtn.type = 'submit';
  saveBtn.classList.add('popup__btn-save');
  saveBtn.id = 'submit';
  saveBtn.innerHTML = 'Сохранить';
  resetBtn.classList.add('popup__btn-cancel', 'popup__underline')
  resetBtn.type = 'reset';
  resetBtn.innerHTML = modalWindowStructure.headTitle().button;

  popup.append(popupBody);
  saveBtn.prepend(savePopupSpinner);
  popupBody.append(popupContent);
  popupContent.append(popupClose, popupForm);
  contactsBlock.append(popupAddContact);
  errorBlock.append(unacceptabbleLetter, writeName, writeSurname, writeLastname, requiredValue, requiredContacts);
  popupForm.append(popupHeader, popupFormMain, contactsBlock, errorBlock, saveBtn, resetBtn);
  popupFormMain.append(labelSurname, inputSurname, labelName, inputName, labelMidname,
    inputMidname);
  popupAddContactSpan.append(popupAddContactImg);
  popupAddContact.append(popupAddContactSpan);

  
  const refreshLabels = () => {
    labelSurname.classList.remove('popup__label--placeholder');
    labelSurname.classList.add('popup__label--label');
    labelName.classList.remove('popup__label--placeholder');
    labelName.classList.add('popup__label--label');
    labelMidname.classList.remove('popup__label--placeholder');
    labelMidname.classList.add('popup__label--label');
  }

  const refreshPlaceholders = () => {
    labelSurname.classList.add('popup__label--placeholder');
    labelSurname.classList.remove('popup__label--label');
    labelName.classList.add('popup__label--placeholder');
    labelName.classList.remove('popup__label--label');
    labelMidname.classList.add('popup__label--placeholder');
    labelMidname.classList.remove('popup__label--label');
  }

  const refreshInputs = () => {
    inputSurname.value = '';
    inputName.value = '';
    inputMidname.value = '';
  }

  const inputsListener = () => {
            
    const inputs = document.querySelectorAll('.popup__input');
    const labels = document.querySelectorAll('.popup__label');
    inputs.forEach((input) => {
        input.onfocus = () => {
            labels.forEach((label) => {
                if (label.getAttribute('for') === input.getAttribute('name') || input.value != 0) {
                    label.classList.remove('popup__label--placeholder');
                    label.classList.add('popup__label--label');
                }
  
            })
        }
        input.onblur = () => {
            labels.forEach((label) => {
                if (label.getAttribute('for') === input.getAttribute('name') && input.value < 1) {
                    label.classList.remove('popup__label--label');
                    label.classList.add('popup__label--placeholder');
                }
            })
        }
    })
  }

  popupAddContact.addEventListener('click', function (e) {
    e.preventDefault();

    const contactItem = createContactItem();
    const contactsItems = document.getElementsByClassName('contact');

    if (contactsItems.length < 9) {
      contactsBlock.prepend(contactItem.contact);
      contactsBlock.style.backgroundColor = 'var(--athenths-grey)';
      contactsBlock.style = 'padding: 25px 0';
    } else {
      contactsBlock.prepend(contactItem.contact)
      popupAddContact.classList.remove('popup__btn-contact--active')
    }
  })

  resetBtn.addEventListener('click', () => {
    popup.remove();
  })


  // Клик на оверлей
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup__close') ||
      event.target.classList.contains('popup__body')) {
      popup.remove();
    }
  });

  return {
    popup,
    popupForm,
    popupFormMain,
    labelSurname,
    inputSurname,
    labelName,
    inputName,
    labelMidname,
    inputMidname,
    contactsBlock,
    popupHeader,
    popupAddContact,
    resetBtn,
    modalWindowStructure,
    popupClose,
    refreshLabels,
    refreshInputs,
    refreshPlaceholders,
    inputsListener
  }
}

