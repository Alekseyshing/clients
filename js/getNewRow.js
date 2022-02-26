import {
  deleteClient
} from "./clientsApi.js";
import {
  createContactElementByType
} from "./createContact.js";
import {
  createModalDelete
} from "./createModalDel.js";
import {
  editClientsItem
} from "./editClient.js";
import {
  svgChangeSpinner,
  svgDeleteSpinner
} from "./svg.js";
import {
  createModal
} from "./createModal.js"

export const getNewRow = (client) => {

  // Получаем дату из json
  function formatDate(str) {
      return str.slice(8, 10) + '.' + str.slice(5, 7) + '.' + str.slice(0, 4);
  }

  // Получаем время из json
  function formatTime(str) {
      return str.slice(11, 16);
  }

  const modalDelete = createModalDelete();
  const modalEdit = editClientsItem(client);
  const modalWindowEdit = createModal();

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

  const editSpinner = document.createElement('span');
  const deleteSpinner = document.createElement('span');


  editSpinner.classList.add('main__actions-spinner');
  deleteSpinner.classList.add('main__actions-spinner');

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


  buttonEdit.innerHTML = 'Изменить';
  buttonDelete.innerHTML = 'Удалить';
  editSpinner.innerHTML = svgChangeSpinner;
  deleteSpinner.innerHTML = svgDeleteSpinner;
  buttonEdit.append(editSpinner);
  buttonDelete.append(deleteSpinner);
  tdActions.append(buttonEdit, buttonDelete);

  for (let contact of client.contacts) {
      createContactElementByType(contact.type, contact.value, tdContacts);

      const contactNumber = client.contacts.indexOf(contact) + 1;
      const hiddenContacts = client.contacts.length - 4;
      const showMoreContactsBtn = document.createElement('button');
      // const maxContactsShows = 4;

      showMoreContactsBtn.classList.add('contact__show', 'contacts__link');


      if (contactNumber === 4 && hiddenContacts !== 0) {
          showMoreContactsBtn.textContent = `+${hiddenContacts}`;
          tdContacts.append(showMoreContactsBtn);
      }

      let i = 0;

      const newArr = Array.from(tdContacts.childNodes);

      for (i = 0; i < newArr.length; i++) {
          if (i > 4) {
              newArr[i].classList.add('contact__hidden')
          }
      }

      showMoreContactsBtn.addEventListener('click', () => {
          tdContacts.childNodes.forEach(child => child.classList.remove('contact__hidden'));
          showMoreContactsBtn.remove();
      });
  }


  tr.id = client.id; // Для поиска клиентов в таблице и скролла к ним
  buttonEdit.setAttribute('data-id', client.id);
  buttonDelete.setAttribute('data-id', client.id);

  //Создаем укороченный Id
  const substringAnyId = (id) => {
      id = id.substring(0, 3) + id.substring(8, 11);
      return id
  }

  //удаление по нажатию на Enter
  const deleteClientByEnter = () => {
      document.addEventListener('keydown', (event) => {
          if (event.code === 'Enter') {
              if (document.getElementById(client.id)) {
                  deleteClient(client.id);
                  document.getElementById(client.id).remove();
                  modalDelete.modalDel.remove();
              }
          }
      })
  };

  buttonDelete.addEventListener('click', (e) => {
      deleteClientByEnter();
      e.preventDefault();
      deleteSpinner.style.display = 'block';
      buttonDelete.classList.add('main__actions-wait')
      setTimeout(() => {
          e.preventDefault();
          document.body.append(modalDelete.modalDel);
          deleteSpinner.style.display = 'none';
          buttonDelete.classList.remove('main__actions-wait')
      }, 300)
  })

  //удаление по клику
  modalDelete.deleteClientBtn.addEventListener('click', (e) => {
      e.preventDefault();
      try {
          modalDelete.deleteSpinner.style.display = 'block';
          setTimeout(() => {
              deleteClient(client.id);
              document.getElementById(client.id).remove();
              modalDelete.modalDel.remove();
          }, 300)
      } catch (error) {
          console.log(error);
      } finally {
          setTimeout(() => modalDelete.deleteSpinner.style.display = 'block', 300);
      }
  })


  buttonEdit.addEventListener('click', (e) => {
      e.preventDefault();
      editSpinner.style.display = 'block';
      buttonEdit.classList.add('main__actions-wait');
      modalWindowEdit.modalWindowStructure.type = 'change';
      setTimeout(() => {
          e.preventDefault();
          document.body.append(modalEdit.editModal);
          editSpinner.style.display = 'none';
          buttonEdit.classList.remove('main__actions-wait')
      }, 300)
  })

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