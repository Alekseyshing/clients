import {
    getHeaders
} from "./getHeaders.js";
import {
    getNewRow
} from "./getNewRow.js";
import {
    createModal
} from "./createModal.js";
import {
    createModalDelete
} from "./createModalDel.js"
import {
    closeModalWindow
} from "./closeModalWindow.js";
import {
    createContactItem
} from "./createContact.js";
import {
    getClients,
    deleteClient,
    getClientById,
    sendClientData
} from "./clientsApi.js";
import { createPreloader } from "./preLoader.js";


const createApp = async () => {
    const headers = getHeaders();
    const tableBody = document.querySelector('.main__block');
    tableBody.append(createPreloader());

    const clients = await getClients();

    const substringAnyId = function (id) {
        id = id.substring(0, 3) + id.substring(8, 11);
        return id
    }

    //Тело таблицы

    const container = document.querySelector('.container');
    const modal = createModal();
    container.append(modal.popup);
    modal.modalWindowStructure.type = 'new';
    const modalDelete = createModalDelete();
    container.append(modalDelete.modalDel);

    const inputs = document.querySelectorAll('.popup__input');
    const labels = document.querySelectorAll('.popup__label');
    const preloader = document.querySelector('.preloader');

    preloader.remove();


    for (const client of clients) {
        document.querySelector('.main__block').append(getNewRow(client).tr)
    }



    const inputsListener = () => {
        inputs.forEach(function (input) {
            input.onfocus = function () {
                labels.forEach(function (label) {
                    if (label.getAttribute('for') === input.getAttribute('name') || input.value != 0 ||
                        modal.modalWindowStructure.type === 'change') {
                        label.classList.remove('popup__label--placeholder');
                        label.classList.add('popup__label--label');
                    }
                })
            }
            input.onblur = function () {
                labels.forEach(function (label) {
                    if (label.getAttribute('for') === input.getAttribute('name') && input.value < 1) {
                        label.classList.remove('popup__label--label');
                        label.classList.add('popup__label--placeholder');
                    }
                })
            }
        })
    }

    inputsListener();


    const closeModalDelete = () => {
        modalDelete.modalDel.classList.remove('delete-window__open')
    }

    //Удаление строки таблицы и клиента с сервера по id
    const deleteListItems = () => {
        const btnsDel = document.querySelectorAll('.delete-btn');
        const delBtns = document.querySelectorAll('.delete-window__del-btn');

        btnsDel.forEach(button => {
            button.addEventListener('click', function (e) {

                e.preventDefault();
                const clientId = this.dataset.id;
                modalDelete.modalDel.classList.add('delete-window__open');

                //удаление по нажатию на Enter
                document.addEventListener('keydown', function (event) {
                    if (event.code === 'Enter') {
                        event.preventDefault();
                        clients.forEach(function (client) {
                            if (client.id === clientId) {
                                document.getElementById(clientId).remove();
                                deleteClient(clientId);
                            }
                        })
                        closeModalDelete();
                    }
                })

                //удаление по клику
                delBtns.forEach(function (delBtn) {
                    delBtn.addEventListener('click', function (evt) {
                        evt.preventDefault();
                        clients.forEach(function (client) {
                            if (client.id === clientId) {
                                deleteClient(clientId);
                                document.getElementById(clientId).remove();
                            }
                        })
                        closeModalDelete();
                    })
                })
            })

            return {
                tableBody
            }
        })
    }

    deleteListItems();

    //Изменить клиента по id

    const changeClientData = () => {

        const changeBtns = document.querySelectorAll('.edit-btn');
        const popupIdSelector = document.createElement('span');
        popupIdSelector.value = '';

        changeBtns.forEach(button => {
            button.addEventListener('click', async function () {
                const clientId = this.dataset.id;
                modal.modalWindowStructure.type = 'change';
                modal.popup.classList.add('popup__open');
                modal.refreshLabels();
                let popupHead = document.querySelector('.popup__title');
                let client = await getClientById(clientId);
                popupIdSelector.innerHTML = 'ID:' + `${substringAnyId(clientId)}`;
                popupIdSelector.classList.remove('visually-hidden');
                popupIdSelector.classList.add('body-cells_change');
                const popupFormMain = document.querySelector('.popup__form-main');
                popupFormMain.append(popupIdSelector);
                const deleteClientBtn = document.querySelector('.popup__btn-cancel');
                popupHead.innerHTML = modal.modalWindowStructure.headTitle().title;
                modal.resetBtn.innerHTML = modal.modalWindowStructure.headTitle().button;
                modal.resetBtn.classList.add('popup__underline');

                modal.inputSurname.value = client.surname;
                modal.inputName.value = client.name;
                modal.inputMidname.value = client.lastName;

                if (modal.modalWindowStructure.type === 'change') {
                    for (const contact of client.contacts) {
                        const createContact = createContactItem();

                        createContact.contactName.textContent = contact.type;
                        createContact.contactInput.value = contact.value;

                        modal.contactsBlock.prepend(createContact.contact);
                        modal.contactsBlock.style.backgroundColor = 'var(--athenths-grey)';
                        modal.contactsBlock.style = 'padding: 25px 0';
                    }
                }


                if (client.contacts.length === 10) {
                    modal.popupAddContact.classList.remove('popup__btn-contact--active')
                }

                modal.popupForm.addEventListener('submit', (event) => {
                    event.preventDefault();

                    const contactTypes = document.querySelectorAll('.contact__name');
                    const contactValues = document.querySelectorAll('.contact__input');

                    console.log(contactTypes);

                    let contacts = [];
                    let data = {};

                    for (let i = 0; i < contactTypes.length; i++) {
                        contacts.push({
                            type: contactTypes[i].innerHTML,
                            value: contactValues[i].value
                        })
                    }

                    data.surname = modal.inputSurname.value;
                    data.name = modal.inputName.value;
                    data.lastName = modal.inputMidname.value;
                    data.contacts = contacts;

                    modal.modalWindowStructure.type = 'change';

                    if (modal.modalWindowStructure.type = 'change') {
                        sendClientData(data, 'PATCH', client.id);

                        closeModalWindow();
                    }
                })

                deleteClientBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    modalDelete.modalDel.classList.add('delete-window__open');
                    modalDelete.deleteClientBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        deleteClient(clientId);
                    })

                    //удаление по нажатию на Enter
                    document.addEventListener('keydown', function (event) {
                        if (event.code === 'Enter') {
                            event.preventDefault();
                            deleteClient(clientId);
                        }
                    })

                    modalDelete.modalDelClose.addEventListener('click', (e) => {
                        e.preventDefault();
                        modalDelete.closeModalDel();
                    })
                })
            })
        })
    }

    changeClientData();

    const addButton = document.querySelector('.main__add-client-btn');
    const closeModalBtn = document.querySelector('.popup__close');

    addButton.addEventListener('click', async function (el) {
        el.preventDefault();
        modal.modalWindowStructure.type = 'new';
        modal.popup.classList.add('popup__open');
        modal.refreshInputs();
        modal.refreshPlaceholders();
        modal.popupHeader.innerHTML = modal.modalWindowStructure.headTitle().title;
        const idSpan = document.querySelector('.body-cells_change');
        modal.contactsBlock.style = 'padding: 0';
        const contactsToDelete = document.querySelectorAll('.contact');

        const refreshContacts = (contacts) => {
            contacts.forEach(contact => contact.remove())
        }

        refreshContacts(contactsToDelete);

        if (idSpan) {
            idSpan.classList.add('visually-hidden');
        }
        modal.resetBtn.innerHTML = modal.modalWindowStructure.headTitle().button;
        modal.resetBtn.classList.remove('popup__underline');

        modal.popupForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const typesOfContacts = document.querySelectorAll('.contact__name');
            const typesOfValues = document.querySelectorAll('.contact__input');

            let contacts = [];
            let newClient = {};

            for (let i = 0; i < typesOfContacts.length; i++) {
                contacts.push({
                    type: typesOfContacts[i].innerHTML,
                    value: typesOfValues[i].value
                })
            }

            newClient.surname = modal.inputSurname.value;
            newClient.name = modal.inputName.value;
            newClient.lastName = modal.inputMidname.value;
            newClient.contacts = contacts;

            modal.modalWindowStructure.type = 'new';

            if (modal.modalWindowStructure.type = 'new') {
                try {
                    const newClients = await sendClientData(newClient, 'POST');
                    console.log(newClients);
                    console.log(getNewRow(newClients));
                    document.querySelector('.main__block').append(getNewRow(newClients).tr);
                    closeModalWindow();
                    newClient = {};
                } catch (error) {
                    console.log(error);
                }

            }
        })

        // Клик закрытия модального окна
        closeModalBtn.addEventListener('click', function (e) {
            e.preventDefault();
            closeModalWindow();
            modal.refreshInputs();
        })
    })

    const cancellBtn = document.querySelector('.popup__btn-cancel');

    cancellBtn.addEventListener('click', function (ev) {
        ev.preventDefault();
        closeModalWindow();
        modal.refreshInputs();
    })


    // Нажатие на Esc
    document.addEventListener('keydown', function (event) {
        if (event.code === "Escape") {
            closeModalWindow();
            modal.refreshInputs();
        }
    });

    //Добавить контакт 
    modal.popupAddContact.addEventListener('click', function (e) {
        e.preventDefault();

        const contactItem = createContactItem();
        const contactsItems = document.getElementsByClassName('contact');

        if (contactsItems.length < 9) {
            modal.contactsBlock.prepend(contactItem.contact);
            modal.contactsBlock.style.backgroundColor = 'var(--athenths-grey)';
            modal.contactsBlock.style = 'padding: 25px 0';
        } else {
            modal.contactsBlock.prepend(contactItem.contact)
            modal.popupAddContact.classList.remove('popup__btn-contact--active')
        }
    })
}

createApp();