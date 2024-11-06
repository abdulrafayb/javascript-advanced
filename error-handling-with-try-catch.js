"use strict";

try {
  let x = 1;
  const y = 2;
  y = 3;
} catch (err) {
  // this catch block will have access to whatever error occurs in the try block
  alert(err.message); // as errors get message property
}
