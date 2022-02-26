import { patchClientData } from './clientsApi.js';
import { createContactItem } from './createContact.js';
import { createModal } from './createModal.js';
import { createModalDelete } from './createModalDel.js';
import { getNewRow } from './getNewRow.js';
import {
    validateClientForm
} from './validateForm.js'
import {
    validateClientContact
} from "./validateContact.js";

export const editClientsItem = (data) => {
    const editModal = document.createElement('div');
    const editBody = document.createElement('div');
    const editModalContent = document.createElement('div');
    const createForm = createModal();
    const titleId = document.createElement('span');

    titleId.classList.add('popup__title-id');
    editBody.classList.add('popup__body');
    editModal.classList.add('popup', 'site-modal', 'modal-active');
    editModalContent.classList.add('popup__content', 'site-modal__content', 'modal-active');

    titleId.textContent = 'ID: ' + data.id.substring(0, 3) + data.id.substring(8, 11);
    createForm.modalWindowStructure.type = 'change';
    createForm.popupHeader.textContent = createForm.modalWindowStructure.headTitle().title;
    createForm.resetBtn.textContent = createForm.modalWindowStructure.headTitle().button;
 

    createForm.resetBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const deleteModal = createModalDelete();
        document.body.append(deleteModal.modalDel);

        import('./clientsApi.js').then(({ deleteClient }) => {
            deleteModal.deleteClientBtn.addEventListener('click', () => {
                try {
                    deleteModal.deleteSpinner.style.display = 'block';
                    setTimeout(() => {
                        deleteClient(data.id);
                        document.getElementById(data.id).remove();
                        deleteModal.modalDel.remove();
                        editModal.remove();
                    }, 300)

                } catch (error) {
                    console.log(error);
                } finally {
                    setTimeout(() => deleteModal.deleteSpinner.style.display = 'none', 300)
                }
            });
            //удаление по нажатию на Enter
            document.addEventListener('keydown', (event) => {
                if (event.code === 'Enter') {
                    document.getElementById(data.id).remove();
                    deleteClient(data.id);
                    deleteModal.modalDel.remove();
                    editModal.remove();
                }
            })
        });
    });

    createForm.popupClose.addEventListener('click', () => {
        editModal.remove();
    });

    if (createForm.inputName.length !== '') {
        createForm.labelSurname.classList.remove('popup__label--placeholder');
        createForm.labelName.classList.remove('popup__label--placeholder');
        createForm.labelMidname.classList.remove('popup__label--placeholder');
    }

    createForm.inputName.value = data.name;
    createForm.inputSurname.value = data.surname;
    createForm.inputMidname.value = data.lastName;



    for (const contact of data.contacts) {
        const createContact = createContactItem();

        createContact.contactName.textContent = contact.type;
        createContact.contactInput.value = contact.value;

        createForm.contactsBlock.prepend(createContact.contact);
        createForm.contactsBlock.style.backgroundColor = 'var(--athens-gray)';
        if (data.contacts.length >= 1) {
            createForm.contactsBlock.classList.add('popup__btn-contact--active')
            createForm.contactsBlock.style.backgroundColor = 'var(--athenths-grey)';
            createForm.contactsBlock.style = 'padding: 25px 0';
        }
    }

    createForm.popupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateClientForm()) {
            return
        }

        const contactTypes = document.querySelectorAll('.contact__name');
        const contactValues = document.querySelectorAll('.contact__input');
        let contacts = [];
        let client = {};

        for (let i = 0; i < contactTypes.length; i++) {
            if (!validateClientContact(contactTypes[i], contactValues[i])) {
                return;
            }
            contacts.push({
                type: contactTypes[i].innerHTML,
                value: contactValues[i].value
            });
        }

        client.name = createForm.inputName.value;
        client.surname = createForm.inputSurname.value;
        client.lastName = createForm.inputMidname.value;
        client.contacts = contacts;

        const spinner = document.querySelector('.popup__spinner');

        if (createForm.modalWindowStructure.type === 'change') {
            try {
                spinner.style.display = 'block';
                const editedData = await patchClientData(client, data.id);
                setTimeout(() => {
                    document.querySelector('.main__block').replaceChild(getNewRow(editedData).tr, document.getElementById(editedData.id));
                    editModal.remove();
                }, 300)
            } catch (error) {
                console.log(error);
            } finally {
                setTimeout(() => spinner.style.display = 'block', 300)
            }
        } else return
    });

    createForm.popupHeader.append(titleId);
    editBody.append(editModalContent);
    editModalContent.append(createForm.popupClose, createForm.popupHeader, createForm.popupForm);
    editModal.append(editBody);

    document.addEventListener('click', (e) => {
        if (e.target == editModal) {
            editModal.remove();
        }
    });

    return {
        editModal,
        editModalContent
    }
}