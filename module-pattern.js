/* now we know how modules work in a modern way but we are also gonna look into module pattern that was used before and is an older way to to implement modules in JS, just like regular modules the main goal of the module pattern is to encapsulate functionality and to have private data and to expose a public API and the best way of achieving all that is to simply use a function because functions give us private data by default and allow us to return values which can become our public API */

/* module pattern implementation, we start by writing a function which is usually an IIFE because this way we don't have to call it separately and we can be ensured that its called only once, as its important that this function is only created once because the goal of this function is not to reuse code by running multiple times, the only purpose of this function is to create new scope and return data just once */
const ShoppingCart = (function () {
  // private data as it is scoped inside a function
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to the cart and the shipping cost is ${shippingCost}`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  // returning data so it can be called by a public API, we return an object containing stuff we want to make public
  return {
    // we are not storing the returned object anywhere so it will disappear when we run it so to fix this problem
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
    // we simply assign the result of running this IIFE into a new variable like we have done above
  };
  /* we could have also defined all of the properties and methods right in the object above, but it is a bit cleaner to define everything outside and then to simply create an object which contains everything that we want to expose to the outside */
})();

ShoppingCart.addToCart("bread", 5);
ShoppingCart.addToCart("pizza", 2);
console.log(ShoppingCart.shippingCost); // undefined
/* everything inside the module is private therefore we can not access anything that is inside the module in the console because everything there is basically the global scope and we are not creating the above function in the global scope so we can't even access shoppingcart there */

console.log(ShoppingCart);

/* we can access and manipulate the cart variable because the IIFE returns an object that is assigned to a variable although the IIFE is only executed once at the beginning, the addtocart function still has access to the cart variable and this is possible due to the closures which allow a function to retain access to all variables present in its scope at the time of its creation so the addtocart function never loses its connection to its birthplace, which is the scope that contains it as a result the addtocart function can still access the cart variable even though it's not part of the exported object, so this is the reason why this works and it is not because the cart variable is also in the object as that's not relevant as we are not using this.cart, moreover we can also log or use variables that are private to this module meaning they won't be part of the exported object but we could have a shippingcost variable that is only accessible within this module, when we use this variable to produce a string, the function will still have access to it, even though it's no longer present in the current scope */

/* now let's consider a scenario where we want to have one module per file, similar to how modules work in modern way, in this case we would need to create separate script files and link them all in the HTML file however this approach has several drawbacks, firstly we would need to be careful about the order in which we declare the scripts in the HTML file which can be error-prone and secondly all the variables would be living in the global scope which can lead to naming conflicts and other issues and finally we wouldn't be able to bundle these scripts together using a module bundler which is a crucial step in modern JS development, and the module pattern we just learned about does work well but it has these limitations and that's exactly why native modules were introduced in modern JS to provide a better way of managing and organizing code in a modular fashion */

console.log("\n");
/* besides native JS modules and the module pattern there are also other module systems that have been used in JS in the past and these are not native to JS but relied on some external implementations, which are AMD and CommonJS modules */

/* commonjs modules are also used in nodejs as well and nodejs is a way of running JS on a web server outside the browser, now the big conequence of this is that almost all the modules in the npm repository that we can use in our own code still use the commonjs module system and the reason for that is npm was originally only intended for nodejs, but later when npm became the standard repository for the whole JS so now we are stuck with commonjs and we'll still see it around */
