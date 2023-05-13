import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category")
const dataInfo = new ExternalServices();
const elem = document.querySelector(".product-list");
const list = new ProductListing(category, dataInfo, elem);
console.log(dataInfo);

list.init();

// Wait for slider to be clicked to change the arranged data
let slider = document.getElementById("sortByPrice");
slider.addEventListener("change", () => {
  const search = document.querySelector("#searchBar");
  search.value = "";
  if (slider.checked == true) {
    list.init(true);
  } else {
    list.init();
  }
});

function searchBar() {
  const search = document.querySelector("#searchBar");
  search.placeholder = `Search for ${category}`;
  search.addEventListener("search", () => {
    let results = document.querySelector(".product-list");

    let userSearch = search.value.toLowerCase();
    let li = results.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
      if (li[i].classList.contains("hide")) {
        li[i].classList.remove("hide");
      }
      let productName = li[i]
        .getElementsByTagName("h2")[0]
        .textContent.toLocaleLowerCase();
      let brandName = li[i]
        .getElementsByTagName("h3")[0]
        .textContent.toLocaleLowerCase();

      if (
        !productName.includes(userSearch) ||
        !brandName.includes(userSearch)
      ) {
        li[i].classList.add("hide");
      }
    }
  });
}

