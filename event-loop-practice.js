"use strict";

/* we can't really do high precision things using JS timers whenever we are working with promises, with micro-queue tasks and timers at the same time */

console.log("Test Start");
setTimeout(() => console.log("0 sec timer"), 0); // after zero seconds this callback will be put into callback queue
Promise.resolve("Resolved Promise 1").then((res) => console.log(res));
Promise.resolve("Resolved Promise 2").then((res) => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log("Test end");
