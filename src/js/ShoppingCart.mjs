import {getLocalStorage} from "./utils.mjs";

// Copied from cart.js
function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  
    return newItem;
}

//Make the cart total visible when cart has items.
function makeFooterVisible(cartFooter, numItems) {
    if (numItems){
        cartFooter.style.display = "inline";
    } else {
        cartFooter.style.display = "none";
    }
  }
  //Calculates the total for items and cost
  function getTotal(cartItems){
    let totalCost = 0;
    let numItems = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      const finalCost = item.FinalPrice;
      totalCost += finalCost;
      numItems += 1
    }
    renderTotal(numItems, totalCost); 
  }
  //Renders the cart total cost and item count
  function renderTotal(numItems, totalCost) {
    const cartFooter = document.querySelector(".cart-footer");
    cartFooter.querySelector(".cart-items").innerHTML += numItems;
    cartFooter.querySelector(".cart-total").innerHTML += "$" + totalCost;
    makeFooterVisible(cartFooter, numItems);
  }
export default class ShoppingCart {
    constructor(key, elemSelector) {
        this.key = key;
        this.elemSelector = elemSelector;
    }
    renderCartContents() {
        const cartItems = getLocalStorage(this.key);
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        document.querySelector(this.elemSelector).innerHTML = htmlItems.join("");
        getTotal(cartItems);
    }
}