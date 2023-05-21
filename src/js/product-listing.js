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

const search = document.querySelector("#searchBar");

search.placeholder = `Search for ${category}`;
const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", () => {
  performSearch();
});

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
  

  function performSearch() {
    let userSearch = search.value.toLowerCase();
    const results = document.querySelector(".product-list");
    let li = results.getElementsByTagName("li");
    console.log(li);
    for (let i = 0; i < li.length; i++) {
      if (li[i].classList.contains("hide")) {
        li[i].classList.remove("hide");
      }
      let productName = li[i]
        .getElementsByTagName("h2")[0]
        .textContent.toLowerCase();
        console.log(productName);
      let brandName = li[i]
        .getElementsByTagName("h3")[0]
        .textContent.toLowerCase();
        console.log(brandName);

      if (
        !productName.includes(userSearch) &&
        !brandName.includes(userSearch)
      ) {
        li[i].classList.add("hide");
      }
    }
  };

