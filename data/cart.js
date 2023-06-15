// Load the cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Calculate the initial cart quantity
let cartQuantity = 0;
cart.forEach((item) => {
    cartQuantity += item.quantity;
});

// Set the initial cart quantity on the page
document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;