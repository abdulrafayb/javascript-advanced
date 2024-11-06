"use strict";

/* here we are gonna rewrite this code following declarative and functional programming principles and we are gonna focus on three big areas of functional JS which are immutability, side effects, pure functions and making data transformations using pure functions such as map, filter and reduce */

/* in JS there is a way to make a data structure immutable, and we can do by calling object.freeze then in that function we pass in an object that we want to make immutable, and now we can no longer put any new properties into it */
const budget = Object.freeze([
  { value: 250, description: "Sold old TV 📺", user: "peter" },
  { value: -45, description: "Groceries 🥑", user: "peter" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "peter" },
  { value: 300, description: "Freelancing 👩‍💻", user: "peter" },
  { value: -1100, description: "New iPhone 📱", user: "peter" },
  { value: -20, description: "Candy 🍭", user: "stewie" },
  { value: -125, description: "Toys 🚂", user: "stewie" },
  { value: -1800, description: "New Laptop 💻", user: "peter" },
]);
/* we can not add/push new elements like we have seen below with addexpense function however object.freeze only freezes the first level of any object so it is not a deep freeze because we can still change objects inside of the object like we have below */
// budget[0].value = 350; // will change the value

const spendingLimits = Object.freeze({
  peter: 1500,
  stewie: 100,
});
/* spendingLimits.brian = 200; // this won't be added to object because it has been freezed
console.log(spendingLimits); */

const getLimit = (user) => spendingLimits?.[user] ?? 0;

/* addexpense function is an impure function which is trying to mutate our object in the outside environment meaning this function has a side effect which means something outside of the function is manipulated or it does something other than simply returning a value, and the function that produces side effects is called impure function */
/* now to fix this we need to follow some good practices which are firstly we have pass all the data that the function depends on into the function so that it doesn't have to reach into the outer scope, secondly the function should not change any of the values meaning should not mutate them, so the solution to this is to create a copy and then return that copy of the state (data), and also it is a good practice to not pass more than three parameters in a funtion but sometimes its okay, we can also pass in one object with options */
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = "peter"
) {
  // clearly manipulating user data so we create a new variable
  const cleanUser = user.toLowerCase();

  if (value <= getLimit(cleanUser))
    // here we create a new object based on the state we receive and return it
    return [...state, { value: -value, description, user: cleanUser }]; // creates a copy of the state
  // budget.push({ value: -value, description, user: cleanUser }); // here we are maniuplating the original object
};

/* here we trying to push into array which is no longer possible because we made it immutable using object.freeze, now as we fixed it above so calling this function no longer mutates the original object but now as we return a new object we also need to store it */
const newBudgetOne = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
addExpense(budget, spendingLimits, 100, "Going to movies 🍿", "Stewie");
addExpense(budget, spendingLimits, 200, "Stuff", "Jay");

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

// 650
