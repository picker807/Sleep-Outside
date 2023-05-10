import {getTotal} from ShoppingCart.mjs;
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}



function packageItems(items) {
    const checkoutItems = items.map((item) => {
    console.log(item);
    return {
    id: item.Id,
    price: item.FinalPrice,
    name: item.Name,
    quantity: item.quantity,
    };
    });
    return checkoutItems;
   }

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.numItems = 0
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
      }
      init() {
        this.list = getLocalStorage(this.key);
        [this.itemTotal, this.numItems] = getTotal(this.list);
        this.calculateOrderTotal();
      }
    
      displayItemSummary(){
        const itemTotalElement = document.querySelector(this.outputSelector + " #cartTotal");
        const itemNumElement = document.querySelector(this.outputSelector + " #num-items");
        itemNumElement.innerText = this.numItems;
        itemTotalElement.inerText = "$" + this.itemTotal;
      }
      calculateOrderTotal() {
        this.shipping = (numItems - 1)*2 + 10;
        this.tax = this.itemTotal * .06;
        this.orderTotal = this.itemTotal + this.shipping + this.tax;

        this.displayOrderTotals();
      }
    
      displayOrderTotals() {
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        const orderTotal = document.querySelector(this.outputSelector + " #orderTotal");
        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
    }

    async checkout() {
        const formElement = document.forms["checkout"];
    
        const json = formDataToJSON(formElement);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
          const res = await services.checkout(json);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
    }
}
    

   


