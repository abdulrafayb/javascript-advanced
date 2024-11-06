"use strict";

/* promise constructor takes only one argument which is executor function and the executor function takes in two arguments which are resolve and reject functions, and it will create a new promise just as fetch creates so we store it in a variable, in order to set the promise as fulfilled we use the resolve function */

/* the executor function below is the function which will contain the asynchronous behaviour that we're trying to handle with the promise, this function will eventually produce a result value, and this value will be the future value of the promise */

/* in the resolve function we pass the fulfilled value of the promise so that it can later be consumed with the then method, we are going to handle the result of this promise just like we handled promises previously with the then method */

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lottery draw is happening");
  // used the timer to encapsulate asynchronous behaviour
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      // 50 percent chance we'll win the lottery meaning a fulfilled promise
      resolve("You Win");
    } else {
      reject(new Error("You lost")); // creating new error object so it can return where the error is coming from
    }
  }, 2000);
});

/* above we created an executer function which will be called by the promise constructor as soon as it runs meaning immediately then the promise calls this function passing in the resolve and reject functions which will be used to mark the promise as either resolved meaning fulfilled or rejected, so the promise moves towards one of the two states fulfilled or rejected */

/* now we are going to consume this promise, so lotterypromise is going to be a promise object at this point meaning we can call this method on it */

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

/* we only build promises to wrap old callback based functions into promises and this process is called promisifying which means to convert callback based asynchronous behaviour to promise based, so now below we are gonna promisify a settimeout function to create a wait function and inside that function we will create and return the promise, and that is what usually done which then encapsulates the asynchronous operation even further, and that's also what the fetch function does as it also returns the promise */

const wait = function (seconds) {
  // here we don't need to specify the reject function as the timer will never fail meaning promise will never be rejected
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000); // in this case the goal is to make the code simply wait so no resolved values are needed
  });
};

/* the function below will now create a promise which waits for two seconds and then resolves, so in the then method we can run any code that we want to be executed after two seconds and we also have to return a new promise in the then method, so we wait one second before we return it, we also did it before when we chained two sequential ajax calls using the fetch function as in the result of the first fetch we would create a new fetch and return it */

wait(2)
  .then(() => {
    console.log("I waited for 2 seconds");
    return wait(1); // so therefore this returns a new promise which we can handle with then method
  })
  .then(() => console.log("I waited for 1 second"));

/* now with this we have a nice chain of asynchronous behaviour that happens nicely in a sequence and all without callback hell and without the above solution we would have to do something like below */

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

/* there is also a easier way to create a fulfilled or a rejected promise immediately by using promise.resolve and it is a static method on the promise constructor, and in it we can then pass in the value we want to resolve */
Promise.resolve("You win").then((res) => console.log(res));
Promise.resolve(new Error("Problem")).catch((err) => console.error(err)); // then method isn't needed here as no value will be resolved
