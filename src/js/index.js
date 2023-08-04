import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectEl = document.querySelector('.breed-select');
const infoCatEl = document.querySelector('.cat-info');
const errorEl = document.querySelector('.error');
const loaderEl = document.querySelector('.loader');

loaderEl.classList.remove('.is-hidden');

selectEl.addEventListener('change', onSelectCat);

fetchBreeds()
  .then(breeds => {
    renderSelect(breeds);
    loaderEl.classList.add('is-hidden');
    selectEl.classList.remove('is-hidden');
  })
  .catch(() => {
    loaderEl.classList.add('is-hidden');
    Notify.failure(errorEl.textContent)
  })

function renderSelect(breeds) {
  const markup = breeds
    .map(({ name, id }) => {
      return ` <option value="${id}">${name}</option>`;
    })
    .join("");
  selectEl.innerHTML = markup;
  new SlimSelect({
    select: selectEl
  })
}

function onSelectCat(event) {
  loaderEl.classList.remove('is-hidden');
  infoCatEl.classList.add('is-hidden');
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(breeds => {
      infoCatEl.classList.remove('is-hidden');
      loaderEl.classList.add('is-hidden');
      renderCardCat(breeds);
    })
    .catch(() => {
      loaderEl.classList.add('is-hidden');
      Notify.failure(errorEl.textContent)
    })

}

function renderCardCat(breeds) {
  const markup = breeds
    .map(
      ({
        url,
        breeds: [{ name, temperament, description, wikipedia_url }]
      }) => {
        return `
      <img class="cat-img" src="${url}" alt="cat ${name}" width="460px">
      <div class="cat-box">
        <h2 class="cat-tittle">${name}</h2>
        <p class="cat-description">${description}</p>
        <p class="cat-temperament"><span class="cat-info-subtitle">Temperament:</span> ${temperament}</p>
        <p class="cat-subtitle">Wikipedia: <a href="${wikipedia_url}" target="blank">${wikipedia_url}</a></p>
      </div>`;
      }
    )
    .join();
  infoCatEl.innerHTML = markup;
}
