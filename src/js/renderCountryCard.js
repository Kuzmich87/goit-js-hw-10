export function renderCountryCard({
  flags,
  name,
  capital,
  population,
  languages,
}) {
  return `<div class="contry-container">
               <div class="country-base-container">
                   <li class="country-list">
                   <img class="country-list-flags" src="${flags.svg}" alt="${name.official}" whith="25">
                   <h2 class="country-list-name">${name.official}</h2>
                   </li>  
                </div>
                <p class="country-list-capital">Capital: ${capital}</p>
                <p class="country-list-population">Population: ${population}</p>
                <p class="country-list-">Languages: ${Object.values(languages)}</p>
         </div>`;
}

export function renderCountryMiniCard({ flags, name }) {
  return `
     <li class="country-list">

     <img class="country-list-flags" src="${flags.svg}" alt="${name.official}" whith="25">

     <h2 class="country-list-name">${name.official}</h2>

     </li>   
    `;
}
