  //Закрываем модальное окно
  export const closeModalWindow = () => {
    if (popup.classList.remove('popup__open')) {
      popup.classList.remove('popup__open');
    }
  }