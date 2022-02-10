export const sortingClientItems = () => {
  const table = document.querySelector('.table_sort');
  let colIndex = -1;

  const sortTable = function (index, type, isSorted) {
    const tbody = document.querySelector('#table-body');

    const compare = function (rowA, rowB) {
      const rowDataA = rowA.cells[index].innerHTML;
      const rowDataB = rowB.cells[index].innerHTML;

      switch (type) {
        case 'integer':
          return rowDataA - rowDataB;
          break;
        case 'date':
          const dateA = rowDataA.split('.').reverse().join('-');
          const dateB = rowDataB.split('.').reverse().join('-');
          return new Date(dateA).getTime() - new Date(dateB).getTime();
          break
        case 'text':
          if(rowDataA < rowDataB) return -1;
          if(rowDataA > rowDataB) return 1;
          return 0
          break
      }
    }

    let rows = [].slice.call(tbody.rows);

    rows.sort(compare);

    if(isSorted) rows.reverse();

    for (let i = 0; i < rows.length; i++) {
      tbody.append(rows[i])
    }

    table.append(tbody);
  }

  table.addEventListener('click', (e) => {
    let elem = e.target;
    if (elem.nodeName !== 'TH') return;


    const index = elem.cellIndex;

    const type = elem.getAttribute('data-type');

    sortTable(index, type, colIndex === index);
    colIndex = (colIndex === index) ? -1 : index;
  })
}

