import {
  createContactElementByType
} from "./createContact.js";

export const getNewRow = (client) => {

  // Получаем дату из json
  function formatDate(str) {
    return str.slice(8, 10) + '.' + str.slice(5, 7) + '.' + str.slice(0, 4);
  }

  // Получаем время из json
  function formatTime(str) {
    return str.slice(11, 16);
  }
  
  //Создаем строку в таблице с данными клиента
  const tr = document.createElement('tr');
  const tdId = document.createElement('td');
  const tdFullName = document.createElement('td');
  const tdCreateDate = document.createElement('td');
  const tdCreateDateTime = document.createElement('td');
  const tdUpdateDate = document.createElement('td');
  const tdUpdateDateTime = document.createElement('td');
  const tdContacts = document.createElement('td');
  const tdActions = document.createElement('td');
  const spanEdit = document.createElement('span');
  const spanDelete = document.createElement('span');

  const buttonEdit = document.createElement('button');
  const buttonDelete = document.createElement('button');


  tr.classList.add('search__items');
  tr.setAttribute('data-id', client.id);
  tdId.classList.add('row__cells', 'body-cells_id');
  tdFullName.classList.add('row__cells', 'body-cells_fullname');
  tdCreateDate.classList.add('row__cells', 'body-cells_createdate');
  tdCreateDateTime.classList.add('row__cells', 'body-cells_datetime');
  tdUpdateDate.classList.add('row__cells', 'body-cells_update');
  tdUpdateDateTime.classList.add('row__cells', 'body-cells_updatetime');
  tdContacts.classList.add('row__cells', 'body-cells_contacts');
  tdActions.classList.add('row__cells', 'body-cells_actions');
  buttonEdit.classList.add('edit-btn', 'btn');
  buttonDelete.classList.add('delete-btn', 'btn');
  buttonDelete.id = 'delete-btn';
  spanEdit.classList.add('span__edit-btn');
  spanDelete.classList.add('span__delete-btn');

  buttonEdit.innerHTML = 'Изменить';
  buttonDelete.innerHTML = 'Удалить';
  buttonEdit.append(spanEdit);
  buttonDelete.append(spanDelete);
  tdActions.append(buttonEdit, buttonDelete);

  for (let contact of client.contacts) {
    createContactElementByType(contact.type, contact.value, tdContacts)
  }

  tr.id = client.id; // Для поиска клиентов в таблице и скролла к ним
  buttonEdit.setAttribute('data-id', client.id);
  buttonDelete.setAttribute('data-id', client.id);

  //Создаем укороченный Id
  const substringAnyId = function (id) {
    id = id.substring(0, 3) + id.substring(8, 11);
    return id
  }

  tdId.innerHTML = substringAnyId(client.id);
  tdFullName.innerHTML = client.surname + " " + client.name + " " + client.lastName;

  tdCreateDate.innerHTML = formatDate(client.createdAt);
  tdCreateDateTime.innerHTML = formatTime(client.createdAt);
  tdUpdateDate.innerHTML = formatDate(client.updatedAt);
  tdUpdateDateTime.innerHTML = formatTime(client.updatedAt);

  tr.append(tdId, tdFullName, tdCreateDate, tdCreateDateTime, tdUpdateDate,
    tdUpdateDateTime, tdContacts, tdActions);

  return {
    tr
  }
}