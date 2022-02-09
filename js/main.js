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
    getClients,
    sendClientData
} from "./clientsApi.js";
import { createPreloader } from "./preLoader.js";
import { validateClientForm } from './validateForm.js'
import { validateClientContact } from "./validateContact.js";


const createApp = async () => {
    const headers = getHeaders();
    const tableBody = document.querySelector('.main__block');
    tableBody.append(createPreloader());
    // const clients = await getClients();

    //Тело таблицы
    const modal = createModal();
    modal.modalWindowStructure.type = 'new';


    const preloader = document.querySelector('.preloader');

    // preloader.remove();

    try {
        const clients = await getClients();

        for (const client of clients) {
            document.querySelector('.main__block').append(getNewRow(client).tr)
        }
    } catch (error) {
        console.log(error);
    } finally {
        preloader.remove();
    }


    // for (const client of clients) {
    //     document.querySelector('.main__block').append(getNewRow(client).tr)
    // }



    //Новый клиент
    const addButton = document.querySelector('.main__add-client-btn');

    addButton.addEventListener('click', async function (el) {
        el.preventDefault();
        modal.modalWindowStructure.type = 'new';
        document.body.append(modal.popup);
        modal.refreshInputs();
        modal.refreshPlaceholders();
        modal.popupHeader.innerHTML = modal.modalWindowStructure.headTitle().title;
        const idSpan = document.querySelector('.body-cells_change');
        modal.contactsBlock.style = 'padding: 0';
        const contactsToDelete = document.querySelectorAll('.contact');
        modal.inputsListener();

        const refreshContacts = (contacts) => {
            contacts.forEach(contact => contact.remove())
        }

        refreshContacts(contactsToDelete);

        if (idSpan) {
            idSpan.classList.add('visually-hidden');
        }
        modal.resetBtn.innerHTML = modal.modalWindowStructure.headTitle().button;
        modal.resetBtn.classList.remove('popup__underline');
    })

    modal.popupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!validateClientForm()) {
            return
        }

        const typesOfContacts = document.querySelectorAll('.contact__name');
        const typesOfValues = document.querySelectorAll('.contact__input');

        let contacts = [];
        let newClient = {};

        for (let i = 0; i < typesOfContacts.length; i++) {
            if (!validateClientContact(typesOfContacts[i], typesOfValues[i])) {
                return;
            }
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
        const spinner = document.querySelector('.popup__spinner');


        if (modal.modalWindowStructure.type === 'new') {
            try {
                spinner.style.display = 'block';
                const newClients = await sendClientData(newClient, 'POST');
                setTimeout(() => {
                    document.querySelector('.main__block').append(getNewRow(newClients).tr);
                    modal.popup.remove();
                }, 300)
            } catch (error) {
                console.log(error);
            } finally {
                setTimeout(() => spinner.style.display = 'none', 300)
            }
        }
    })

    // Нажатие на Esc
    document.addEventListener('keydown', function (event) {
        if (event.code === "Escape") {
            modal.popup.remove();
            modal.refreshInputs();
        }
    });

}



createApp();