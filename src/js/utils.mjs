// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
//save data to local storage
// here I have added code to fetch the current Local Storage data, put it in an Array
  // and add the new data (or cart item) to the saved data. Checks first to see if the current data is already an array, then uses that or puts it in an array. This creates an Array of objects.
  // The result is that 1) more than one item can be saved in the cart and 2) the code in cart.js that
  // retreives the saved data works without a problem. Whereas before it could not run map() on an object.
export function setLocalStorage(key, data) {
  let currentData = JSON.parse(localStorage.getItem(key)) || [];
  currentData = Array.isArray(currentData) ? currentData : [currentData];
  const newData = [...currentData, data];
  localStorage.setItem(key, JSON.stringify(newData));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
