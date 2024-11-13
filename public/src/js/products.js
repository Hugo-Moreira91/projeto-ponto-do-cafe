document.addEventListener('DOMContentLoaded', ()=> {
    const buttons = document.querySelectorAll('.submenu button');

    loadingProducts('highlights');

    buttons.forEach(button => {
        button.addEventListener('click', (e)=> {
            const category = e.target.getAttribute('data-category');
            const navContainer = e.target.parentNode;

            navContainer.querySelector('.submenu-active').classList.remove('submenu-active');
            e.target.classList.add('submenu-active');  
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
            const priceConverted = product.price.replace('.', ',');
            const productRender = `
                <div class="flex product">
                    <h2 class="flex ff-sans-cond fs-600 product-name">${product.name}</h2>
                    <img class="product-image" src="${product.image}" alt="${product.name}">
                    <p class="fs-300 product-description"><i>${product.description}</i></p>
                    <p class="fs-500 letter-spacing-1 product-price">R$ ${priceConverted}</p>
                    <button class="btn fs-300 uppercase btn-shop-cart">Adicionar ao carrinho</button>
                </div>
            `

            containerProducts.innerHTML += productRender;

        });
    }catch{error => console.error('Erro ao carregar produtos:', error)};
}