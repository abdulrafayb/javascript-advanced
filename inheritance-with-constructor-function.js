"use strict";

/* we are gonna set up the prototype chain in order to allow inheritance between the prototype properties of two different constructor fucntions, usually we want child classes to have the same functionality as the parent class but with some additional functionality */

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(`${new Date().getFullYear() - this.birthYear}`);
};

const Student = function (firstName, birthYear, course) {
  /* when we call constructor function as a regular function its not gonna work because its a regular function call and in that the this keyword is set to undefined, so we'll also have to set the this keyword manually, so we use the call method to call the function and set the this keyword manually */
  Person.call(this, firstName, birthYear);
  this.course = course;
};

/* we want to make person.prototype the prototype of student.prototype or in other words we want to set the proto property of student.prototype to person.prototype so we are gonna use object.create to define prototypes manually because that's what its used for to link prototypes, now the student.prototype object is now an object that inherits from person.prototype, and we create this connection here before we add methods to the prototype object of student because object.create will return an empty object so at this point student.prototype is empty as well so onto that empty object we attach the methods below, but if we did it the other way around like adding it after the method below than then object.create will overwrite that method that we had already added to prototype object of student */
Student.prototype = Object.create(Person.prototype);
/* if we do this then the student prototype property and person prototype property will be the exact same object but that's not what we want, what we want is the person's prototype object to be a prototype of student.prototype so we want to inherit from it but it should not be the exact same object, and that's why we needed object.create */
// Student.prototype = Person.prototype;

Student.prototype.introduction = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const brian = new Student("Brian", 2010, "CS");
brian.introduction();
brian.calcAge();

// we have correctly linkec the prototype chain
console.log(brian instanceof Student);
console.log(brian instanceof Person);
console.log(brian instanceof Object);

/* this should point back to student constructor but it doesn't and rather points to person constructor so we have to set it manually because we set the prototype property of the student using object.create, this makes it that the constructor of student.protoype is still person, so we correct it below */
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// with this we know that we can even manipulate the prototype chain manually
