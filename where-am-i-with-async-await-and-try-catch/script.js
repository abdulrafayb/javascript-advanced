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

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

/* with async/await we can't use catch method anymore because we can't really attach it anywhere so instead we use try/catch statement and it is used in regular JS as well, and it has got nothing to do with async/await specifically */

const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // the fetch method only rejects a promise only when the user has no internet connection that's why we manually create errors
    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=531338842197757516879x78266`
    );
    /* as the fetch promise doesn't reject on a 404 error or the 403 error which is the original error which caused everything to collapse, 403 occurs as we are doing too many requests to the reverse geocoding API but the solution is simple as all we have to do is manually create an error and then that error will be caught in the catch block */
    if (!resGeo.ok) throw new Error("Problem getting location data");
    const dataGeo = await resGeo.json();

    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error("Problem getting country");
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    renderError(`${err.message}`);
    // rejected promise returned from async function
    throw err;
  }
};

/* we don't get the result we want instead of returning the string it returns a promise, but we know async functions always return a promise, and the reason for that is at this point of code JS simply doesn't know that we want the string as the function is still running in the background and it also doesn't block the code out here so JS doesn't know what will be returned from this function therefore it returns a promise */

/* now the value that we return from an async function will become the fulfilled value of the promise that is returned by the function and since we know it is going to return a promise we also know how to get the data we want so instead what we do below
const city = whereAmI();
console.log(city); 
we use the then handler and in that the argument (city) will be passed into the callback function is going to be the result value of the promise and with this we successfully returned a value from an async function */
/* console.log(`1: Will get the location`);
whereAmI()
  .then((city) => console.log(`2: ${city}`))
  .catch((err) => console.log(`2: ${err.message}`))
  .finally(() => console.log(`3: Finished getting location`)); */

/* but if any errors occur in the try block then the return value will never be reached as the code will immediately jump to the catch block so we will get undefined for the value of city, so even though there was an error in the async function the promise that the async function returns is still fulfilled and not rejected, and even if we add a catch method it will not work because the promise was fulfilled and it returns a empty value */

/* now if we want to fix this to be able to catch the error here then we'll have to rethrow that error which means to throw the error again so that we can then propogate it down, and with that we will manually reject a promise that's returned from the async function, there is still a problem however now we are mixing the old and new way of working with promises, so lets convert it to async/await as well and we can do that because we can treat the promise that was returned just like any other promise so we can handle it with async/await but the problem is that we can't use the await without the async function and we don't really want a new function here so instead we will use an IIFE, and this is also a use case for IIFE */

console.log(`1: Will get the location`);
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.log(`2: ${err.message}`);
  }
  console.log(`3: Finished getting location`);
})();

/* now everything is using async/await and now we know how to return data from an async function and how to properly receive and handle that returned data, and its also a pretty common case for async functions calling other async functions and returning values between them, and also error handling should never be ignored when it comes to asynchronous code */
