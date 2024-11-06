"use strict";

/* encapsulation basically means to keep some properties and methods private inside the class so that they are not accessible from outside of the class then the rest of the methods are basically exposed as a public interface which we can also call API, two big reasons we need privacy are to prevent code from outside of a class to accidentally manipulate data inside the class and when we expose only a small interface (a small API) consisting only of a few public methods then we can change all the other internal methods with more confidence because then we can sure external code doesn't rely on these private methods so therefore our code will not break when we do internal changes */

/* JS classes don't support real data privacy and encapsulation, there is a proposal to add truly private class fields and methods to the language, here we'll use a fake approach using a conventional way */

// bankist application example with the consideration of encapsulation
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = _pin; // protected from unwanted access
    /* it wouldn't make sense to create a parameter for movements and pass in an empty array for each account that we create, so better approach here will be to, so we can create properties like this that are not based on any input */
    this._movements = []; // protected property with a convention of underscore
    this.locale = navigator.language;
    // we can also execute any code in the constructor that we want
    console.log(`Thanks for opening an account ${this.owner}`);
  }

  // if we still wanted to give access of movements outside the class then we can implement a public method for that
  getMovements() {
    return this._movements;
  }

  // these methods here are the public interface to our objects, what we also call API
  deposit(value) {
    this._movements.push(value);
  }

  // here we also abstract the fact that withdrawal is a negative movement
  withdraw(value) {
    // we can also call other methods inside of a certain method, but we have to use this keyword to be able to access this method
    this.deposit(-value);
  }

  _approveLoan(value) {
    return true;
  }

  requestLoan(value) {
    if (this._approveLoan(value)) {
      this.deposit(value);
      console.log(`Loan approved`);
    }
  }
}

const accountOne = new Account("Rafay", "PKR", "1111");

/* for deposits and withdrawals we can just push them into movements arrays but that wouldn't be a good idea because we are directly interacting with the constructor function's property, it would be alot better to create a method for that which would then interact with the properties, as we are not supposed to mess with the movements property so we should encapsulate it 
accountOne.movements.push(250);
accountOne.movements.push(-100); // minus here is something the user shouldn't be caring about like entering -140 which isn't natural
and by adding that underscore we have made it private but it still can be accessed like '_movements' this but the team knows about this and will avoid it because this property is not supposed be touched outside the class */

accountOne.deposit(250);
accountOne.withdraw(100); // here the user just puts 140 and the fact that it becomes negative is abstracted
// accountOne.withdraw(-100) // this will create a bug
console.log(accountOne);

/* but as we see there is nothing stopping someone on our team from interacting with the movements array directly and potentially making mistakes and introducing bugs, like as we can see above it is still possible to do this, and the same goes for our pin as it shouldn't be accessible outside the class */

console.log(accountOne.pin); // accessing it outside of account class when it shouldn't be accessible

/* now in the public interface we only want this method, but we can also call approveloan method too but in the real world application we shouldn't be allowed to access these kinds of methods as it is a kind of internal method, so we really need data encapsulation and data privacy */
accountOne.requestLoan(1000);
// accountOne.approveLoan(1000); // doesn't do anything

console.log(accountOne.getMovements()); // correct way to access movements, can be accessed but not overridden meaning can't set them
