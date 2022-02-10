export const tableFilter = () => {
    const inputFilteredName = document.getElementById('header__filter');
    let print;

    inputFilteredName.addEventListener('keyup', function () {
        clearTimeout(print);
        print = setTimeout(function () {
            let filter = inputFilteredName.value.toLocaleLowerCase(),
                filterElements = document.querySelectorAll('#table-body tr');

            filterElements.forEach(item => {
                if (item.innerHTML.toLocaleLowerCase().indexOf(filter) > -1) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            })
        }, 300);
    })
}






