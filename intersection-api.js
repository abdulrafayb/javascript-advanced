"use strict";

/* the intersection observer API allows our code to observe changes such as when a certain target element intersects another element or the viewport, it takes in a callback function and an object of options, this API is quite important to do things on certain positions on the page, things related to scrolling */

const obsCallback = function (entries, observer) {
  /* this function will be called each time, whether we scroll up or down, on the observed element, our target element is intersecting the root element at the threshold defined in the options, the entries above are an array of threshold values */
  entries.forEach((entry) => console.log(entry)); // entry appears as we scroll into our target element, when it comes into viewport
  /* we have to look for this isIntersecting property, which becomes true, when our target, intersects the viewport, and we are to look for the viewport because we set the root to null, the property becomes true and false as when the target element is atleast 10% into our viewport */
};
const obsOptions = {
  root: null, // this object first takes in a root property, and this root is the element that the target would intersect
  threshold: [0, 0.2], // threshold is the percentage (0.1) of intersection at which the observer callback function will be called
  /* we can also pass an array in threshold not just one value, to specify different thresholds, 0% means our callback function will trigger each time the target element moves completely out of view and also as soon as it enters the view, the callback function will be called when the threshold values are passed when moving into the view at 0% and 20% and moving out of the view at 0% and 20% */
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(sectionOne); // target element
