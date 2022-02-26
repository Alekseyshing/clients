import {
  getHeaders
} from './getHeaders.js'

export const sortTable = () => {

  const headTh = getHeaders();
  const sortingTable = document.querySelector('.table_sort');
  const sortHeaders = headTh.sortingHeaders;  
  const sortingBody = sortingTable.querySelector('tbody');

  const directions = sortHeaders.map(() => '');

  const transform = (type, content) => {
    switch (type) {
      case 'id':
        return parseFloat(content);
      case 'create':
      case 'update':
        return content.split('.').reverse().join('-');
        case 'text':
        default:
          return content
    }
  }

  const sortColumn = (index) => {
    const type = sortHeaders[index].getAttribute('data-type');
    const rows = sortingBody.querySelectorAll('tr');
    const direction = directions[index] || 'sortUp';
    const multiply = direction === 'sortUp' ? 1 : -1;
    const newRows = Array.from(rows);

    newRows.sort((row1, row2) => {
      const cellA = row1.querySelectorAll('td')[index].textContent;
      const cellB = row2.querySelectorAll('td')[index].textContent;

      const a = transform(type, cellA);
      const b = transform(type, cellB);

      switch (true) {
        case a > b: 
              return 1 * multiply;
        case a < b:
          return -1 * multiply;
        case a === b:
          return 0
      
        default:
          break;
      }

    });

    [].forEach.call(rows, (row) => {
      // sortingBody.remove(row);
      sortingBody.innerHTML = '';
    });

    directions[index] = direction === 'sortUp' ? 'sortDown' : 'sortUp'; 

    newRows.forEach(newRow => {
      sortingBody.append(newRow);
    })
  };



  [].forEach.call(sortHeaders, (header, index) => {
    header.addEventListener('click', () => {
      if (header.classList.contains('main__th--sort-down')) {
        header.classList.remove('main__th--sort-down');
        header.classList.add('main__th--sort-up');
      } else {
        header.classList.remove('main__th--sort-up');
        header.classList.add('main__th--sort-down');
      }
      sortColumn(index);
    });
  });

}
