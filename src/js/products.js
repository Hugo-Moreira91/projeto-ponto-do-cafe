async function loadingProducts() {
    const diretoryProductList = './src/json/products.json';

    const response = await fetch(diretoryProductList);
    
    return await response.json();
}

loadingProducts();