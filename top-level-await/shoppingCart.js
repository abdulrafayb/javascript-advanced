/* so the code in this module will block the execution in this module and also in the other modules who are importing this module until it finishes fetching the data here all the other code will have to wait */
console.log("Start fetching users");
await fetch(`https://jsonplaceholder.typicode.com/users`);
console.log("Finished fetching");
