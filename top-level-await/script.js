/* now we can use the await keyword outside the async functions but only in modules and we call it top level await but the problem is that when the await keyword is outside of async function it will then block the exectution of the entire module */
console.log("Started fetching request");
const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
const data = await res.json();
console.log(data);
console.log("Blocked until the request was fetched");

const getLastPost = async function () {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};

/* calling an async function will always return a promise and it will not return the actual data itself because by the time we are running this line of code the data has not yet arrived so we have a pending promise, so the solution to that was to use the regular promises so we use the then method however this solution isn't good */
const lastPost = getLastPost();
console.log(lastPost);
lastPost.then((last) => console.log(last));

// with top-level await we simply wait for the result of getlastpost
const lastPostTwo = await getLastPost();
console.log(lastPostTwo);

/* one more important implication of using top level await is the fact that if one module imports a module which has top level await then the importing module will wait for the imported module to finish the blocking code */
import * as ShoppingCart from "./shoppingCart.js";
