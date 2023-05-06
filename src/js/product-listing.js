import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam("category")
const dataInfo = new ProductData();
const elem = document.querySelector(".product-list");
const list = new ProductListing(category, dataInfo, elem);

list.init();