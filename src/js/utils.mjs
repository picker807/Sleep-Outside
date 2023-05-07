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
//export function setLocalStorage(key, data) {
//  let currentData = JSON.parse(localStorage.getItem(key)) || [];
//  currentData = Array.isArray(currentData) ? currentData : [currentData];
//  const newData = [...currentData, data];
//  localStorage.setItem(key, JSON.stringify(newData));
//}
export function setLocalStorage(key, data) {
  let currentData = JSON.parse(localStorage.getItem(key)) || [];
  currentData = Array.isArray(currentData) ? currentData : [currentData];
  let updatedData = [...currentData];
  const index = currentData.findIndex((item) => {
    console.log('item.id:', item.Id);
    console.log('data.id:', data.Id);
    return item.Id === data.Id;
  });
  
  console.log('currentData:', currentData);
  console.log('updatedData:', updatedData);
  console.log('index:', index);
  
  if (index !== -1) {
    updatedData[index].quantity += data.quantity;
  } else {
    updatedData.push(data);
  }

  console.log('updatedData after change:', updatedData);

  localStorage.setItem(key, JSON.stringify(updatedData));
}



// helper to get parameter strings
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
    const htmlStringData = list.map(templateFn);
    if (clear) {
      parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStringData.join(""));
}

export function renderWithTemplate(templateFn, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", templateFn);
  if(callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
const data = await fetch(path);
const template = await data.text();
return template
}

export async function loadHeaderFooter() {
  const headerTemp = await loadTemplate("../partials/header.html");
  const headerElem = document.querySelector("#main-header");
  renderWithTemplate(headerTemp, headerElem);

  const footerTemp = await loadTemplate("../partials/footer.html");
  const footerElem = document.querySelector("#main-footer");
  renderWithTemplate(footerTemp, footerElem);

}


