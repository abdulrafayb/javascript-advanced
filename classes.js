"use strict";

/* classes allow us to do the exact same thing as a constructor function but use a nicer and more modern syntax, we call them class but behind the scenes they are still function */

/* class expression
const PersonCl = class {}; */

// class declaration
class PersonCl {
  constructor(fullName, birthyear) {
    this.fullName = fullName;
    this.birthyear = birthyear;
  }

  // methods will be added to .prototype property
  calcAge() {
    return new Date().getFullYear() - this.birthyear;
  }

  greet() {
    console.log(`Hey, ${this.firstName}`);
  }

  /* setters and getters in classes, one use case for them includes data validation, we create a setter to check if the name is a fullname, it is important to understand here that we are creating a setter property with a name that akready exists (fullname) in the constructor function, so we are trying to set it with this keyword (this.fullname = name) and the setter as well, and when the code executes and the constructor function tries to set the fullname with this keyword above but then this set method creates a conflict and become the fullname itself, both the setter function and constructor function are trying to set the exact same property name, so we will have to create a new property name and the convention for that is underscore, so when we do that we end up creating a new variable so to fix this we have to create a getter */
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else console.log(`${name} is not a full name`); // with an alert prompt
  }

  // the constructor function fullname becomes _fullname because of setter
  get fullName() {
    return this._fullName;
  }
  // the above pattern is important to understand whenever we try to set a property that already exists

  /* static methods in classes, while the methods above are called instance methods because these methods will be added to prototype property so that all instances can access them */
  static greetCl() {
    console.log("Hey there!");
  }
}

const personOne = new PersonCl("Peter Griffin", 2000);
const personTwo = new PersonCl("Stewie", 2020); // doesn't get any name property since its not a fullname
console.log(personOne);
console.log(personTwo);
console.log(personOne.calcAge());

console.log(personOne.__proto__ === PersonCl.prototype);

/* a class just hides the true nature of prototypal inheritance in JS
PersonCl.prototype.greet = function () {
  console.log(`Hey, ${this.firstName}`);
}; */

personOne.greet();

/* classes are not hoisted so can't use them before they are declared in code even if they are function declared, classes are also first-class citizens so we can pass them into functions and also return them from a function, the body of the class is always executed in strict mode even if we didn't activate strict mode for whole script */

/* we can also use another method with classes which is static method apart from setters and getters, to understand static method we can look at the built in Array.from method which converts any array like structure to a real array, static methods are those methods that are related to certain constructors and these methods are not inherited */

// Array.from(document.querySelectorAll("h1"));
const array = [1, 2, 3];
// array.from()

/* this from method here is a method that is attached to the Array constructor so we can not use the from method on an array as from is not a function that is because this from method is only attached to the constructor and not to prototype property of the constructor and therefore all arrays do not inherit this method, the from method is in the Array namespace, like parsefloat is in Number namespace (meaning available on specific constructors)  */

PersonCl.greetCl(); // static methods are useful to implement a helper fucntion about a class or constructor function
