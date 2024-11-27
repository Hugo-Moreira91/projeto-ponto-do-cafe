function addToCart(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        cartItems[itemIndex].quantity += 1; 
        alert("Incrementando a quantidade do produto adicionado ao carrinho!");
    } else {
        cartItems.push({ id: productId, quantity: 1 });
        alert("Produto adicionado ao carrinho!");
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
}