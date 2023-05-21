import {getTotal} from "./ShoppingCart.mjs";
import ExternalServices from "./ExternalServices.mjs";
import {
  getLocalStorage, 
  setLocalStorage, 
  alertMessage, 
  removeAllAlerts} from "./utils.mjs";

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
        this.displayItemSummary();
        this.calculateOrderTotal();
      }
    
      displayItemSummary(){
        const itemTotalElement = document.querySelector(this.outputSelector + " #subtotal");
        const itemNumElement = document.querySelector(this.outputSelector + " #num-items");
        itemNumElement.innerText = this.numItems;
        itemTotalElement.innerText = "$" + this.itemTotal.toFixed(2);
      }
      calculateOrderTotal() {
        this.shipping = (this.numItems - 1)*2 + 10;
        this.tax = this.itemTotal * .06;
        this.orderTotal = this.itemTotal + this.shipping + this.tax;

        this.displayOrderTotals();
      }
    
      displayOrderTotals() {
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        const orderTotal = document.querySelector(this.outputSelector + " #totalBalance");
        shipping.innerText = "$" + this.shipping.toFixed(2);
        tax.innerText = "$" + this.tax.toFixed(2);
        orderTotal.innerText = "$" + this.orderTotal.toFixed(2);
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        //Because our list contains single entries of items with their quantities, we must unpack
        // the list, creating a longer list with an individual entry for each item. The server does not recognize the quantity property.
        const unpackedList = this.list.flatMap(item => Array.from({length: item.quantity}, () =>item ));
        const json = formDataToJSON(formElement);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(unpackedList);
        console.log(json);
        try {
          const res = await services.checkout(json);
          setLocalStorage(undefined, undefined, true);
          window.location.assign("./success.html");
        } catch (err) {
          removeAllAlerts();
          const errors = await err.message;
          if (errors) {
            Object.entries(errors).reverse().forEach(([key, value]) => {
            alertMessage(value);
            });
          } 
          console.log(err);
          }
          
      }
    }
          
          
        
    

    
   
   


