import {renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}"/>
            <h3 class="card_brand">${product.Brand.Name}</h3>
            <h2 class="card_name">${product.Name}</h2>
            <p class="product-card_price">$${product.FinalPrice}</p>
        </a>
    </li>`
}

//async function checkImageExists(imageSrc){
//    return new Promise (resolve => {
//        const img = new Image();
//        img.onload = () =>  resolve(true);
//        img.onerror = () => resolve(false);
//        img.src = imageSrc;
//        });
//    }

export default class ProductListing{
    constructor (category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData(this.category);
        //const filteredList = await Promise.all(list.map(async item => {
        //  if (await checkImageExists(item.Image)) {
        //    return item;
        //  }
        //}));
        //const finalList = filteredList.filter(item => item !== undefined);
        //console.log(finalList);
        this.renderList(list);
        document.querySelector(".title").innerHTML = this.category;
      }  
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}