export const getHeaders = () => {

  const headThId = document.querySelector('.main__th--id');
  const headThFullname = document.querySelector('.main__th--name');
  const headThCreatedate = document.querySelector('.main__th--date');
  const headThUpdatedate = document.querySelector('.main__th--change');
  const headThContacts = document.querySelector('.main__th--contacts');
  const headThActions = document.querySelector('.main__th--actions');
  const headTr = document.querySelector('.main__header')


  headThId.id = 'id';
  headThFullname.id = 'fullname';
  headThCreatedate.id = 'createdAt';
  headThUpdatedate.id = 'updatedAt';
  headThContacts.id = 'contacts';
  headThActions.id = 'actions';

  headTr.append(headThId, headThFullname, headThCreatedate, headThUpdatedate, headThContacts,
      headThActions)

  return headTr
}