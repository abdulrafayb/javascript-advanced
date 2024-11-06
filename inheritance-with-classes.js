"use strict";

/* class syntax hides a lot of details that happen behind the scenes because they are just a layer of obstruction over constructor function, to implement inheritance in classes we only two ingredients which are extends keyword and super function */

class Person {
  constructor(fullName, birthyear) {
    this.fullName = fullName;
    this.birthyear = birthyear;
  }

  // instance methods
  calcAge() {
    return new Date().getFullYear() - this.birthyear;
  }

  greet() {
    console.log(`Hey, ${this.firstName}`);
  }

  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else console.log(`${name} is not a full name`); // with an alert prompt
  }

  get fullName() {
    return this._fullName;
  }

  // static methods
  static greetCl() {
    console.log("Hey there!");
  }
}

// the extends keyword will link the prototype of student to person, creating the prototype chain as we did manually
class Student extends Person {
  constructor(fullName, birthyear, course) {
    /* here we don't need to call person as a function but instead we call a super function which is basically the constructor function of the parent class, the idea is similar to what we did in constructor function but here it happens automatically, and we always need to call super function first because it is responsible for creating this keyword in this subclass so without calling it first we wouldn't be able to access the this keyword for course */
    super(fullName, birthyear);
    /* and if we didn't need additional parameters for student class and kept the same as the parent class then we wouldn't even need a constuctor function because super function would automatically be called with the parent class parameters, so if we didn't need any new properties then we don't need to bother writing a constructor method in the child class */
    this.course = course;
  }

  introduction() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
}

// const brian = new Student("Brian Griffin", 2010) // this would work even without the constructor function
const brian = new Student("Brian Griffin", 2010, "CS");
brian.introduction();
console.log(brian.calcAge());
