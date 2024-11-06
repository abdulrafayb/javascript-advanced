"use strict";

/* this the third way to implement prototypal inheritance or delegation and it works in a different way than the other two, it involves prototypal inheritance but not constructor functions, prototype properties and new operator, we can use object.create to manually set the prototype of an object to any other object that we want */

/* this object is gonna be literally a prototype of the Person object, so we create it below with object.create and pass in the object that we want to be the prototype of the new object and that will then return a new object which will be linked to the prototype that we passed in here */
const PersonProto = {
  calcAge() {
    return new Date().getFullYear() - this.birthyear;
  },

  // creating a new method which will be will work in a similar way to constructor function but it is a completety different way
  init(fullName, birthyear) {
    this.fullName = fullName;
    this.birthyear = birthyear;
  },
};

// it is an empty object which is linked to the personproto object which will be its prototype
const personOne = Object.create(PersonProto);

// creating properties like we do in object literals
personOne.name = "Peter Griffin";
personOne.birthyear = 2000;
console.log(personOne.calcAge());

/* the big difference is that we didn't need constructor function and no prototype property to achieve the same thing, so we set the prototype of objects manually to any object that we want */

console.log(personOne.__proto__); // returns the object that we specified up there
console.log(personOne.__proto__ === PersonProto);

const personTwo = Object.create(PersonProto);

// creating properties but in a better way, programmatically
personTwo.init("Stewie Griffin", 2020); // this keyword points to persontwo because we explicitly called init on it
personTwo.calcAge();

/* so object.create creates a new object and the prototype of that object will be the object that we passed in, and all this happens manually */
