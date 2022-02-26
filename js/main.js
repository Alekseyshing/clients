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
    fetchSearchClients
} from "./clientsApi.js";
import {
    createPreloader
} from "./preLoader.js";
import {
    sortTable
} from "./sortingClients.js"
import {
    debounce
} from "./debounceFilter.js"



const createApp = async () => {
    const headers = getHeaders();
    const tableBody = document.querySelector('.main__block');
    tableBody.id = 'table-body';
    tableBody.innerHTML = ''
    tableBody.append(createPreloader());


    //Тело таблицы
    const modal = createModal();
    const preloader = document.querySelector('.preloader');
    const inputFilter = document.querySelector('#header__filter');
    

    try {
        const clients = await getClients();

        const clientsPrimaryState = () => {
            for (const client of clients) {
                document.querySelector('.main__block').append(getNewRow(client).tr);
            }
        }

        clientsPrimaryState();

        async function filterInput() {
            tableBody.innerHTML = '';
            const filteredClients = await fetchSearchClients(inputFilter.value.trim());

            filteredClients.forEach(filteredClient => {
                if (inputFilter.value) {
                    document.querySelector('.main__block').append(getNewRow(filteredClient).tr);
                }
            })
            clientsPrimaryState();
        }

        inputFilter.addEventListener('keyup', debounce(filterInput, 300))

    } catch (error) {
        console.log(error);
    } finally {
        preloader.remove();
    }



    // //Новый клиент
    const addButton = document.querySelector('.main__add-client-btn');

    addButton.addEventListener('click', async function(el) {
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
}

createApp();
document.addEventListener('DOMContentLoaded', sortTable);