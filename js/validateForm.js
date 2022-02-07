export const validateClientForm = () => {
  const userName = document.getElementById('floatingName');
  const userSurname = document.getElementById('floatingSurname');
  const userLastName = document.getElementById('floatingLastName');
  const unacceptabbleLetter = document.getElementById('unacceptabbleLetter');
  const writeName = document.getElementById('writeName');
  const writeSurname = document.getElementById('writeSurname');
  const writeLastname = document.getElementById('writeLastname');
  const requiredValue = document.getElementById('requiredValue');
  const requiredContacts = document.getElementById('requiredContacts');
  const validateArray = [unacceptabbleLetter, writeName, writeSurname, writeLastname, requiredValue];
  const regexp = /[^а-яА-ЯёЁ]+$/g;

  const onInputValue = input => {
    input.addEventListener('input', () => {
      input.style.borderColor = "var(--grey-suit)";
      for(const item of validateArray){
        item.textContent = ''
      }
    });

    input.oncut = input.oncopy = input.onpaste = () => {
      input.style.borderColor = "var(--grey-suit)";
      for(const item of validateArray){
        item.textContent = '';
      }
    };

    input.onchange = () => {
      input.style.borderColor = "var(--grey-suit)";
      if( userSurname.value && userName.value && userLastName.value){
        for(const item of validateArray){
          item.textContent = '';
        }
      }
    }
  };

  onInputValue(userSurname);
  onInputValue(userName);
  onInputValue(userLastName);

  const checkRequiredName = (input, message, name) => {
    if(!input.value){
      input.style.borderColor = "var(--burant-sienna)";
      message.textContent = `Введите ${name} клиента`;
      return false; 
    }else {
      message.textContent = '';
      return true;
    }
  }

  const checkByRegexp = (input, regexp ) => {
    if(regexp.test(input.value)){
      input.style.borderColor = "var(--burant-sienna)";
      unacceptabbleLetter.textContent = 'Недопустимые символы!';
      return false;
    }

    return true;
  };

  if(!checkRequiredName(userSurname, writeSurname, 'Фамилию')){ return false };
  if(!checkRequiredName(userName, writeName, 'Имя')){ return false };
  if(!checkRequiredName(userLastName, writeLastname, 'Отчество')){ return false };
  if(!checkByRegexp(userSurname, regexp)){ return false };
  if(!checkByRegexp(userName, regexp)){ return false };
  if(!checkByRegexp(userLastName, regexp)){ return false };

  return true;
}