export const createModalDelete = () => {
    const modalDel = document.createElement('div');
    modalDel.classList.add('delete-window');
    const deleteBody = document.createElement('div');
    deleteBody.classList.add('delete-window__body');
    const deleteBlock = document.createElement('div');
    deleteBlock.classList.add('delete-window__block');
    const modalHeader = document.createElement('h2');
    modalHeader.classList.add('delete-window__heder');
    const modalDelClose = document.createElement('a');
    modalDelClose.classList.add('delete-window__close-btn');
    modalHeader.innerHTML = 'Удалить клиента';
    const modalText = document.createElement('p');
    modalText.classList.add('delete-window__text');
    modalText.innerHTML = 'Вы действительно хотите удалить данного клиента?'
    const deleteClientBtn = document.createElement('button');
    deleteClientBtn.type = 'click';
    deleteClientBtn.classList.add('delete-window__del-btn');
    deleteClientBtn.innerHTML = 'Удалить';
    const cancelDeleteClient = document.createElement('button');
    cancelDeleteClient.classList.add('delete-window__cancel-btn');
    cancelDeleteClient.innerHTML = 'Отмена';
    cancelDeleteClient.type = 'reset';

    deleteBlock.append(modalDelClose, modalHeader, modalText, deleteClientBtn, cancelDeleteClient);
    deleteBody.append(deleteBlock);
    modalDel.append(deleteBody);

    const closeModalDel = () => {
        modalDel.classList.remove('delete-window__open')
    }

    //Удалить по клику на кнопку
    cancelDeleteClient.addEventListener('click', function (e) {
        e.preventDefault();
        closeModalDel();
    })

    modalDelClose.addEventListener('click', function (e) {
        e.preventDefault();
        closeModalDel();
    })

    //Удалить по клику на область
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-window__close') ||
            event.target.classList.contains('delete-window__body')) {
            event.preventDefault();
            closeModalDel();
        }
    })

    // Нажатие на Esc
    document.addEventListener('keydown', function (event) {
        if (event.code === "Escape") {
            event.preventDefault();
            closeModalDel();
        }
    });

    return {
        modalDel,
        deleteBody,
        deleteBlock,
        deleteClientBtn,
        modalDelClose,
        closeModalDel
    }
}