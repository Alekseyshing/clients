export const getHeaders = () => {

  const headThId = document.querySelector('.main__th--id');
  const headThFullname = document.querySelector('.main__th--name');
  const headThFullnameSpan = document.querySelector('.main__th--name-span');
  const headThCreatedate = document.querySelector('.main__th--date');
  const headThUpdatedate = document.querySelector('.main__th--change');
  const headThContacts = document.querySelector('.main__th--contacts');
  const headThActions = document.querySelector('.main__th--actions');
  const headTr = document.querySelector('.main__header');

  headThFullname.append(headThFullnameSpan);

  headThId.id = 'id';
  headThFullname.id = 'fullname';
  headThCreatedate.id = 'createdAt';
  headThUpdatedate.id = 'updatedAt';
  headThContacts.id = 'contacts';
  headThActions.id = 'actions';
  headThId.setAttribute('data-type', 'id');
  headThFullname.setAttribute('data-type', 'text');
  headThCreatedate.setAttribute('data-type', 'create');
  headThUpdatedate.setAttribute('data-type', 'update');

  headThId.setAttribute('data-type', 'id');
  headThFullname.setAttribute('data-type', 'text');
  headThCreatedate.setAttribute('data-type', 'create');
  headThUpdatedate.setAttribute('data-type', 'update');

  const sortingHeaders = [headThId, headThFullname, headThCreatedate, headThUpdatedate]


  headTr.append(headThId, headThFullname, headThCreatedate, headThUpdatedate, headThContacts,
    headThActions)

  return {
    headTr,
    sortingHeaders
  }
}