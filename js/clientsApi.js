const URI = 'http://localhost:3000/api/clients';
const DELAY_TIME = 300; //300 мс установлено тех. заданием


const delay = ms => {
  return new Promise(r => setTimeout(() => r(), ms));
};


export const getClients = async () => {

  await delay(DELAY_TIME); // установка задержки

  try {
    const response = await fetch(URI, {
      method: 'GET'
    })

    const result = await response.json();

    return result
  } catch (error) {
    console.log("Ошибка HTTP: " + response.status)
  }

}

export const getClientById = async (id) => {
  try {
    await delay(DELAY_TIME); // установка задержки
    const response = await fetch(`${URI}/${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export const deleteClient = async (id) => {
  const response = await fetch(`${URI}/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.status === 200) {
      console.log(response);
    }
  }).catch(() => {
    throw new Error(`Ошибка по адресу: ${URI}, статус ошибки: ${response.status}`)
  })

  return response;
};

export const sendClientData = async (client, method, id = null) => {
  try {
    const response = await fetch(`http://localhost:3000/api/clients/${method === 'POST' ? '' : id}`, {
      method,
      body: JSON.stringify(client)
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

// Ищем клиентов
export const fetchSearchClients = async (search) => {
  try {
    await delay(300); // установка задержки
    const fetchUrl = `http://localhost:3000/api/clients/?search=`+`${search}`;
    const response = await fetch(fetchUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};