function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Produto adicionado ao carrinho!");
    } else {
        alert("Este produto já está no carrinho!");
    }
}