document.addEventListener('DOMContentLoaded', ()=> {
    const buttons = document.querySelectorAll('.submenu button');

    loadingProducts('highlights');

    buttons.forEach(button => {
        button.addEventListener('click', (e)=> {
            const category = e.target.getAttribute('data-category');
            loadingProducts(category);
        });
    })
});

async function dataProducts() {
    const diretoryProductList = './src/json/products.json';

    const response = await fetch(diretoryProductList);
    
    return await response.json();
}

async function loadingProducts(category) {
    const objectProducts = await dataProducts();
    const containerProducts = document.getElementById('products');
    const categoryProducts = objectProducts[category];

    containerProducts.innerHTML = '';

    try{
        categoryProducts.forEach(product => {
            const productRender = `
                <div class="flex product">
                    <h2 class="ff-sans-cond fs-700 product-name">${product.name}</h2>
                    <img class="product-image" src="${product.image}" alt="${product.name}">
                    <p class="product-description"><i>${product.description}</i></p>
                    <p class="product-price">R$ ${product.price.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</p>
                    <button class="btn uppercase btn-shop-cart">Adicionar ao carrinho</button>
                </div>
            `

            containerProducts.innerHTML += productRender;

        });
    }catch{error => console.error('Erro ao carregar produtos:', error)};
}