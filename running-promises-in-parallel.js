"use strict";

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

/* if we wanted to get some data about three countries at the same time but in which the order that the data arrives doesn't matter at all, so lets create an async function which will take in three countries and log the capital cities of these three countries as an array */

const getThreeCountries = async function (
  countryOne,
  countryTwo,
  countryThree
) {
  try {
    /* what we did here is run these ajax calls one after another even though the result of the next one doesn't depend on the previous one so why should one ajax call wait for the previous one to finish fetching data so instead of running these promises in sequence we can run them in parallel and save some valuable loading time */
    /* const [dataOne] = await getJSON(
      `https://restcountries.com/v3.1/name/${countryOne}`
    );
    const [dataTwo] = await getJSON(
      `https://restcountries.com/v3.1/name/${countryTwo}`
    );
    const [dataThree] = await getJSON(
      `https://restcountries.com/v3.1/name/${countryThree}`
    );
    console.log([dataOne.capital, dataTwo.capital, dataThree.capital]); // returning an array here */

    /* and to do that we use the promise.all combinator function, and it is a helper function on the promise constructor so it is a static method, and this function takes in an array of promises and returns a new promise which will then run all the promises in the array at the same time */
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${countryOne}`),
      getJSON(`https://restcountries.com/v3.1/name/${countryTwo}`),
      getJSON(`https://restcountries.com/v3.1/name/${countryThree}`),
    ]);

    console.log(data); // returns an array having three arrays and each of them an object
    console.log(data.map((d) => d[0].capital)); // looping over the data to take out the data that we want

    /* if one promise of the promises rejects then the whole promise.all will reject, we can say that promise.all short-circuits when one promise rejects because one rejected promise is enough for the entire promise to reject as well */
  } catch (err) {
    console.error(err.message);
  }
};

getThreeCountries("pakistan", "palestine", "afghanistan");

/* whenever we have a situation in which we need to do multiple asynchronous operations at the same time and the operations don't depend on one another then we should always run them in parallel with promise.all combinator, and it is called a combinator because it allows us to combine multiple promises */
