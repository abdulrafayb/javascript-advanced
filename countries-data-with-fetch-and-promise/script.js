"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, className = "") {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${Object.values(
          data.languages
        ).join(", ")}</p>
        <p class="country__row"><span>💰</span>${Object.values(data.currencies)
          .map((currency) => currency.name)
          .join(", ")}</p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

/* simplified code (here we learn how to consume promises and will consume a promise returned by the fetch function)
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => renderCountry(data[0]));
}; */

const getCountryData = function (country) {
  // for more complex ajax calls the fetch function can even take in an object of options too
  /* and as we know calling the fetch function like this will then immediately return a promise as soon as the request starts and in the beginning the promise will be in pending state because the asynchronous task of getting the data will still be running in the background then at a certain point the promise will then be settled and eihter in a fulfilled or rejected state */
  const request = fetch(
    `https://restcountries.com/v3.1/name/${country}`
    /* lets assume that the promise will be fulfilled having a value for us to work with and to handle this state we will use the then method that is available on all promises, and in it we pass in a callback function that will be executed as soon as the promise is fulfilled meaning when the result is available, and this method will take in one argument and that is the value/result we get */
  )
    .then(function (response) {
      /* the data itself will be in the body of the response so to be able to read the data we need to call json method on it */
      console.log(response);
      /* json method is available on all the response objects that are come from fetch function so all of the resolved values, and the problem with this method itself is asynchronous function meaning it will also return a new promise so we need to call another then method on it*/
      return response.json();
    })
    .then(function (data) {
      console.log(data); // now we get the data but using two promises
      renderCountry(data[0]);
      // as soon as we get the data of the country then we get the data about neighbouring country dependent on the first call
      const neighbour = data[0].borders?.[0];

      /* now we will learn how to chain promises in sequential order, to render neighbouring countries of the initial country, and now we are going to chain two sequential ajax calls */
      /* then methods always returns a promise whether we return anything or not but if we do return a value then that value will become the fulfillment value of the return promise, so when we return the promise below then the fulfilled value of the next then method will be the returned promise (fulfilled value of the previous promise) */
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderCountry(data[0], "neighbour");
    });
  /* as we can see promises allow us to handle these complex asynchronous operations with as many steps as we want, right now we have four steps meaning four then methods, but we can extend it as much as we want, all we have to do is just keep chaining promises one after another all without the callback hell, so instead we have a flat chain of promises, one important point is to never call a then method inside a then method because then we will be again inside a callback hell like below
  .then(function (data) {
    renderCountry(data[0]);
    const neighbour = data[0].borders?.[0]; // callback defined another callback (then inside then)
    fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`).then((response) => response.json()) 
  }) */
  console.log(request); // returns a promise
};

getCountryData("pakistan");

/* simplified code
const getCountryData = function (country) {
  const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data[0], "neighbour"));
}; */
