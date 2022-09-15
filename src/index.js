import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { renderCountryCard, renderCountryMiniCard } from './js/renderCountryCard';

const DEBOUNCE_DELAY = 300;

const revs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

revs.searchBox.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) {
    e.preventDefault();
    //this.countryName = e.currentTarget.value;
    let countryName = revs.searchBox.value;
    if (countryName === '') {
        revs.countryList.innerHTML = '';
        revs.countryInfo.innerHTML = '';
        return;
    }
    
    fetchCountries(countryName)
        .then(countrys => {
            if (countrys.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
                revs.countryList.innerHTML = '';
                revs.countryInfo.innerHTML = '';
                return;
            };
            if (countrys.length <= 10) {
                const markapCountryMiniCard = countrys.map(country => renderCountryMiniCard(country)).join('').trim();
                
                revs.countryList.innerHTML = markapCountryMiniCard;
                revs.countryInfo.innerHTML = '';
            }
            if (countrys.length === 1) {
                
                const markapCountryCard  = countrys.map(country => renderCountryCard(country)).join('').trim();

                revs.countryList.innerHTML = '';
                revs.countryInfo.innerHTML = markapCountryCard;
            }
        }
    ).cath(error => {
        Notify.failure('Oops, there is no country with that name');
        revs.countryList.innerHTML = '';
        revs.countryInfo.innerHTML = '';
        return error
    });
}