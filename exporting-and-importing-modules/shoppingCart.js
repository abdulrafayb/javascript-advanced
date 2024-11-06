console.log("Exporting module");

/* variables that are declared inside of a module are scoped to this module, inside of a module the module itself is the top level scope and by default this means that all top level variables are private inside of this module, unlike traditional scripts which puts the variables in the global scope */
const shippingCost = 10;
export const cart = [];

/* if we want to export it, so that we can import it in some other module all we have to do is write export and this then creates a named export from this module */
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart`);
};

/* and exports always need to happen in top level code because it would work if we put the addtocart function inside a if statement as that would create its own scope */

/* we can also export multiple things from a module using named exports and we can also do that at the same time because that is the main use case of named exports */
const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

/* we also had another way to export which was default exports and we usually use default exports when we only want to export one thing per module, so we use the default keyword, and here we simply export the value itself so not the variable/function, so no name is used or involved below and when we import it we can give it any name we want */

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart`);
}
