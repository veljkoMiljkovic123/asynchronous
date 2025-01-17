'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data) {
  const html = `
  <article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span> ${(
        +data.population / 1000000
      ).toFixed(1)}m people:</p>
      <p class="country__row"><span>🗣️</span> ${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};
////////////////

//Our first AJAX Call: XMLHttpRequest

/*  const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
  });
}; */

/* 
const getCountryAndNeighbour = function (country) {
  //Ajax call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //Render country 1
    renderCountry(data);

    // Get neighbour country
    const neighbour = data.borders?.[0];

    //Ajax call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2);
    });
  });
};

getCountryAndNeighbour('argentina');
 */

/* const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
}; */

// const getJSon = function (url, errorMSG = 'Something went wrong') {
//   return fetch(url)
//     .then(response => {
//       console.log(response);

//       if (!response.ok) {
//         throw new Error(`${errorMSG} ${response.status}`);
//       }

//       return response.json();
//     })
//     .then();
// };

// const getCountryData = function (country) {
//   //country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`);
//       }

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       /* const neighbour = data[0].borders?.[0]; */
//       const neighbour = 'dsadsd';

//       // country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(`Neigbour is not found`);
//       }
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} ---`);
//       renderError(`Something went wrong -- ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// const getCountryData = function (country) {
//   //country 1
//   getJSon(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders?.[0];
//       // const neighbour = 'dsadsd';

//       if (!neighbour) throw new Error(`No neighbour found`);

//       // country 2
//       return getJSon(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'Neigbour is not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} ---`);
//       renderError(`Something went wrong -- ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('serbia');
// });

const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  )
    .then(res => {
      console.log(res);
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      if (!data.city) throw new Error('City not founded');
      console.log(`You are in ${data.city}, ${data.countryName}`);
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}***`));
};

whereAmI(52.508, 13.381);
