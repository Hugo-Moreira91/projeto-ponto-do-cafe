document.addEventListener('DOMContentLoaded', ()=> {
    displayCart();
});

async function displayCart() {
    const response = await fetch('./src/json/products.json');
    const data = await response.json();
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="cart-empty">
                <p class="ff-sans-normal fs-400">Seu carrinho se encontra vazio. Que tal olhar nossos produtos?</p>
                <a class="ff-sans-normal fs-400 return-link" href="products.html">Ir para produtos</a>
            </div>
        `;
        return;
    }

    cartItems.forEach(productId => {
        let product = null;

        for (const category in data) {
            product = data[category].find(p => p.id === productId);
            if (product) break; 
        }

        if (product) {
            const cartItem = `
                <div class="flex cart-item">
                    <img class="cart-item-img" src="${product.image}" alt="${product.name}">
                    <p class="ff-sans-normal fs-400 cart-item-name">${product.name}</p>
                    <p class="ff-sans-normal fs-400">R$${product.price}</p>
                    <button class="btn-remove-item" data-id="${product.id}">Remover</button>
                </div>
            `;
            cartContainer.innerHTML += cartItem;
        }
    });

    document.querySelectorAll('.btn-remove-item').forEach(button => {
        button.addEventListener('click', event => {
            const productId = event.target.dataset.id;
            removeFromCart(productId);
        });
    });
}

function removeFromCart(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cartItems.filter(item => item !== productId);
        
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    displayCart();
}
