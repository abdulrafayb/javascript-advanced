/* we didn't use strict mode here because all modules are executed in strict mode by default, so first we are gonna create a module named 'shoppingcart' and in module names its a convention to use camelCase, then we are gonna import a module but without importing any values */

/* but here we will get an error that we cannot use import statement outside a module and this happens because when we want to connect a module to the HTML file we need to specify the type attribute, so we have to set the type to module in the script tag, and as we know that all the importing statements are hoisted to the top so we also write them at the top */
// import "./shoppingCart.js";
// import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";

/* so the code in the export module is executed before any code in the import module, so the code in this module is parsed and before it is executed, all the code in this module that it imports is executed first meaning all the code in the export modules */
console.log("Importing module");

// console.log(shippingCost); // can't do this because it is scoped to the current module only
/* if we want to use this here in this module then we would have to use exports and there are two types of exports which are named and default exports, and named export is the simplest way of exporting something from a module because all we have to do is to put export in front of anything that we want to export, and here we can then import that variable with the exact same name and also have to put them inside curly braces like we have up there where we are importing */
// addToCart("bread", 5);

/* we can also change the name of the inputs as well as we have done above, and we can also change it at the time when we are exporting it from the file we are exporting it */
// console.log(price, tq);

/* we can also import all the exports of a module at the same time, we start the name with capital letter just like class name as it it a convention when we import everything into an object like below, so we create an object containing everything that is exported from the module */
import * as ShoppingCart from "./shoppingCart.js";

/* now whenever we want to use something that was exported then we basically have to take that out from the object, we can see that this module here is now basically exporting a public API just like a class, so it is as if the object was an object created from a class which now has these properties and methods, we can also say module exports are kind of like public API because everything else stays private inside of the module */
console.log(ShoppingCart.totalPrice);
ShoppingCart.addToCart("bread", 5);

/* this here will import the default export and since it doesn't have any name so we can give it any name we want and it is also not advisable to import the same module more than once */
import add from "./shoppingCart.js";
add("pizza", 2);
add("apples", 4);
/* and we can even mix both types of exports in the same import statement like below, however in practice we never do that 
import add, { addToCart, totalPrice as price, tq } from "./shoppingCart.js";
so the preferred style is to just use one default export per module and then import it like we have above */

// imports are not copies of export, they are instead like a live connection meaning they point to the same place in memory
import { cart } from "./shoppingCart.js";
console.log(cart); // live connection and not a copy, so we are mutating this array here
