"use strict";

/* truly private class fields and methods are actually part of a bigger proposal for improving and changing JS classes which is simply called class fields, the reason this proposal is called class fields is in traditional OOP languages properties are called fields meaning JS is moving away from the idea that classes are just synthetic sugar over constructor functions because with this new class features classes actually start to have abilities that we didn't previously have with constructor functions, so in this proposal there are eight different kinds of fields and methods, but we are gonna focus only on four and those are public fields and private fields, class fields are just like any other property */

class Account {
  /* creating public fields available outside of the class, same as writing them inside constructor
  locale = navigator.language; */

  // creating private fields, we simply use a hash symbol
  #movements = [];
  #pin; // this is just like creating an empty variable and then redefining it down below

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    /* we want to make it truly private but this time the situation is different because we are setting the pin based on on this input value of the constructor but here we can't define a field here but they can only be defined outside this function up there, and now we can access it here and set it to the value that we'll receive */
    this.#pin = pin;

    console.log(`Thanks for opening an account ${this.owner}`);
  }

  getMovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
    return this; // without this chaining will not work because then it returns nothing so the result will be undefined
  }

  withdraw(value) {
    this.deposit(-value);
    return this; // and when we again call the method on something that returns undefined we get an error message
  }

  requestLoan(value) {
    if (this.#approveLoan(value)) {
      this.deposit(value);
      console.log(`Loan approved`);
      return this;
    }
  }

  /* static is also a type of class fields, and it is usually used for helper functions because these static methods are not available on all instances but only on the class itself */
  static helper() {
    console.log(`Helper!`);
  }

  // creating private methods which are useful to hide the implementation details
  #approveLoan(value) {
    return true;
  }
}

const accountOne = new Account("Rafay", "PKR", "1111");

accountOne.deposit(250);
accountOne.withdraw(100);
accountOne.requestLoan(1000);
console.log(accountOne.getMovements());
Account.helper();
console.log(accountOne);

// console.log(accountOne.movements); // this doesn't exist anymore
// console.log(accountOne.#movements); // this has become private
// console.log(accountOne.#pin); // protected
// console.log(accountOne.#approveLoan(1000)); // protected

/* we can also implement the ability of chaining methods in the methods of our class so all we have to do is to return the object itself at the end of a method that we want to be chainable */
accountOne.deposit(500).deposit(200).withdraw(50).requestLoan(400);
console.log(accountOne.getMovements());
