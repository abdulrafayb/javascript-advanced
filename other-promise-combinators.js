"use strict";

/* promise.race receives an array of promises and returns a promise and the promise returned by promise.race is settled as soon as one of the input promises settle, and settled means that a value is available and also it doesn't matter whether the promise got fulfilled or rejected, so in promice.race basically the first settled promise wins the race */

// creating a IIFE so we can use async/await without creating a whole new function with a name
(async function () {
  /* now these three promises will race against each other like in a real race, if the winning promise is then a fulfilled promise then the fulfillment value of this whole race promise is gonna be the fulfillment value of the winning promise, so we only get one result and not an array of the results of all three, and the promise that gets rejected can also win the race and so we say promise.race short circuits whenever one of the promises gets settled meaning no matter if fulfilled or rejected */
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/australia`),
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/germany`),
  ]);
  // the call that gets returned faster will be the result
  console.log(res[0]);
})();

/* in the real-world promise.race is useful for preventing against never ending promises or long running promises, for example if a user has a bad internet connection then a fetch request in our application might take way too long to actually be useful so we can create a special time out promise which automatically rejects after a certain time has passed */

// its gonna be similar to that wait function that we have created, the difference is this one is going to be rejected not resolved
const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      // after some seconds we reject the promise
      reject(new Error("Request took too long!"));
    }, seconds * 1000);
  });
};

// now we can simply have an ajax call race against this timeout
Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/australia`),
  timeout(1), // if the timeout happens first then all of this will get rejected meaning it will abort fetch happening in getJSON
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err));

console.log("\n");
/* promise.allsettled takes an array of promises and it will simply return an array of all the settled promises, so no matter if the promises get fulfilled or rejected, its similar to promise.all in regard that it also returns an array of all the results but the difference is that promise.all will short circuit as soon as one promise rejects but promise.allsettled never short circuits */

// faking promises
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.rejected("Error"),
  Promise.resolve("Another success"),
]).then((res) => console.log(res));

// in constrast to allsettled will return an error as one promise is rejected
Promise.all([
  Promise.resolve("Success"),
  Promise.rejected("Error"),
  Promise.resolve("Another success"),
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

/* promise.any takes in an array of multiple promises and returns the first promise that is fulfilled and it will also ignore all the rejected promise, it is similar to promise.race with the difference that rejected promises are ignored, therefore the results of promise.any is always gonna be a fulfilled promise unless all of them rejects */
Promise.any([
  Promise.resolve("Success"),
  Promise.rejected("Error"),
  Promise.resolve("Another success"),
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
