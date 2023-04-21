import Notiflix from 'notiflix';

const API_URL_COUNTRIES = 'https://restcountries.com/v3.1/name/';
const inputEl = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export function fetchCountries({ name = inputEl.value }) {
  return fetch(
    API_URL_COUNTRIES +
      name.trim() +
      '?fields=name,capital,population,flags,languages'
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(countries => {
      if (countries.length < 10 && countries.length > 1) {
        clear();
        renderList(countries);
      } else if (countries.length === 1) {
        clear();
        showCountryInfo(countries);
      } else if (countries.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })

    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      clear();
    });
}
function renderList(countries) {
  const markup = countries
    .map(country => {
      return `<li class='country-list-item'>
        <p class='name name__list'><img class='flag flag__list' src='${country.flags.svg}' />
          <span>${country.name.official}</span></p>
          `;
    })
    .join('');
  countryList.innerHTML = markup;
}

function showCountryInfo(countries) {
  const markup = countries.map(country => {
    return `
          <p class='name'><img class='flag' src='${country.flags.svg}' />
            <b> ${country.name.official}</b></p>
            <p><b>Capital:</b> ${country.capital}</p>
            <p><b>Population:</b> ${country.population}</p>
            <p><b>Languages:</b> ${Object.values(country.languages).join(
              ', '
            )}</p>
            `;
  });
  countryInfo.innerHTML = markup;
}

function clear() {
  countryList.innerHTML = ``;
  countryInfo.innerHTML = ``;
}
