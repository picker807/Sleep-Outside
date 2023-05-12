import {renderListWithTemplate } from "./utils.mjs";
//This template has an added check for IsClearance. IF IsClearance, it shows the list price
// in addition to the final price. Unfortunately, both prices are identical in every product
// that shows IsClearance.
function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}"/>
            <h3 class="card_brand">${product.Brand.Name}</h3>
            <h2 class="card_name">${product.Name}</h2>
            ${product.IsClearance ? `<p class="product-card_price" id="list-price"> $${product.ListPrice}</p>` : ''}
            <p class="product-card_price">$${product.FinalPrice}</p>
        </a>
    </li>`
}


export default class ProductListing{
    constructor (category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector(".title").innerHTML = this.category;
      }  
    renderList(list) {
    
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}