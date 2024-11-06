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

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

/* there is a better and easier way to consume promises with async/await, so we start by creating a special function which would be an async function and we do this by simply adding async keyword, with this the function becomes asynchronous function, a function that will keep running in the background while performing the code inside of it and when the funtion is donw it automatically returns a promise, and inside an async function we can have one or more await statements */

/* in an async function like below we can use the await keyword to basically wait for the result of the promise, await will stop the code execution at this point of the function until the promise is fulfilled meaning until the data has been fetched */

/* but stopping the code means blocking the execution, but in this case we are stopping the execution in an async function which is running asynchronously in the background therefore it is not blocking the main thread of execution meaning not blocking the call stack and that is what special about await, it makes our code look like regular synchronous code while behind the scenes everything is in fact asynchronous */

/* we also need to keep in mind that async await is simply synthetic sugar over the then method in promises, behind the scenes we are still using promises, we are simply using a different way of consuming promises below, it just hides the true nature of how things work behind the scenes */

const whereAmI = async function () {
  // geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;
  // reverse geocoding
  const resGeo = await fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=531338842197757516879x78266`
  );
  const dataGeo = await resGeo.json();

  /* as soon as this promise is resolved then the value of this whole await expression is going to be the resolved value of the promise so we can simply store it in a variable, so we can simply await until the value of the promise is returned and then just assign that value to a variable */
  const res = await fetch(
    // here we need a promise so we can use a promise returned from fetch statement
    `https://restcountries.com/v3.1/name/${dataGeo.country}`
  );
  /* console.log(res); // we need to convert it by using json and we know json returns a new promise but previously we had to chain another then handler but now it has become easier, we simply use await keyword and then store it in a variable */
  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);

  /* this is exactly the same as above
  fetch(`https://restcountries.com/v3.1/name/${country}`).then((res) =>
    console.log(res)
  ); */
};

/* now we have the data rendered to page without the chaining of promises, now we simply store the fulfilled promise value immediately into a variable without having to mess with callback functions */
whereAmI();

/* simplified code
const whereAmI = async function () {
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;
  const resGeo = await fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=531338842197757516879x78266`
  );
  const dataGeo = await resGeo.json();
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${dataGeo.country}`
  );
  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};

whereAmI(); */
