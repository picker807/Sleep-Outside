import {getLocalStorage} from "./utils.mjs";

// Copied from cart.js
function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
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
  export function getTotal(cartItems){
    let totalCost = 0;
    let numItems = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      const finalCost = item.quantity * item.FinalPrice;
      totalCost += finalCost;
      numItems += item.quantity;
    }
    return [totalCost, numItems]; 
  }
  //Renders the cart total cost and item count
  function renderTotal(numItems, totalCost) {
    const cartFooter = document.querySelector(".cart-footer");
    cartFooter.querySelector(".cart-items").innerHTML += numItems;
    cartFooter.querySelector(".cart-total").innerHTML += "$" + totalCost.toFixed(2);
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
        const [a,b] = getTotal(cartItems);
        renderTotal(b,a);
    }
}