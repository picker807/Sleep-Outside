const baseURL = "http://server-nodejs.cit.byui.edu:3000/checkout";

function convertToJson(res) {
  const jsonResponse = res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
    constructor() {}
    // get product data
    getData(category) {
      let products = fetch(baseURL + `products/search/${category}`)
        .then(convertToJson)
        .then((data) => {
          products = data.Result;
          products.forEach((product) => {
            product.Count = 0;
            product.InCart = false;
          });
          return products;
        });
      // console.log(products);
      return products;
    }

    async findProductById(id) {
        let product = fetch(baseURL + `product/${id}`)
          .then(convertToJson)
          .then((data) => {
            product = data.Result;
            product.Count = 0;
            product.InCart = false;
            return product;
          });
        // console.log(product);
        return product;
      }
    
      async checkout(formInfo) {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInfo),
        };
        return await fetch(baseURL + "checkout/", options).then(convertToJson);
      }
    
      async loginRequest(creds) {
        const login = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(creds),
        };
        // console.log(login);
        const response = await fetch(baseURL + "login", login).then(convertToJson);
        // console.log(response);
        // console.log(response.accessToken)
        return response.accessToken;
      }
    
      async getOrders(token) {
        // console.log(token);
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        let response = await fetch(baseURL + "orders", options).then(convertToJson);
        // console.log(response);
        return response;
      }
    }