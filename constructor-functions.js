"use strict";

/* implementing OOP in JS with constructor functions, creating prototypes, linking objects to prototypes, creating new objects without
classes from which we can instantiate objects */

/* we can use constructor functions to build an object using a function, basically creating objects programmatically, constructor function is a completely normal function, the only difference is that when we call constructor function we call it with the new operator, and in OOP there is a convention that constructor functions always start with a capital letter, arrow functions doesn't work as constructor functions because it doesn't have its own 'this' keyword */

// function to produce an object, a blueprint
const Person = function (firstName, birthYear) {
  // it will point to the empty object that we created here
  console.log(this);

  /* as we know that in the end of this function the this keyword will basically be returned, so whatever we add to this empty object will then be returned from this function, and that returned object is gonna be the object that we are trying to build here */

  // instance properties because these properties will be available on all instances created through this constructor function
  this.firstName = firstName;
  this.birthYear = birthYear;

  /* this way of adding methods is a bad practice, methods should never be created inside a constructor function because if we were to create hundreds of objects from this constructor function then in each of the newly created objects we would create a copy of this method meaning we would essentially create a hundred copies of this method, that would be terrible for our performance */
  /* this.calcAge = function (year) {
    console.log(year - this.birthYear);
  }; */

  /* to solve the above problem we use prototypes and prototypal inheritance because then only method exists and all of the objects that are created using this constructor function can reuse the method on themselves, and the this keyword is always set to the object the method */
};

/* when we call a function with new operator, first it creates a new empty object then calls the function and in that function call it sets the this keyword to the newly created object in the execution context, then the newly created object is linked to prototype, then finally the new object that was created in the beginning is then automatically returned from the constructor function */

// now we can use the constructo function to create as many different objects as we want
const personOne = new Person("Rafay", 2000);
console.log(personOne);

/* in classical OOP, an object created from a class is called an instance, but here we didn't technically created a class because JS doesn't have classes in a sense of traditional OOP, however we did create an object from a constructor function, and constructor functions have been used to kind of simulate classes in JS, so therefore we can still say that personone is an instance of person */

console.log(personOne instanceof Person);

// constructor functions are not really a feature of JS but its simply a pattern developed by developers

/* each and every function in JS automatically has a property called prototype and that includes constructor functions, every object that is created by a certain constructor function will get access to all the methods and properties that we define on the constructors prototype property */
console.log(Person.prototype);

Person.prototype.calcAge = function (year) {
  console.log(year - this.birthYear);
};

/* we can now use this method on personone object even though it is not really on the object itself but we have access to it because of prototypal inheritance */
personOne.calcAge(2024);

/* this is the prototype of personone, its not the prototype property but simply a prototype, and the prototype of personone object is essentially the prototype property of the constructor function */
/* in step three of the new operator, which links the new empty object to the prototype, it creates the proto property for the new object and set its value to the prototype property of the constructor function that is being called, and this is how JS knows that personone is connected to person */
console.log(personOne.__proto__);
/* person.prototype is actually not the prototype of person but instead it is what is gonna be used as the prototype of all the objects that are created with the person constructor function */
console.log(personOne.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(personOne));
// Person.prototypeOfLinkedObjects but not the prototype of Person
console.log(Person.prototype.isPrototypeOf(Person));

// we can also set properties on the prototype, not just on methods
Person.prototype.species = "Homo Sapiens";
console.log(personOne);
// the object will inherit, they will get access to this property from the prototype
console.log(personOne.species);

console.log(personOne.hasOwnProperty("firstName"));
// because this property is not inside the personone object, it simply has access to it because of its prototype
console.log(personOne.hasOwnProperty("species"));

console.log("\nPrototype Chain");

// prototype chain
console.log(personOne.__proto__); // contains all the methods and properties created by prototype method
console.log(personOne.__proto__.__proto__); // moving up in the prototype chain at the top level
console.log(personOne.__proto__.__proto__.__proto__); // returns null as we have gone beyond the top of the chain
// console.dir(Person.prototype.constructor); // this will point back to the person itself

const arr = [1, 2, 3, 2, 3, 4, 5, 4]; // whenever we create an array like [] this, it is created by the Array constructor
console.log(arr.__proto__); // prototype of an array having all the methods we have used so far
console.log(arr.__proto__ === Array.__proto__); // Array is the constructor function
console.log(arr.__proto__.__proto__); // on the top of object.prototype in the prototype chain
// prototype itself is a object that is why it can access methods (getting access to methods from up in the prototype chain)

/* we can see that prototypal inheritance is a mechnanism for reusing code, so all the methods that we use exist only at one place in JS and our code gets access to those methods through prototype chain or inheritance */

// arrays get their methods from prototypes so we can extend those methods to create a new functionality
Array.prototype.unique = function () {
  return [...new Set(this)];
};
/* extending the prototype of a built-in object is generally not a good idea, if we are working on small projects then its okay, but getting into the habit of doing this is not a good thing for multiple reasons, first reason is that the next version of JS might add a method with the same name so our code will use that method not the one we created, the second reason is that when we work in a team of multiple developers then they might implement the same method with different names which would lead to creating so many bugs */
console.log(arr.unique());

// using it on DOM elements as they are objects too
const h1 = document.querySelector("h1");
console.dir(h1); // to actually get the object, list of methods, look for proto property and check for prototype chain (7-8 levels)

/* creating some random function, even this function will get a prototype as the function to is an object, and its prototype will contain the methods we have used previously */
console.log((x) => x + 2);

// the reason why we can call methods on function is because they are objects and objects have prototypes

// creating a static method in constructor function (first check classes file to understand static methods)
Person.greet = function () {
  console.log("Hey there!");
  console.log(this); // points towards the entire constructor function and the reason for that is the object that is calling the method
};
// personOne.greet(); // not inherited
