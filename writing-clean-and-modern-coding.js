"use strict";
/* // this code is about a very small budget application
// we should never use var but only const and let
const budget = [
  { value: 250, description: "Sold old TV 📺", user: "peter" },
  { value: -45, description: "Groceries 🥑", user: "peter" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "peter" },
  { value: 300, description: "Freelancing 👩‍💻", user: "peter" },
  { value: -1100, description: "New iPhone 📱", user: "peter" },
  { value: -20, description: "Candy 🍭", user: "stewie" },
  { value: -125, description: "Toys 🚂", user: "stewie" },
  { value: -1800, description: "New Laptop 💻", user: "peter" },
];

// the name limits doesn't make sense so we change it to spendinglimits
const spendingLimits = {
  peter: 1500,
  stewie: 100,
};

// as this code was repeating so wrap it in a nice function
const getLimit = (user) => spendingLimits?.[user] ?? 0;

// just add doesn't make sense so we change it to addExpense
const addExpense = function (value, description, user = "peter") {
  // if (!user) user = "jonas"; // instead of setting default properties like this we should use native language features
  user = user.toLowerCase();

  /* let lim;
  if (spendingLimits[user]) {
    lim = spendingLimits[user];
  } else {
    lim = 0;
  } instead of using nested code with all these if/else statements with all these blocks we can use declarative ternary operator */
/* const limit = spendingLimits[user] ? spendingLimits[user] : 0; 
  or we can also use optional chaining and nullish coalescing operator 
  // const limit = spendingLimits?.[user] ?? 0; // if user doesn't exist it will return undefined so we then return zero
  // const limit = getLimit(user);

  /* if the property name is same as the variable name then we don't need to do it like 'user: user' repeating because of enhanced object literal syntax we can simply do as below 
  if (value <= getLimit(user)) {
    budget.push({ value: -value, description, user });
  }
};
addExpense(10, "Pizza 🍕");
addExpense(100, "Going to movies 🍿", "Stewie");
addExpense(200, "Stuff", "Jay");

// this function will check the budget to see if any of the expense are above the limit
const checkExpenses = function () {
  for (const entry of budget) {
    /* let lim;
    if (spendingLimits[entry.user]) {
      lim = spendingLimits[entry.user];
    } else {
      lim = 0;
    } 
    // const limit = spendingLimits?.[entry.user] ?? 0;
    if (entry.value < -getLimit(entry.user)) {
      entry.flag = "limit";
    }
  }
  // we should also remove the braces too as it doesn't look good but not here as i've added comments
};
checkExpenses();

// this function will log all the big expenses with the limit that we pass in
const logBigExpenses = function (bigLimit) {
  let output = "";
  for (const entry of budget) {
    /* if (entry.value <= -bigLimit) {
      // output += entry.description.slice(-2) + " / "; // emojis are counted as two characters not one that is why '-2'
      output += `${entry.description.slice(-2)} / `; // transforming it into template literal
    } this can be converted to ternary 
    output +=
      entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : "";
    // should also get rid of braces here as well
  }
  output = output.slice(0, -2); // removes the last '/ ' one
  console.log(output);
};

console.log(budget);
logBigExpenses(1000); */

const budget = [
  { value: 250, description: "Sold old TV 📺", user: "peter" },
  { value: -45, description: "Groceries 🥑", user: "peter" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "peter" },
  { value: 300, description: "Freelancing 👩‍💻", user: "peter" },
  { value: -1100, description: "New iPhone 📱", user: "peter" },
  { value: -20, description: "Candy 🍭", user: "stewie" },
  { value: -125, description: "Toys 🚂", user: "stewie" },
  { value: -1800, description: "New Laptop 💻", user: "peter" },
];

const spendingLimits = {
  peter: 1500,
  stewie: 100,
};

const getLimit = (user) => spendingLimits?.[user] ?? 0;

const addExpense = function (value, description, user = "peter") {
  user = user.toLowerCase();

  if (value <= getLimit(user))
    budget.push({ value: -value, description, user });
};

addExpense(10, "Pizza 🍕");
addExpense(100, "Going to movies 🍿", "Stewie");
addExpense(200, "Stuff", "Jay");

const checkExpenses = function () {
  for (const entry of budget)
    if (entry.value < -getLimit(entry.user)) entry.flag = "limit";
};

checkExpenses();

const logBigExpenses = function (bigLimit) {
  let output = "";

  for (const entry of budget)
    output +=
      entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : "";

  output = output.slice(0, -2);
  console.log(output);
};

console.log(budget);

logBigExpenses(1000);
