"use strict";

// public apis on github where tons of public and free api's can be found
// api endpoint is just another name for the url that we need

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

/* in JS there are multiple ways of doing AJAX calls, we are gonna start with the most old school one and that's called XML HTTP request function */

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  /* here we first pass in the type of request and type of HTTP request to get data is simply called GET, and second we need a string containing the URL to which the AJAX call should actually be made */
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`); // opening the request
  request.send(); // sending the request to above url to fetch the data (process running in background)
  console.log(request.responseText); // we get nothing as the data never arrived at this point

  // const data = request.send();
  /* in order to get the result we can't simply save it in a variable and the reason for that is the result is simply not here yet, so the ajax call that we send off is being done in the background while rest of the code keeps running, and this is the asynchronous non blocking behaviour, so we have to register a callback on the request object for the load event and when the data is fetched it will emit the load event meaning we wait for the data and as soon as the data arrives it will then call the callback function */
  request.addEventListener("load", function () {
    // console.log(this.responseText); // response comes into this property and it it only set once the data arrives
    const [data] = JSON.parse(this.responseText); // converting the json format to object so we can use it
    console.log(data);

    /* several ways to access objects within objects in JS which are dot notation, bracket notation, destructuring, optional chaining, for-in loop, for-of loop, Object.keys(), Object.entries(), Object.values(), using a library (Lodash), recursive function */
    const html = `
    <article class="country">
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
  });
};

/* by calling these functions here twice we will basically have two AJAX calls happening at the same time meaning in parallel and if we keep relaoding the page they might appear in a different order and the reason for that is the data arrives at slightly different time for both countries each time we reload the page and this shows the non-blocking behaviour in action, as we call the function for first time it sends of the request to get data for pakistan and moves to the next line and again sends that request firing another ajax call immediately way before getting the data of pakistan has actually arrived, so whichever ajax call arrives first will then fire the load event first appearing first in the order */
/* getCountryData("pakistan");
getCountryData("palestine");
getCountryData("germany"); */

/* if we wanted these requests to be made in a specific predefined order then we will have to chain the requests which means to make the second request only after the first request has finished */

/* we will get the borders in this function so after the first ajax call is completed we get the border property from the objects and based on that we will render neighbouring countries besides the original country, in this case the second ajax call will depend on the first one because the data about neighbouring countries is the result of the first call as without the first call we wouldn't even know which data to fetch in the second call, so we are gonna implement a sequence of ajax calls */

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

const getCountryAndNeigbour = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  console.log(request.responseText);

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data); // render country

    // get neighbour country
    const neighbour = data.borders?.[0];

    // ajax call for neighbour, and we are firing this ajax call inside the callback function of the first one making it dependent
    const requestTwo = new XMLHttpRequest();
    requestTwo.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
    requestTwo.send();

    requestTwo.addEventListener("load", function () {
      const [dataTwo] = JSON.parse(this.responseText);
      console.log(dataTwo);
      renderCountry(dataTwo, "neighbour");
    });
  });
};

// getCountryAndNeigbour("pakistan");

/* above we have created nested callback functions, but if we had to do more requests in sequence then we would end up with deep level nested code meaning callbacks inside callbacks, and for that kind of behaviour we have a special name which is callback hell, when we have alot of nested callbacks in order execute asynchronous tasks in sequence, and in fact this happens for all asynchronous tasks which are handled by callbacks not just ajax calls, callback hell can also be identified by the triangular shape on the left side, and problem with it is that it makes our code look very messy, hard to maintain, difficult to understand */

/* setTimeout(() => {
  console.log("1 second passed");
  setTimeout(() => {
    console.log("2 seconds passed");
    setTimeout(() => {
      console.log("3 seconds passed");
      setTimeout(() => {
        console.log("4 seconds passed");
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000); */

/* the rule is that code that's hard to understand is basically bad code because it will have more bugs and it becomes more difficult to add new features and functionality to the application */
