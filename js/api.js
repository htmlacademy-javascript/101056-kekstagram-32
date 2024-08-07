const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const API_ROUTE = {
  GET: `${BASE_URL}/data`,
  POST: `${BASE_URL}/`,
};


const getData = (successCallback, errorCallback) => fetch(API_ROUTE.GET)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(successCallback)
  .catch(errorCallback);

const sendData = (formData) =>
  fetch(API_ROUTE.POST, {
    method: 'POST',
    body: formData,
  });

export { getData, sendData };
