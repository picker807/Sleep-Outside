import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataInfo = new ProductData("tents");
const thing = document.querySelector(".product-list");
const list = new ProductListing("Tents", dataInfo, thing);

list.init();