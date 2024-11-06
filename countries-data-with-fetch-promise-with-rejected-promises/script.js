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
  // countriesContainer.style.opacity = 1;
};

/* up unitl now we have always assumed that everything went well with our ajax calls so we never handled errors however an important part of development is to handle errors because its very common that errors happen in website applications so now we are gonna handle errors with promises */

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    /* there are two ways of handling rejections and the first one is to pass a second callback function into the then method, so the first callback is always gonna be called for the fulfilled promise meaning a successful one but we can also pass a second callback which will be called when the promise is rejected, and that callback will be called with an argument which is the error itself, handling the error is also called catching the error, so we handled an error that might occur in the promise, then there will be no more errors because the chain will stop here when the error occurs and its then handled */
    .then(
      (response) => {
        /* as this handler here gets the access to the response immediately so we look into it and check the ok property which is set to false and the reason for that is 404 error, and if the request goes well then ok property will be true because of 200 status code, so now we are gonna use the ok property which is set to false to reject the promise manually, we'll do that by creating a new error */
        console.log(response); // checking ok property

        /* any error will cause any promise to reject and here we simply create our own error to reject the promise on purpose so then we can handle that error down in the chain */
        if (!response.ok)
          throw new Error(`Country not found (${response.status})`); // created a error using constructor function
        // throw keyword will immediately terminate the current function just like return does

        /* any error that happens here or any of the callbacks down below before catch, will immediately terminate that handler function and will propogate down to catch method and then in there we handle the error so before we created the above error we got an error flag not defined because the data we received didn't contain that flag as there was no such country therefore it created the error and then that error caused rejection of the promise which was then handled down in catch, so it came from rendercountry function and was in the same way propogated down to catch displaying that error message */

        /* the reason we handle these kinds of errors is because only then we can actually display error messages that make sense on the screen for the user like we have created one above, and its also bad practice to leave these kinds of rejected promises hanging around without handling them */
        return response.json();
      }
      // (err) => alert(err) // now we will have no uncaught error in the console window because we catch (caught) the error here
    )
    .then((data) => {
      renderCountry(data[0]);

      /* now lets suppose if there was no error in the first fetch but in the second fetch, now the neighbour doesn't exist so now there is gonna be a rejection from this promise so we do the same thing here as we have done above but then we create duplicate code and in both these then method block we have the same code so we are gonna create a helper function and this function will wrap up the fetch and error handling and also conversion to JSON, so we'll encapsulate this then method into a function */
      // const neighbour = data[0].borders?.[0];
      const neighbour = "afasfsd"; // to create an error
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    /* now what if there was no error in the first fetch but in the second one meaning the first fetch promise was fulfilled but the second one was rejected then we'll also have to catch the error below, however it is a bit annoying to catch every single so there is a better of handling errors globally just in one central place */
    .then((response) => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
      // (err) => alert(err)
    })
    .then((data) => renderCountry(data[0], "neighbour"))
    /* and then we can handle all the errors no matter where they appear in the chain right at the end of the chain by adding a catch method and this method at the end of the chain will catch any errors that occur in any place in the whole promise chain, so erros propagate down the chain until they are caught and only if they are not caught anywhere then we get that uncaugth error, and error that are generated in JS are objects too, so we can create errors in JS with a constructor, and any error created like below contains a message property */
    .catch((err) => {
      console.error(`${err}`);
      renderError(`Something went wrong ${err.message}. Try again!`); // to print the message only and not the whole object
    })
    /* besides then and catch method we also have finally method, and the callback function that we define inside will always be called no whatever happens with the promise whether it is fulfilled or rejected, so this the difference, then method is only called when the promise is fulfilled and catch method only when a promise is rejected, one good use case of this finally method is to hide the a loading spinner when we load some data, so web apps show a spinner when an asynchronous operation starts and then hide it once the operation completes and that happens whether the operation was successful or not */
    .finally(() => (countriesContainer.style.opacity = 1)); // we always need to do this whether promise is fulfilled or rejected
};

/* a promise in which error occurs is a rejected promise so now we are gonna handle promise rejections, the only way in which the fetch promise rejects is when the user loses his internet connection so for now that's the only error we are gonna handle, to simulate losing the insternet connection when the user is on the site and loses internet we can go to network tab in the chrome dev tools */

/* now we lose the connection in the middle and click this button then we get some errors in the console that internet is disconnected and other one that we have an uncaught promise because we failed to fetch the data so now the promise that returned from the fetch was rejected, now we are gonna handle that rejection */

/* btn.addEventListener("click", function () {
  getCountryData("pakistan");
}); */

/* now lets simulate another error where we try to search for a country that doesn't exists so our API is not gonna find any result for that and then we get an weird error which doesn't reflect the true error which is simply API not finding country with this name, and thats reflected with the status code 404, and as we know the fetch promise only rejects when there is no internet connection but with this 404 the fetch promise will still get fulfilled as the data came but it just didn't find what we looked for, so as there is no rejection the catch handler can't pick this error up and picks some other error that we don't want to handle */

/* now we we are gonna fix the request 404 error and throw the error manually, here the problem is during the fetch we get 404 error which is because the API didn't find any country with this name but the problem is with the request but the fetch still didn't reject in this case   */
// getCountryData("afesfesfd");

// simplified code
const getCountryDataTwo = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
    .then((data) => {
      renderCountry(data[0]);
      /* there is still one more thing left to handle which is that sometimes no neighbour might exist, and it is super important for any UI that we are building to show clear error messages understood by the user */
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error(`No neighbour found!`);

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        `Country not found`
      );
    })
    .then((data) => renderCountry(data[0], "neighbour"))
    .catch((err) => {
      // console.error(`${err}`);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener("click", function () {
  // getCountryDataTwo("pakistan");
  getCountryDataTwo("australia");
});

/* so we understand up there is that whenever we want to create some error that we want to handle in the catch method all we need to do is throw and create a new error, and above we did it because no neighbour was found which is a good reason to display an error message on the UI, and this works because throwing an error inside a callback will immediately reject the promise, then that rejected promise will travel down in the chain until it caught by catch method */
