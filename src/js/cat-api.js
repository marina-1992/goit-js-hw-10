import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common["x-api-key"] =
  'live_Q9nAZpmDFgMxKS7xcqxVXGPcs44RuZ9KlPWZK3KXF3cD3yoBuowwA7GRv3pQ9ckP';

// const selectEl = document.querySelector('.breed-select');
// const loaderEl = document.querySelector('.loader-box');

export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}/breeds`)
    .then((response) => {
      // loaderEl.classList.add('.is-hidden');
      // selectEl.classList.remove('.is-hidden');
      return (response.data)
    })
    .catch(error => {
      // loaderEl.classList.add('.is-hidden');
      console.error(error.message);
      Notify.failure(
        'Oops! Something went wrong! Try reloading the page or select another cat breed!',
        {
          position: 'center-center',
          timeout: 1000,
          width: '700px',
          fontSize: '24px',
        })
    })
};

export function fetchCatByBreed(breedId) {
  // loaderEl.classList.remove('is-hidden');
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then((response) => {
      // loaderEl.classList.remove('is-hidden');
      return (response.data)
    })
    .catch((error) => {
      // loaderEl.classList.add('is-hidden');
      console.error(error.message);
      Notify.failure(
        'Oops! Something went wrong! Try reloading the page or select another cat breed!',
        {
          position: 'center-center',
          timeout: 1000,
          width: '700px',
          fontSize: '24px',
        })
    })
};


// function getUserAccount() {
//   return axios.get('/user/12345');
// }

// function getUserPermissions() {
//   return axios.get('/user/12345/permissions');
// }

// Promise.all([fetchBreeds(), fetchCatByBreed(breedId)])
//   .then(function (results) {
//     const acct = results[0];
//     const perm = results[1];
//   });


//   .then((response) => {
//   if (!response.ok) {
//     throw new Error(response.status);
//   }
//   return response.json();
// })
