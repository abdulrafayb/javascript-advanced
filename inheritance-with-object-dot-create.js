"use strict";

/* we are gonna object.create to implement a complex prototype chain similar to what we have done before with constructor functions and ES6 classes */

const PersonProto = {
  calcAge() {
    console.log(new Date().getFullYear() - this.birthyear);
  },

  init(fullName, birthyear) {
    this.fullName = fullName;
    this.birthyear = birthyear;
  },
};

const peter = Object.create(PersonProto);

/* the personproto is the prototype of all the new objects that we create, so we want to add another prototype in the middle of the chain between personproto and the objects that we create, what we are gonna do it make the student inherit directly from personproto */
const StudentProto = Object.create(PersonProto); // personproto is now the prototype of the studentproto object

StudentProto.init = function (fullName, birthyear, course) {
  PersonProto.init.call(this, fullName, birthyear);
  this.course = course;
};

StudentProto.introduction = function () {
  console.log(`My name is ${this.fullName} and I study ${this.course}`);
};

const brian = Object.create(StudentProto); // studentproto is now the prototype of the brian object making personproto its parent
brian.init("Brian Griffin", 2010, "CS");
console.log(brian);
brian.introduction();
brian.calcAge();

/* in this version, we don't have to worry about constructors, prototype properties and new operator, its just objects linked to other objects */
