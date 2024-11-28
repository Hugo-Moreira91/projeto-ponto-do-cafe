document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});

async function displayCart() {
    const response = await fetch('./src/json/products.json');
    const data = await response.json();
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const validIds = Object.values(data).flatMap(category => category.map(product => product.id));
    cartItems = cartItems.filter(item => validIds.includes(item.id));

    localStorage.setItem('cart', JSON.stringify(cartItems));

    const cartContainer = document.getElementById('cart-container');
    const totalContainer = document.getElementById('cart-total');
    const purchaseContainer = document.getElementById('finalize-purchase');
    cartContainer.innerHTML = '';
    totalContainer.innerHTML = '';
    purchaseContainer.innerHTML = '';
    
    if (!cartItems || cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="cart-empty">
                <p class="ff-sans-normal fs-400">Seu carrinho se encontra vazio. Que tal olhar nossos produtos?</p>
                <a class="ff-sans-normal fs-400 return-link" href="products.html">Ir para produtos</a>
            </div>
        `;
        return; 
    }

    let totalPrice = 0;

    cartItems.forEach(cartItem => {
        let product = null;

        for (const category in data) {
            product = data[category].find(p => p.id === cartItem.id);
            if (product) break;
        }

        if (product) {
            const subtotal = (product.price * cartItem.quantity).toFixed(2).replace('.', ',');
            totalPrice += parseFloat(subtotal);

            const cartItemHTML = `
                <div class="flex cart-item">
                    <img class="cart-item-img" src="${product.image}" alt="${product.name}">
                    <p class="ff-sans-normal fs-400 cart-item-name" title="${product.name}">${product.name}</p>
                    <p class="ff-sans-normal fs-400">Subtotal: R$${subtotal}</p>
                    <div class="flex quantity-control">
                        <button class="btn-quantity" data-id="${cartItem.id}" data-action="decrease">-</button>
                        <span>${cartItem.quantity}</span>
                        <button class="btn-quantity" data-id="${cartItem.id}" data-action="increase">+</button>
                    </div>
                    <button class="ff-sans-normal fs-300 btn-remove-item" data-id="${cartItem.id}">Remover</button>
                </div>
            `;
            cartContainer.innerHTML += cartItemHTML;
        }
    });

    if (totalPrice > 0) {
        totalContainer.innerHTML = `
            <div class="cart-total-container">
                <h2 class="ff-sans-normal fs-500">Valor Total: R$ ${totalPrice.toFixed(2).replace('.', ',')}</h2>
            </div>
        `;

        purchaseContainer.innerHTML = `
            <div class="finalize-purchase-container">
                <button class="btn btn-finalize-purchase">Finalizar Compra</button>
            </div>
        `;
    }

    document.querySelectorAll('.btn-quantity').forEach(button => {
        button.addEventListener('click', event => {
            const productId = event.target.dataset.id;
            const action = event.target.dataset.action;
            updateQuantity(productId, action);
        });
    });

    document.querySelectorAll('.btn-remove-item').forEach(button => {
        button.addEventListener('click', event => {
            const productId = event.target.dataset.id;
            removeFromCart(productId);
        });
    });

    document.querySelector('.btn-finalize-purchase').addEventListener('click', () => {
        alert('Pedido finalizado com sucesso! Muito obrigado pela compra.\nVolte sempre!');
    });
}

function updateQuantity(productId, action) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        if (action === 'increase') {
            cartItems[itemIndex].quantity += 1;
        } else if (action === 'decrease' && cartItems[itemIndex].quantity > 1) {
            cartItems[itemIndex].quantity -= 1;
        }
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
}

function removeFromCart(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cartItems.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    displayCart();
}
