"use strict";

// lecture one
/* DOM is basically the interface between all JS code and the browser, or more specifically HTML documents that are rendered in and by the browser, we can use the DOM to make JS interact with the browser and again more specifically we can create, modify and delete elements, set styles, classes and attributes and listen and respond to events */

/* this works because a DOM tree is generated from any HTML document and a DOM tree is a tree like structure made out of nodes and we can then interact with this tree, DOM is a very complex API which provides us with the interface that we can use to programmatically interact with the DOM, in practice it means that the DOM contains a ton of methods and properties that we use to interact with the DOM tree */

/* all these DOM methods and properties are organized into different types of objects, every single node in the DOM tree is of the type which is node, and such as everything else in JS, each node is represented in JS by an object, and this object gets access to special node methods and properties */

/* the element type has internally an HTML element child type, and that element type itself has exactly one child type for each HTML element that exists in HTML, so we have a special type for buttons, images, links, and so on and so forth, and that's important because each of these HTML elements can have different unique properties, such as an image has a source attribute in HTML which no other element has, and so the DOM needs a way of storing these different attributes and therefore different types of HTML elements were created in the DOM API, what makes all of this work is something called inheritance, inheritance means that all the child type swill also get access to the methods and properties of all their parent node types */

// lecture two
// to select elements

/* to select the entire document, html element which includes both the head and body, of any webpage we use documentElement because document itself is not a real DOM element */
console.log(document.documentElement);
// to select head and body separately
console.log(document.head);
console.log(document.body);

// querySelector will return the first element that matches the selector header
const header = document.querySelector(".header");
// to select multiple elements we use querySelectorAll, and it returns all the elements in a nodeList
const allSections = document.querySelectorAll(".section");
console.log(allSections);

// here we don't pass the class name but the id name without #, we use # only for querySelector
document.getElementById("section--1");
/* to get all the elements with the name button, and this method returns all the elements in an HTML collection which is different from a nodeList, HTML collection is a so called live collection meaning if the DOM changes then the HTML collection will also be updated and changed with the DOM, and the same doesn't happen with a nodeList */
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

// to get all the elements by a class name, this method also returns all the elements in an HTML collection
console.log(document.getElementsByClassName("btn"));

// to create and insert elements

// quick and easy way of creating elements
insertAdjacentHTML;
// we can also create elements from scratch programmatically using a combination of different methods
const message = document.createElement("div");
// we create a element div and store it in a variable, and now we add a class to it
message.classList.add("cookie-message");
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message); // it inserts this message as the first child of the selected element, it will show it on the top of element
header.append(message); // to insert it as the last child of the selected element, we can also use both methods to move the elements
/* DOM elements are unique and can only exist at one place at a time, but if we wanted to insert multiple copies of the same element then we'll have to first copy the element, so we use cloneNode */
// header.append(message.cloneNode(true));
// header.before(message); // it will insert message before the header element, as a sibling
// header.after(message); // it will insert message after the header element, as a sibling

// to delete elements

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    // message.remove(); /// we can delete elements by using the remove method, and it will remove the element from the DOM
    message.parentElement.removeChild(message); // older way, first selecting the parent then the child we wanna remove
  });

// lecture three
// changing styles using the DOM

// we can change the styles of an element by using the style property, and it returns the style
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

/* one might think we are also able to read styles using the style property but we get nothing for height and color, and that's because the style property only works for inline styles that we set ourselves using the style property, but we can't get style that is hidden inside of a class or doesn't exist */
console.log(message.style.height);
console.log(message.style.color);
console.log(message.style.backgroundColor);

/* we can get styles if we want to but for that we'll have to use getComputedStyle function, and we pass in the element whose styles we need, then it returns a huge object containing all the properties associated with the element, then in practice we simply take out a certain property that we need, one important thing about this function is that is computes the style from the page meaning as they appear on the page but not from the CSS property themselves that we have defined */
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// parsefloat takes out the number from the string that we get from the function then adds to the height
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

/* now we work with CSS custom properties which we usually call CSS variables */
document.documentElement.style.setProperty("--color-primary", "orangered");

// changing attributes with DOM

/* in HTML we have multiple attributes such as src, alt and even the class names and the IDs of an element and so in JS we can access and change these different attributes */
const logo = document.querySelector(".nav__logo");

/* this code below works because images are supposed to have the src and alt attributes and as we specify them in HTML, JS will automatically create these properties on the object*/
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// just as we can read these values for these attributes, we can also set them
logo.alt = "Beautiful minimalist logo";

/* it is not good to use it this way because it will override all the existing classes associated with the element before, and it allows only to put in one class name */
logo.className = "class";

/* but if we add some other property that is not a standard then JS will not automatically create a property on the object, but there is another way of reading this value from the DOM, we can use getAttribute to get that property, there's also setAttribute which is used to create a new attribute on the element */
console.log(logo.designer);
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");

/* for images, simply the src url returns the absolute url and if we want the relative url then we have to use the getaattribute which would then return the relative url to our folders in which indexhtml file is located, and the same goes for the links */
console.log(logo.src);
console.log(logo.getAttribute("src"));

const link = document.querySelector(".nav__link--btn");
console.log(link.href);
console.log(link.getAttribute("href"));

//  data attributes are special kinds of attributes that start with the word data
console.log(logo.dataset.versionNumber);

// changing classes with DOM

// to add, remove and toggle classnames and to check whether an element contains a certain class
logo.classList.add("c", "j");
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c");

// lecture four
// types of events and event handlers

/* an event is basically a signal that is generated by a certain DOM node, and a signal means that something has happened such as a click, mouse moving, full screen triggered, all these activities done by the user generates an event, and then we can list and fold these events in our code using eventlisteners so that we can handle them */

// mouse enter event, when the the mouse pointer moves over the element, and there are tons of events like click, and more
const hOne = document.querySelector("h1");

/* another way to attach an eventlistener to an element and that is by calling the onevent property directly on the element, and for each different event there is a onevent property, but this way is old school
hOne.onmouseenter = function (e) {
  alert("onmouseenter: Great! You are reading the heading :D");
}; */

/* two reasons why addeventlistener is better and is used in modern JS, first one is that it allows us to add multiple event listeners to the same event, second one is that we can remove an event handler in case it isn't needed anymore */

const alertHOne = function (e) {
  alert("addEventListener: Great! You are reading the heading :D");

  // h1.removeEventListener("mouseenter", alertH1) // it won't happen the second time as the event is removed, it is a nice pattern when we only want to listen to events once
};

hOne.addEventListener("mouseenter", alertHOne);

// we can also remove it after a certain time has passed
setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

/* there is also a third way of handling events which is by using an HTML attribute, but this one is really old way doing it and shouldn't be used anymore, <h1 onclick="alert('HTML')"></h1>, like this */

// lecture five
/* JS events have a very important properties which are capturing phase and bubbling phase, let's now simulate a click event on a link that happens on a anchor element as shown in the slide to understand these properties

when we clink the link, the DOM then generates a click event right away, however, this event is actually not generated at the target element which is the anchor element in the DOM tree, but instead, the event is actually generated at the root of the document, so at the very top of the DOM tree, and from there, the so-called capturing phase happens, where the event then travels all the way down from the document route to the target element, and as the event travels down the tree, it will pass through every single parent element of the target element, as soon as the event reaches the target, the target phase begins, where events can be handled right at the target

after reaching the target, the event then actually travels all the way up to the document route again, and this isthe so-called bubbling phase, so we say that events bubble up from the target to the document route, and just like in the capturing phase, the event passes through all its parent elements, and really just the parents, so not through any sibling elements, and bubbling phase is also useful for event delegation 

this detail is indeed very important because basically, it's as if the event also happened in each of the parent elements, this means that if we attach the same event listener, for example, to the section element, then we would have handled the exact same event twice, once at its target, and once at one of its parent elements, and this behavior will allow us to implement really powerful patterns 

now by default, events can only be handled in the target, and in the bubbling phase, however, we can set up event listeners in a way that they listen to events in the capturing phase instead, also, not all types of events have a capturing and bubbling phase, some of them are created right on the target element, however if we really do want to catch events during the capturing phase then we can define a third parameter in the addeventlistener

we can also say that events propagate, which is really what capturing and bubbling is, the events are propagating from one place to another

the reason why both capturing and bubbling exist is only for historical reasons, from the time where different browsers implemented different versions of JS */

// event propagation in practice (example of a nav bar) (nav => nav__links => nav__link)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
// function to create random colors
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// here we attach the event handler to the link and its parent elements
document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target, e.currentTarget); // target is where the event happened, where the click happened
  console.log(e.currentTarget === this); // both point to the same element

  // to stop propagation then when we click this link then the rest of the event handlers won't be executed because the bubbling stops
  // e.stopPropagation();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER", e.target, e.currentTarget);
});

document.querySelector(".nav").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("NAV", e.target, e.currentTarget);
  },
  true
  /* in this case where this used capture parameter is set to true, the event handler will no longer listen to bubbling events, but instead to capturing events, this way the this element will appear first because now this element is now actually listening for the event as it travels down from the DOM, and by default this is set to false */
);

// lecture six
// DOM traversing

/* DOM traversing is basically walking through the DOM, which means that we can select an element based on another element, it's important because sometimes we want to select elements relative to a certain other element, such as a direct child or direct parent element, or sometimes we don't even know the structure of the DOM at runtime, so in all these cases we need to traverse the DOM, and with it we can traverse upwards, downwards and sideways */

const hTwo = document.querySelector("h1");

// going downwards: child
/* selects all elements with highlight class that are the direct children of h1, and this would work no matter how deep these child elements are nested inside the h1 element, and if there were other highlight classes elements they wouldn't get selected because they aren't the children of h1 */
console.log(hTwo.querySelectorAll(".highlight"));
// when we need all the direct children of the element, like text, paragraphs, basically everything that's inisde
console.log(hTwo.childNodes);
// returns an HTML collection of elements that are actually inside h1
console.log(hTwo.children);
// for first and last child in the element
hTwo.firstElementChild.style.color = "white";
hTwo.lastElementChild.style.color = "orangered";

// going upwards: parents
console.log(hTwo.parentNode);
console.log(hTwo.parentElement);

// selecting the closest parent element, important method for event delegation
hTwo.closest(".header").style.background = "var(--gradient-secondary)";
// returns the element itself because element itself is closest to itself
hTwo.closest("h1").style.background = "var(--gradient-primary)";

// going sideways: siblings
// for getting previous and next sibling
console.log(hTwo.previousElementSibling);
console.log(hTwo.nextElementSibling);

console.log(hTwo.previousSibling);
console.log(hTwo.nextSibling);

/* if we need all the siblings and not just the previous and the next one, then we can move upto the parent element and then read all the children from there, and this one would also include the element that we performed the search on as its also the child */
console.log(hTwo.parentElement.children);
// turning all the children elements into an array, and performing operation that if the element itself is not h1 then scale them
[...hTwo.parentElement.children].forEach(function (el) {
  if (el !== hTwo) el.style.transform = "scale(0.5)";
});

// lecture seven
// lifecycle DOM events

/* different events that occur in the DOM during a webpage's life cycle, lifecycle here means right from the moment that the page is first accessed and until the user leaves it */

/* DOM content load event, and this event is fired by the document as soon as the HTML is completely parsed, which means the HTML has been downloaded and been converted to DOM tree, but before that all scripts are downloaded and executed so that the DOM content load event can happen, and this event doesn't wait for images and other external resources to load, just HTML and JS needs to be loaded */

/* with this we can now execute our code that should only be executed after the DOM is available */
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built!", e);
});

/* if we really want all our code only to be executed after the DOM is available so does that mean that we should wrap our entire code into an event listener like above, with a function like above, no we don't need to do that and that's because we have to script tag which is the one that imports or a JS into the HTML, at the end of the body, basically it's the last thing that is going to be read in the HTML and then the browser will only find the script when the rest of the HTML is already parsed anyway, so when we have to script tag here at the end of the HTML, then we do not need to listen for the DOM content loaded event, there are also other ways of loading the JS file with the script tag, if we talk about vanilla JS from jQuery, then probably we'll have to wrap all our code into a document ready function, which in JS or actually in jQuery, but no such thing is necessary in regular JS */

/* we also have the load event which is fired by the window as soon as not only the HTML is parsed but also all the images and external resources like CSS files are also loaded, basically when the complete page has finished loading is when this event gets fired */
window.addEventListener("load", function (e) {
  console.log("Page fully loaded", e);
});

/* we also have the before unload event which also gets fired on window, and this event is created immediately before a user is about to leave the page meaning clicking the close button in the browser tab, so we can use this event to ask users if they are 100% sure that they want to leave the page, and in order to display a leaving confirmation we need to set the return value on the event to an empty string but it is for historical reason, so as we try to close then we get a pop up, which asks the user if they want to leave the site, long ago we were actually able to customize the message that was displayed in the pop up but now we can only see it as a generic message no matter what we write in the string, it is useful only in the time when the user is leaving in the middle of filling out the form, or writing a blog post, in a situation where data could actually be lost by accident */
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = "";
});

// lecture eight
// different ways of loading a JS script in HTML

/* normally, scripts placed in the head without attributes cause the HTML parsing to stop until the script is loaded and executed, which slows down page performance, placing scripts at the end of the body ensures HTML is fully parsed before execution, the async attribute allows scripts to load while HTML is being parsed, but execution still interrupts parsing, meanwhile defer loads scripts asynchronously but delays execution until after HTML parsing is complete, improving efficiency, defer is ideal for scripts where order matters, while async is useful for third-party scripts like analytics, modern browsers support these attributes, but older browsers do not, requiring scripts to be placed at the end of the body for compatibility */
