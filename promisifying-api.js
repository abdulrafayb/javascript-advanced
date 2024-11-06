"use strict";

/* this below is a callback based api as we pass in different callbacks so now we are gonna promisify a callback based api to a promise based api meaning to convert one to another */

navigator.geolocation.getCurrentPosition(
  // this function offloads its work in the background to the web api environment in the browser and moves onto the next line in code
  (position) => console.log(position),
  (err) => console.error(err)
);

console.log("Getting position"); // moves here thus creating asynchronous behaviour

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    /* navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (err) => reject(err)
    ); */
    navigator.geolocation.getCurrentPosition(resolve, reject); // same as above
  });
};

getPosition().then((pos) => console.log(pos));
