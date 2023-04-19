import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const inputEl = document.getElementById('search-box');
const _ = require('lodash');

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', _.debounce(fetchCountries, DEBOUNCE_DELAY));
