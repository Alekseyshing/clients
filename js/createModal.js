import {
  closeModalWindow
} from "./closeModalWindow.js";



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
  labelSurname.setAttribute('for', 'surname');
  labelSurname.innerHTML = 'Фамилия*';
  labelName.classList.add('popup__label', 'popup__label--placeholder');
  labelName.setAttribute('for', 'name');
  labelName.innerHTML = 'Имя*';
  labelMidname.classList.add('popup__label', 'popup__label--placeholder');
  labelMidname.setAttribute('for', 'mid-name');
  labelMidname.innerHTML = 'Отчество';

  inputSurname.classList.add('popup__input');
  inputSurname.id = 'floatingSurname';
  inputSurname.classList.add('popup__input-surname');
  inputSurname.name = 'surname';
  inputSurname.type = 'text';

  inputName.classList.add('popup__input');
  inputName.id = 'floatingName';
  inputName.classList.add('popup__input-name');
  inputName.name = 'name';
  inputName.type = 'text';


  inputMidname.classList.add('popup__input');
  inputMidname.id = 'floatingLastName';
  inputMidname.classList.add('popup__input-middlename');
  inputMidname.name = 'mid-name';
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
  popupBody.append(popupContent);
  popupContent.append(popupClose, popupForm);
  contactsBlock.append(popupAddContact);
  errorBlock.append(unacceptabbleLetter, writeName, writeSurname, writeLastname, requiredValue, requiredContacts);
  popupForm.append(popupFormMain, contactsBlock, errorBlock, saveBtn, resetBtn);
  popupFormMain.append(popupHeader, labelSurname, inputSurname, labelName, inputName, labelMidname,
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


  // Клик на оверлей
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup__close') ||
      event.target.classList.contains('popup__body')) {
      closeModalWindow();
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
    refreshLabels,
    refreshInputs,
    refreshPlaceholders
  }
}

