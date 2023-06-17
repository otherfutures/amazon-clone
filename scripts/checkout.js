let itemsTotal = '';
let cartItems = '';
console.log(cart);
cartItems.forEach(item => {
    cartItems += `
        <div class="cart-item-container">
        <div class="delivery-date">
        Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image" src="${product.image}">

        <div class="cart-item-details">
            <div class="product-name">
                ${product.name}
            </div>
            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
            <span>
                Quantity: <span class="quantity-label">${cartQuantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
                Update
            </span>
            <span class="delete-quantity-link link-primary">
                Delete
            </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
            <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input" name="delivery-option-1">
            <div>
                <div class="delivery-option-date">
                Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                FREE Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-1">
            <div>
                <div class="delivery-option-date">
                Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                $4.99 - Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-1">
            <div>
                <div class="delivery-option-date">
                Monday, June 13
                </div>
                <div class="delivery-option-price">
                $9.99 - Shipping
                </div>
            </div>
            </div>
        </div>
        </div>
    `;
});

itemsTotal.forEach(item => {
    itemsTotal += `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items ${cartQuantity}:</div>
        <div class="payment-summary-money">$${itemsTotal}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$4.99</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$47.74</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$4.77</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$52.51</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `;
});

document.querySelector('.js-order-summary').innerHTML = cartItems;
document.querySelector('.js-payment-summary').innerHTML = itemsTotal;

// Delete link
document.querySelectorAll('.js-delete-quantity').forEach((button) => {
    button.addEventListener('click', () => {

        // Get the item associated with the clicked button
        const item = button.getAttribute('productID');
        const index = cart.indexOf(item);

        if (index !== -1) {
            cart.splice(index, 1); // Remove the item from its current position
            cart.push(item); // Add the item to the last position
        }

        const lastItem = cart.pop(); // Remove and get the last item
        console.log(lastItem);
    });
});

let placedOrder = [];

// Place your order button
document.querySelectorAll('.js-place-order-button').forEach((button) => {
    button.addEventListener('click', () => {
        // Move all items from cart to placedOrder & empty the cart
        placedOrder = cart;
        cart.length = 0;
    });
});


// Example usage
const array = [1, 2, 3, 4, 5];
const itemToMove = 3;

const poppedItem = moveItemToLastAndPop(array, itemToMove);
console.log(poppedItem);    // Output: 3
console.log(array);         // Output: [1, 2, 4, 5, 3]
