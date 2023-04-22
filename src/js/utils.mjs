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
// save data to local storage
export function setLocalStorage(key, data) {
  const existingData = getLocalStorage(key) || [];
  const newData = [...existingData, data];
  localStorage.setItem(key, JSON.stringify(newData));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  const parent = qs(selector).parentNode;
  parent.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  parent.addEventListener("click", callback);
}
