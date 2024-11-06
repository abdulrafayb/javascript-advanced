"use strict";

/* every object in JS have setter and getter properties and we call these special properties assessor properties while the normal properties are called data properties, setters and getters are basically functions that get and set a value just as the name says, and classes also have setters and getters properties and they work in the exact same way as they work in object literals */

const account = {
  owner: "Rafay",
  movements: [120, 200, 530, 300],

  // method to get the latest movement
  get latest() {
    return this.movements.slice(-1).pop();
  },

  // method to add the latest movement to array, and every set method needs to have atleast one parameter
  set latest(mov) {
    this.movements.push(mov);
  },
};

/* now we don't call the method but simply we write it as a property as we used get, this can be very useful when we want to read something as a property but still need to do calculations before */
console.log(account.latest);

account.latest = 50;
console.log(account.movements);
